<template>
  <div class="settings-board-container">
    <div class="flex w-full flex-row space-x-4">
      <img :alt="board.name" :src="board.icon" class="h-20 w-20 rounded-full" />
      <div class="flex w-full">
        <div class="flex w-full justify-between">
          <a :href="board.url" class="text-xl" target="_blank">{{
            board.name
          }}</a>
          <div
            v-if="board.options"
            class="flex w-full flex-row items-center justify-center space-x-2"
          >
            <div
              v-for="name in Object.keys(board.options)"
              class="flex flex-col"
            >
              <p>{{ name }}</p>
              <input v-model="board.options[name]" type="text" />
            </div>
          </div>
          <img
            alt="Remove"
            class="h-8 w-8"
            src="~/assets/icons/remove.svg"
            @click="removeSelf"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ImageBoard } from "~/boards/ImageBoard";
import { useStore } from "~/stores/main";

const store = useStore();

function removeSelf() {
  store.removeBoard(props.board);
}

const props = defineProps<{
  board: ImageBoard;
}>();
</script>

<style scoped></style>
