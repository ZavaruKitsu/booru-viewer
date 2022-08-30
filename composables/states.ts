import { useState } from "#imports";
import { Post } from "~/boards/ImageBoard";

export const useSearchEnabled = () => useState("searchEnabled", () => true);
export const useSearchText = () => useState("searchText", () => "");
export const useSearchPage = () => useState("searchPage", () => 1);
export const useSearching = () => useState("searching", () => false);
export const useCurrentPost = () =>
  useState<Post | null>("currentPost", () => null);
export const useSearchResults = () =>
  useState<{
    posts: Post[];
    query: string;
    board: string | null;
  }>("searchResults", () => {
    return {
      posts: [],
      query: "",
      board: null,
    };
  });
