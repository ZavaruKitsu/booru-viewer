import { defineStore } from "pinia";
import { ImageBoard } from "~/boards/ImageBoard";
import { computed, reactive } from "#imports";

export const useStore = defineStore(
  "main",
  () => {
    const data: { boards: ImageBoard[]; selected: string | null } = reactive({
      boards: [],
      selected: null,
    });

    function addBoard(board: ImageBoard) {
      data.boards.push(board);
    }

    function removeBoard(board: ImageBoard) {
      const index = data.boards.indexOf(board);
      if (index > -1) {
        data.boards.splice(index, 1);
      }
    }

    function setCurrentBoard(board: ImageBoard) {
      data.selected = board.url;
    }

    const currentBoard = computed<ImageBoard | null>(() => {
      const board = data.boards.find((board) => board.url == data.selected);

      if (board) {
        return board;
      }

      if (data.boards.length > 0) {
        setCurrentBoard(data.boards[0]);
        return data.boards[0];
      }

      return null;
    });

    return { data, currentBoard, addBoard, removeBoard, setCurrentBoard };
  },
  { persist: true }
);
