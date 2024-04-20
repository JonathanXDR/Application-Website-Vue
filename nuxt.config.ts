import routerOptions from './router.options'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/eslint'
  ],
  plugins: [
    '~/plugins/api/github.server',
    '~/plugins/api/musickit.server',
    '~/plugins/api/tmdb.server'
  ],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  eslint: {
    checker: true
  },
  ssr: true,
  app: {
    head: {
      script:
        process.env.NODE_ENV === 'production'
          ? []
          : [
              {
                src: 'https://snippet.meticulous.ai/v1/meticulous.js',
                ['data-project-id']: '3xUUe4R1NNzA6BJE6HKzrGCjCRddpahZJeJh8N0w',
                ['data-is-production-environment']: false
              }
            ]
    }
  },
  router: {
    options: routerOptions
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      appUrl: process.env.APP_URL,
      appDomain: process.env.APP_DOMAIN,
      appEnvironment: process.env.NODE_ENV,

      githubRepoName: process.env.GITHUB_REPO_NAME,
      githubRepoOwner: process.env.GITHUB_REPO_OWNER
    },

    githubToken: process.env.GITHUB_TOKEN,
    appleDeveloperToken: process.env.APPLE_DEVELOPER_TOKEN
  },
  components: {
    dirs: [
      {
        path: '~/components/containers',
        global: true
      },
      '~/components/common'
    ]
  },
  colorMode: {
    classSuffix: ''
  },
  i18n: {
    baseUrl: process.env.APP_URL,
    vueI18n: '~/i18n.config.ts',
    // lazy: true,
    // langDir: 'lang',
    strategy: 'prefix_and_default',
    defaultLocale: 'de',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      cookieDomain: 'jonathan-russ.com',
      cookieKey: 'i18n_redirected',
      cookieSecure: true,
      fallbackLocale: 'en',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch'
        // file: 'de.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
        // file: 'en.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français'
        // file: 'fr.json'
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano'
        // file: 'it.json'
      }
    ]
  }
})
