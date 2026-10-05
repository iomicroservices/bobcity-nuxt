# Bob City

Property maintenance website for [bobcity.co.uk](https://bobcity.co.uk) — handyman, painter & decorator, and removals.

## Stack

- Nuxt 4 + Nuxt UI
- Nuxt Content + Nuxt Studio (editable content)
- Cloudflare Workers + D1 + Email Sending + Turnstile

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Content

Editable content lives in `content/`:

| Collection | Path | Purpose |
| --- | --- | --- |
| `site` | `content/site/` | Nav, contact details, CTA |
| `pages` | `content/pages/` | Home / about copy |
| `services` | `content/services/` | One file per service |
| `areas` | `content/areas/` | Service-area SEO pages |
| `blog` | `content/blog/` | Blog posts |
| `gallery` | `content/gallery/` | Portfolio items |
| `faqs` | `content/faqs/` | FAQ entries |

Add a new service by creating `content/services/your-service.md` — no new Vue routes required.

## Contact form

`POST /api/contact` will:

1. Verify Cloudflare Turnstile
2. Store the lead in D1 (`leads` table)
3. Email you and the submitter via Cloudflare Email Sending

Apply the schema:

```bash
# After creating the D1 database and setting database_id in wrangler.jsonc / nuxt.config.ts
npm run db:migrate:remote
```

## Deploy (Cloudflare Workers)

1. Create a D1 database named `bobcity` and put its ID in `wrangler.jsonc` and `nuxt.config.ts`
2. Onboard `bobcity.co.uk` in Cloudflare Email Service → Email Sending
3. Create a Turnstile widget for `bobcity.co.uk` (+ localhost)
4. Create a GitHub OAuth app for Nuxt Studio (callback: `https://bobcity.co.uk/__nuxt_studio/auth/github`)
5. Set secrets / env vars in Cloudflare:
   - `NUXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `NUXT_TURNSTILE_SECRET_KEY`
   - `NUXT_CONTACT_TO_EMAIL`
   - `NUXT_CONTACT_FROM_EMAIL`
   - `STUDIO_GITHUB_CLIENT_ID`
   - `STUDIO_GITHUB_CLIENT_SECRET`
6. Update `studio.repository.owner` in `nuxt.config.ts`
7. Deploy:

```bash
npm run deploy
```

Attach the custom domain `bobcity.co.uk` to the Worker in the Cloudflare dashboard.

Studio is available at `/_studio` after OAuth is configured.
