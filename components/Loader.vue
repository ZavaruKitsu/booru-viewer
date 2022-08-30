<template>
  <div ref="loader" class="h-2 w-full bg-black" />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, useSearchPage } from "#imports";

const searchPage = useSearchPage();

const loader = ref(null);

const observer = new IntersectionObserver(searchMore, {
  root: null,
  threshold: 1,
});

function searchMore(entries: IntersectionObserverEntry[]) {
  console.log(entries);
  const entry = entries[0];
  if (entry.isIntersecting) {
    searchPage.value += 1;
  }
}

onMounted(() => {
  observer.observe(loader.value);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
