<template>
  <div
    class="pointer-events-none fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-auto scrollbar-hide"
  >
    <div
      class="pointer-events-auto mx-auto flex w-fit items-center justify-center rounded-lg bg-stone-100 py-[20px] pl-[20px] shadow-uni"
      :class="{
        'max-h-[80vh] blur-sm': !loaded,
        'max-h-screen': loaded,
      }"
    >
      <transition name="size-small">
        <nuxt-img
          :src="currentPost.full_image"
          :placeholder="currentPost.preview_image"
          alt=""
          class="max-h-[95vh]"
          @load="onSuccess"
        />
      </transition>
      <div
        class="mx-1 h-4 w-4 rounded-full bg-black"
        @click="toggleTags"
        :class="{ 'opacity-0': !loaded }"
      />
      <div
        class="flex max-h-[90vh] flex-col overflow-x-hidden p-4"
        v-if="tagsVisible"
      >
        <p v-for="tag in currentPost.tags" class="select-text text-right">
          {{ tag }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCurrentPost } from "~/composables/states";
import { onUnmounted, ref } from "#imports";

const currentPost = useCurrentPost();

const loaded_ = ref(false);
const loaded = ref(false);
const tagsVisible = ref(false);

function onSuccess(ev: Event) {
  if (!loaded_.value) {
    loaded_.value = true;
    return;
  }

  loaded.value = true;
  console.log("loaded");
}

function toggleTags() {
  tagsVisible.value = !tagsVisible.value;
}

onUnmounted(() => {
  loaded.value = false;
  tagsVisible.value = false;
});
</script>

<style scoped></style>
