import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional()
})

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: 'site/*.yml',
      schema: z.object({
        name: z.string(),
        tagline: z.string(),
        phone: z.string(),
        email: z.string(),
        address: z.string().optional(),
        serviceAreaSummary: z.string().optional(),
        social: z.object({
          facebook: z.string().optional(),
          instagram: z.string().optional(),
          whatsapp: z.string().optional()
        }).optional(),
        nav: z.array(z.object({
          label: z.string(),
          to: z.string()
        })),
        cta: z.object({
          label: z.string(),
          to: z.string()
        })
      })
    }),

    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        headline: z.string().optional(),
        description: z.string().optional(),
        heroImage: z.string().optional(),
        seo: seoSchema.optional()
      })
    }),

    services: defineCollection({
      type: 'page',
      source: 'services/*.md',
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        icon: z.string().default('i-lucide-wrench'),
        featured: z.boolean().default(false),
        order: z.number().default(100),
        coverImage: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        seo: seoSchema.optional()
      })
    }),

    areas: defineCollection({
      type: 'page',
      source: 'areas/*.md',
      schema: z.object({
        title: z.string(),
        summary: z.string(),
        region: z.string().optional(),
        coverImage: z.string().optional(),
        seo: seoSchema.optional()
      })
    }),

    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string().default('Bob City'),
        coverImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        seo: seoSchema.optional()
      })
    }),

    gallery: defineCollection({
      type: 'data',
      source: 'gallery/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string(),
        service: z.string().optional(),
        location: z.string().optional(),
        order: z.number().default(100)
      })
    }),

    faqs: defineCollection({
      type: 'data',
      source: 'faqs/*.yml',
      schema: z.object({
        question: z.string(),
        answer: z.string(),
        service: z.string().optional(),
        order: z.number().default(100)
      })
    })
  }
})
