import { Post } from "~/boards/ImageBoard";

export interface Engine {
  name: string;
  default_options: object | null;

  parsePosts(
    url: string,
    options: object | null,
    query: string,
    page: number,
    limit: number
  ): Promise<{
    posts: Post[];
  }>;
}
