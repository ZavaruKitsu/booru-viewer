<template>
  <div
    class="fixed mt-2 flex h-fit w-full items-center space-x-2 rounded-lg bg-stone-100 p-2 px-5 shadow-uni lg:w-4/5"
  >
    <img
      alt=""
      class="cursor-pointer bg-stone-100 transition-transform duration-500 hover:rotate-180"
      src="~/assets/icons/settings.svg"
      @click="
        $route.path === '/settings'
          ? $router.push('/')
          : $router.push('/settings')
      "
    />
    <input
      v-model="searchText"
      :disabled="!searchEnabled"
      class="w-full rounded-lg bg-stone-100 p-2 text-xl"
      placeholder="Start typing..."
      type="text"
      @keydown.enter="search"
    />
    <div class="flex shrink-0 space-x-4">
      <img alt="Search" class="bg-stone-100" src="~/assets/icons/search.svg" />
      <div class="relative flex justify-center">
        <client-only>
          <img
            v-if="store.currentBoard !== null"
            :alt="store.currentBoard.name"
            :src="store.currentBoard.icon"
            class="h-[24px] w-[24px] flex-none shrink-0 flex-nowrap rounded-full"
            @click="togglePickerVisibility"
          />
          <div
            v-if="boardChooseVisible"
            class="divide-b absolute top-12 flex min-w-max flex-col items-center justify-center space-y-1 rounded-lg bg-stone-100 p-1 shadow-uni"
          >
            <div
              v-for="board in store.data.boards"
              class="flex w-full cursor-pointer flex-row space-x-2 rounded-lg p-2 transition-colors duration-200 hover:bg-transparent/5"
              @click="setCurrentBoard(board)"
            >
              <img
                :alt="board.name"
                :src="board.icon"
                class="h-[24px] w-[24px] rounded-full"
              />
              <p class="whitespace-nowrap">{{ board.name }}</p>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  useSearchEnabled,
  useSearching,
  useSearchPage,
  useSearchResults,
  useSearchText,
} from "~/composables/states";
import { ref, watch } from "#imports";
import { useStore } from "~/stores/main";
import { ImageBoard } from "~/boards/ImageBoard";
import { getEngine } from "~/boards/Manager";

const searchEnabled = useSearchEnabled();
const searchText = useSearchText();
const searchPage = useSearchPage();
const searching = useSearching();
const searchResults = useSearchResults();
const store = useStore();

const boardChooseVisible = ref(false);

function togglePickerVisibility() {
  boardChooseVisible.value = !boardChooseVisible.value;
}

function setCurrentBoard(board: ImageBoard) {
  store.setCurrentBoard(board);
  boardChooseVisible.value = false;
}

async function search() {
  const board = store.currentBoard;
  const text = searchText.value;

  if (board === null) {
    return;
  }

  const changed = !(
    searchResults.value.query === text &&
    searchResults.value.board === board.url
  );

  if (changed) {
    searchPage.value = 1;
  }

  searching.value = true;

  console.log(
    "Searching for",
    searchText.value ?? "<empty>",
    "on",
    board,
    ",",
    searchPage,
    "page"
  );

  const engine = getEngine(board.engine);
  const { posts } = await engine.parsePosts(
    board.url,
    board.options,
    text,
    searchPage.value,
    21
  );
  console.log("Found", posts.length, "posts");

  if (!changed) {
    searchResults.value.posts.push(...posts);
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    searchResults.value = {
      query: text,
      posts,
      board: board.url,
    };
  }

  searching.value = false;
}

watch(
  () => [store.currentBoard, searchPage.value],
  async () => {
    await search();
  }
);
</script>

<style scoped></style>
