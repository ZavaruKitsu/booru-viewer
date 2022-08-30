import { Gelbooru } from "~/boards/engines/Gelbooru";
import { $fetch } from "ohmyfetch";

export class GelbooruLegacy extends Gelbooru {
  name = "Gelbooru v0.1";
  // @ts-ignore
  default_options = null;

  async parsePosts(
    url: string,
    options: null,
    query: string,
    page: number,
    limit: number
  ) {
    --page;

    const q = query ? `tags=${encodeURI(query)}&` : "";

    const posts = await $fetch("/api/parse", {
      body: {
        url:
          url +
          `/index.php?page=post&s=list&${q}limit=${limit}&pid=${page * 20}`,
        type: this.name,
      },
      method: "POST",
    });

    return {
      posts,
    };
  }
}
