import { Engine } from "~/boards/Engine";
import { $fetch } from "ohmyfetch";

interface OriginalGelbooruPost {
  id: number;
  file_url: string;
  preview_url: string;
  tags: string;
}

interface OriginalGelbooruResponse {
  post: OriginalGelbooruPost[];
}

interface AnotherGelbooruResponse {
  id: number;
  directory: string;
  image: string;
  tags: string;
}

type GelbooruResponse = OriginalGelbooruResponse | AnotherGelbooruResponse[];

export class Gelbooru implements Engine {
  name = "Gelbooru v0.2";
  default_options = {
    user_id: "",
    api_key: "",
  };

  async parsePosts(
    url: string,
    options: {
      user_id: string;
      api_key: string;
    } | null,
    query: string,
    page: number,
    limit: number
  ) {
    --page;

    const cred =
      options && options.api_key && options.user_id
        ? `&user_id=${options.user_id}&api_key=${options.api_key}`
        : "";
    const q = query ? `tags=${encodeURI(query)}&` : "";

    const data = await $fetch<GelbooruResponse>("/api/cors-bypass", {
      body: {
        url:
          url +
          `/index.php?page=dapi&s=post&q=index&json=1&${q}limit=${limit}&pid=${page}${cred}`,
      },
      method: "POST",
    });

    const resp: GelbooruResponse = data;

    // preview "https://img3.gelbooru.com/thumbnails/71/90/thumbnail_7190bbf86b1406dc599e6c4c35fe3df1.jpg",
    // file    "https://img3.gelbooru.com/images/71/90/7190bbf86b1406dc599e6c4c35fe3df1.jpeg",

    console.log(resp);

    if (!Array.isArray(resp)) {
      return {
        posts:
          resp?.post?.map(({ id, file_url, preview_url, tags }) => {
            return {
              id: id.toString(),
              url: file_url,
              preview_image: preview_url,
              full_image: file_url,
              tags: tags.split(" "),
            };
          }) ?? [],
      };
    } else {
      return {
        posts: resp?.map(({ id, directory, image, tags }) => {
          return {
            id: id.toString(),
            url: new URL(`/images/${directory}/${image}`, url).href,
            preview_image: new URL(
              `/thumbnails/${directory}/thumbnail_${image
                .replace("png", "jpg")
                .replace("jpeg", "jpg")
                .replace("gif", "jpg")}`,
              url
            ).href,
            full_image: new URL(`/images/${directory}/${image}`, url).href,
            tags: tags.split(" "),
          };
        }),
      };
    }
  }
}
