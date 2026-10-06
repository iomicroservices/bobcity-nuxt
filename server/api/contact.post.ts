import { z } from 'zod'
import type { H3Event } from 'h3'
import type { D1Database } from '@cloudflare/workers-types'

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).default(''),
  service: z.string().trim().max(80).default(''),
  message: z.string().trim().min(10).max(5000),
  turnstileToken: z.string().default('')
})

type CloudflareEnv = {
  DB?: D1Database
  EMAIL?: {
    send: (msg: {
      from: string
      to: string
      subject: string
      html?: string
      text?: string
      reply_to?: string
    }) => Promise<{ messageId?: string }>
  }
}

function getCloudflareEnv(event: H3Event): CloudflareEnv {
  const cf = event.context.cloudflare as { env?: CloudflareEnv } | undefined
  return cf?.env ?? {}
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form submission'
    })
  }

  const turnstileSecret = config.turnstile?.secretKey
  if (turnstileSecret) {
    const verification = await verifyTurnstileToken(parsed.data.turnstileToken, event)
    if (!verification.success) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Turnstile verification failed'
      })
    }
  } else if (!import.meta.dev) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Turnstile is not configured'
    })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const env = getCloudflareEnv(event)
  const db = env.DB
  const emailBinding = env.EMAIL

  if (db) {
    const windowStart = new Date()
    windowStart.setMinutes(0, 0, 0)
    const key = `contact:${ip}:${windowStart.toISOString()}`
    const existing = await db.prepare('SELECT hits FROM rate_limits WHERE key = ?').bind(key).first<{ hits: number }>()
    const hits = (existing?.hits ?? 0) + 1
    if (hits > 8) {
      throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
    }
    await db.prepare(
      `INSERT INTO rate_limits (key, hits, window_start) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET hits = excluded.hits`
    ).bind(key, hits, windowStart.toISOString()).run()
  }

  const id = crypto.randomUUID()
  const userAgent = getHeader(event, 'user-agent') || ''
  const { name, email, phone, service, message } = parsed.data

  if (db) {
    await db.prepare(
      `INSERT INTO leads (id, name, email, phone, service, message, source, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      name,
      email,
      phone || null,
      service || null,
      message,
      'contact-form',
      userAgent
    ).run()
  } else if (import.meta.dev) {
    console.info('[contact] D1 unavailable in local mode — lead logged only', {
      id,
      name,
      email,
      phone,
      service,
      message
    })
  } else {
    throw createError({ statusCode: 500, statusMessage: 'Database unavailable' })
  }

  const toOwner = String(config.contactToEmail || 'hello@bobcity.co.uk')
  const from = String(config.contactFromEmail || 'hello@bobcity.co.uk')
  const serviceLabel = service || 'General enquiry'

  const ownerHtml = `
    <h1>New quote request</h1>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    <p><em>Lead ID: ${id}</em></p>
  `

  const customerHtml = `
    <h1>Thanks for contacting Bob City</h1>
    <p>Hi ${escapeHtml(name)},</p>
    <p>We have received your request about <strong>${escapeHtml(serviceLabel)}</strong> and will get back to you shortly.</p>
    <p>If you need to add details, reply to this email or call us.</p>
    <p>— Bob City<br>bobcity.co.uk</p>
  `

  if (emailBinding?.send) {
    await Promise.all([
      emailBinding.send({
        from,
        to: toOwner,
        reply_to: email,
        subject: `New quote request from ${name}`,
        html: ownerHtml,
        text: `New quote request from ${name} (${email})\nService: ${serviceLabel}\n\n${message}`
      }),
      emailBinding.send({
        from,
        to: email,
        subject: 'We received your Bob City quote request',
        html: customerHtml,
        text: `Hi ${name},\n\nWe have received your request about ${serviceLabel} and will get back to you shortly.\n\n— Bob City`
      })
    ])
  } else if (import.meta.dev) {
    console.info('[contact] Email binding unavailable — skipping send in local mode')
  } else {
    throw createError({ statusCode: 500, statusMessage: 'Email service unavailable' })
  }

  return { ok: true, id }
})

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')
}
