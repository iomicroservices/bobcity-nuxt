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
    turnstile: {
      secretKey: ''
    },
    contactToEmail: '',
    contactFromEmail: 'quotes@bobcity.co.uk',
    public: {
      siteUrl: 'https://bobcity.co.uk',
      turnstile: {
        siteKey: ''
      }
    }
  },

  turnstile: {
    siteKey: '',
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
            database_id: 'REPLACE_WITH_D1_DATABASE_ID'
          }
        ],
        send_email: [
          {
            name: 'EMAIL'
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
