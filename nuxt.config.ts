import { version as contentfulVersion } from 'contentful/package.json'
import { theme } from './tailwind.config'

// For NuxtImage, convert Tailwind breakpoints settings to unit-less
const screensWithoutUnits = Object.fromEntries(
  Object.entries(theme.screens).map(([key, value]) => [
    key,
    parseInt(value, 10),
  ])
)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  css: ['@/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxt/image-edge',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
  ],

  image: {
    domains: ['images.ctfassets.net'],
    screens: screensWithoutUnits,
  },

  runtimeConfig: {
    // Must not be empty
    // https://github.com/contentful/contentful.js/blob/beta-v10/lib/contentful.ts#L37
    contentfulCreateClientParams: {
      accessToken: 'dummy',
      space: 'dummy',
    },
    public: {
      // Must not be empty
      // https://github.com/contentful/contentful.js/blob/beta-v10/lib/contentful.ts#L37
      contentfulCreateClientParams: {
        accessToken: 'dummy',
        space: 'dummy',
      },
      indexFullBodyImageDelay: 0,
      indexPageBackdropDelay: 0,
      indexPageWorkListLength: 5,
      metaRobotsNone: false,
      netlifyFormName: '',
      nodeEnv: process.env.NODE_ENV,
      tailwindTheme: theme,
      sentryDsn: '',
      sentryTracesSampleRate: 1,
      siteHostname: '',
      siteUrl: '',
      worksPageWorkListLength: 20,
    },
  },

  routeRules: {
    '/works': { redirect: { to: '/works/page/1', statusCode: 301 } },
  },

  build: {
    // Workaround to build with @contentful/rich-text-types in development
    // https://nuxt.com/docs/guide/concepts/esm#transpiling-libraries
    transpile: ['@contentful/rich-text-types'],
  },

  vite: {
    define: {
      // Required variable to import contentful as TypeScript
      // https://github.com/contentful/contentful.js/blob/2ede16730b869e7f8041d35ea176b54550098da0/webpack.config.js#L4
      // This is workaround for following issues of contentful
      // - Different handling of modules between production and development
      //   https://github.com/contentful/contentful.js/issues/1233#issuecomment-1216175360
      // - Bundle code containing eval
      __VERSION__: `'${contentfulVersion}'`,
    },
    optimizeDeps: {
      // Workaround to build with @contentful/rich-text-types in production
      // https://ja.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
      include: ['@contentful/rich-text-types'],
    },
  },

  alias: {
    // Required alias to import contentful as TypeScript
    // This is workaround for following issues of contentful
    // - Different handling of modules between production and development
    //   https://github.com/contentful/contentful.js/issues/1233#issuecomment-1216175360
    // - Bundle code containing eval
    contentful: 'contentful/lib/index',
    // Workaround to build with @pinia/nuxt
    // https://stackoverflow.com/a/74801367
    pinia: '@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
})
