export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  devtools: {
  enabled: false,
  },
  
  ssr: true,
  debug: false,
  
  srcDir: 'src',
  
  modules: [
  'nuxtjs-naive-ui',
  '@pinia/nuxt',
  '@pinia-plugin-persistedstate/nuxt',
  ],
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
  plugins: {
  tailwindcss: {},
  autoprefixer: {},
  },
  },
  
  build: {
    transpile: ['naive-ui', 'vueuc'],
  },
  
  app: {
  head: {
  title: 'Quantum Systems Web3',
  titleTemplate: '%s | Quantum Systems Web3',
  
  
    htmlAttrs: {
      lang: 'en',
    },
  
    meta: [
      {
        name: 'description',
        content:
          'Explore Quantum Systems Web3, a digital platform for cryptocurrency and blockchain services.',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        property: 'og:site_name',
        content: 'Quantum Systems Web3',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Quantum Systems Web3',
      },
      {
        property: 'og:description',
        content:
          'Explore Quantum Systems Web3, a digital platform for cryptocurrency and blockchain services.',
      },
      {
        property: 'og:url',
        content: 'https://quantumsystemsweb3.com/',
      },
    ],
  
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/q.png',
      },
      {
        rel: 'canonical',
        href: 'https://quantumsystemsweb3.com/',
      },
    ],
  },

  
  },
  
  runtimeConfig: {
  public: {
  // smartsuppKey: process.env.NUXT_PUBLIC_SMARTSUPP_KEY,
  },
  },
  })
  