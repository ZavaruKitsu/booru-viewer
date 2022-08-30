<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-full rounded-lg bg-stone-100 p-4 shadow-uni lg:w-1/2">
      <p class="text-center text-2xl font-bold">Settings</p>
      <div class="sep" />
      <div class="mt-5 flex flex-col space-y-4">
        <client-only>
          <Board
            v-for="board in store.data.boards"
            :key="board.url"
            :board="board"
          />
        </client-only>
      </div>
      <div v-if="boardCreateVisible" class="settings-board-container mt-4">
        <div>
          <input
            v-model="newBoardURL"
            class="w-full"
            placeholder="Domain"
            type="text"
            @keydown.enter="addBoard"
          />
        </div>
      </div>
      <div v-if="!boardCreateVisible" class="mt-4 flex justify-center">
        <button
          class="h-12 w-12 rounded-full bg-transparent/5 text-2xl shadow-lg"
          @click="showCreateBoard"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "#imports";
import { useSearchEnabled } from "~/composables/states";
import { ImageBoard } from "~/boards/ImageBoard";
import { detectEngine } from "~/boards/Manager";
import { useStore } from "~/stores/main";

const searchEnabled = useSearchEnabled();
const store = useStore();

const newBoardURL = ref("");
const boardCreateVisible = ref(false);

function showCreateBoard() {
  boardCreateVisible.value = true;
}

async function addBoard() {
  const url = "https://" + new URL(newBoardURL.value).hostname;
  newBoardURL.value = "";
  boardCreateVisible.value = false;

  if (store.data.boards.find((board) => board.url === url)) {
    return;
  }

  let res;
  try {
    res = await detectEngine(url);
  } catch {
    return;
  }
  const { engine, name, icon, options } = res;

  const board: ImageBoard = {
    engine,
    url,
    name,
    icon,
    options,
  };
  store.addBoard(board);

  newBoardURL.value = "";
  boardCreateVisible.value = false;
}

onMounted(() => {
  searchEnabled.value = false;
});
onUnmounted(() => {
  searchEnabled.value = true;
});
</script>

<style scoped></style>
