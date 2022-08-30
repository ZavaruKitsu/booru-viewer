<template>
  <div class="min-w-screen flex min-h-screen justify-center">
    <SearchBar />
    <div class="mt-24 w-screen select-none">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
* {
  @apply outline-none;
}

input::placeholder {
  @apply text-neutral-600;
}
</style>

<script lang="ts" setup>
import { useHead } from "#imports";

useHead({
  meta: [
    {
      name: "referrer",
      content: "no-referrer",
    },
  ],
});
</script>
