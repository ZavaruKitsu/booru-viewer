import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image-edge",
  ],
  css: ["~/assets/main.pcss"],
  plugins: ["~/plugins/persistedstate", "~/plugins/vueprogressiveimage"],
});
