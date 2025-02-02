// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/fonts"],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [
      // do not resolve this font with any provider from `@nuxt/fonts`
      { name: "Rubik", provider: "google", global: true },
      // only resolve this font with the `google` provider
      { name: "Inter", provider: "google", global: true },
      // specify specific font data - this will bypass any providers
      { name: "JetBrains Mono", provider: "google", global: true },
    ],
  },
})
