// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxtjs/turnstile',
    'nitro-cloudflare-dev'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    // Overridden at runtime by NUXT_TURNSTILE_SECRET_KEY / NUXT_CONTACT_* env vars
    turnstile: {
      secretKey: ''
    },
    contactToEmail: '',
    contactFromEmail: 'hello@mail.bobcity.co.uk',
    public: {
      siteUrl: 'https://bobcity.co.uk',
      turnstile: {
        siteKey: ''
      }
    }
  },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
    addValidateEndpoint: false
  },

  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google' },
      { name: 'Bricolage Grotesque', provider: 'google' }
    ]
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'iomicroservices',
      repo: 'bobcity-nuxt',
      branch: 'main'
    },
    git: {
      commit: {
        messagePrefix: 'content: '
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/services': { prerender: true },
    '/areas': { prerender: true },
    '/gallery': { prerender: true },
    '/faq': { prerender: true },
    '/about': { prerender: true },
    '/blog': { prerender: true },
    '/contact': { prerender: true }
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      wrangler: {
        name: 'bobcity',
        compatibility_date: '2025-05-15',
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'bobcity',
            database_id: '2fa66fb2-a4db-44a3-9eec-fb0255d25fc4'
          }
        ],
        send_email: [
          {
            name: 'EMAIL'
          }
        ],
        vars: {
          NUXT_CONTACT_FROM_EMAIL: 'hello@mail.bobcity.co.uk',
          NUXT_CONTACT_TO_EMAIL: 'hello@bobcity.co.uk',
          NUXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAAAAAFOufi2Vo-qAjb5W',
          STUDIO_GITHUB_CLIENT_ID: 'Iv23liw7bAsVsobjqSwb'
        },
        routes: [
          {
            pattern: 'bobcity.co.uk',
            custom_domain: true
          },
          {
            pattern: 'www.bobcity.co.uk',
            custom_domain: true
          }
        ]
      }
    },
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  compatibilityDate: '2025-05-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
