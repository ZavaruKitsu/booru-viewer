import { createNuxtPersistedState } from "pinia-plugin-persistedstate/nuxt";
import { defineNuxtPlugin, useLocalStorage } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(createNuxtPersistedState(useLocalStorage));
});
