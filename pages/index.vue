<template>
  <div class="flex justify-center">
    <div v-if="!anyPosts" class="flex flex-col items-center justify-center">
      <p>
        Welcome to the <span class="font-bold">Booru Viewer</span>! A place
        where you can view your favourite pictures of anime gi... Um, I meant
        just your favourite pictures >:)
      </p>
      <p>
        To start, add imageboard in the settings and use the search bar from
        above.
      </p>
    </div>
    <div v-if="anyPosts" class="flex flex-col">
      <div
        class="grid w-full grid-cols-7 items-center justify-items-center gap-4"
      >
        <img
          v-for="post in searchResults.posts"
          :alt="post.id"
          :src="post.preview_image"
          @click="setCurrentPost(post)"
        />
        <div class="col-span-7 py-4">
          <Loader v-if="!searching" />
          <div
            class="m-8 h-16 w-16 animate-ping rounded-full bg-black"
            v-else
          />
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="currentPost"
        class="fixed left-0 top-0 h-screen w-screen bg-black/40"
        @click="close"
      />
    </transition>
    <transition name="scale">
      <FullView v-if="currentPost" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  useCurrentPost,
  useSearching,
  useSearchResults,
} from "~/composables/states";
import { computed, ref } from "#imports";
import FullView from "~/components/FullView.vue";
import { Post } from "~/boards/ImageBoard";

const searching = useSearching();
const searchResults = useSearchResults();

const currentPost = useCurrentPost();

const anyPosts = computed(() => searchResults.value?.posts?.length > 0);

function setCurrentPost(post: Post | null = null) {
  currentPost.value = post;
}

function close() {
  currentPost.value = null;
}
</script>

<style scoped></style>
