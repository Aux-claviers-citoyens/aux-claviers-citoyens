// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    classSuffix: '',
  },
  runtimeConfig: {
    backendBaseUrl: 'http://localhost:8400',
    public: {
      apiBaseUrl: '/api/v1',
      backend: process.env.NUXT_PUBLIC_BACKEND || false,
    },
  },
})
