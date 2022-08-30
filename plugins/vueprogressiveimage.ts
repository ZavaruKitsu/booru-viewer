// @ts-ignore
import VueProgressiveImage from "vue-progressive-image";
import { defineNuxtPlugin } from "#imports";

import "vue-progressive-image/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProgressiveImage);
});
