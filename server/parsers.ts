import { Post } from "~/boards/ImageBoard";
import { engines } from "~/boards/Manager";

export function parse(doc: HTMLElement, type: string): Post[] {
  if (type === engines.GelbooruLegacy.name) {
    return parseGelbooruLegacy(doc);
  }

  return [];
}

function parseGelbooruLegacy(doc: HTMLElement): Post[] {
  const postsContainer = doc.querySelector(
    "#post-list > div.content > div:nth-child(3)"
  );

  if (!postsContainer) {
    return [];
  }

  const posts = [];

  for (const post of postsContainer.children) {
    const link = post.children[0];
    if (!link) {
      continue;
    }

    const img = link.children[0];
    if (!img) {
      continue;
    }

    const previewImage = img.attributes.getNamedItem("src")?.value ?? "";
    const fullImage = previewImage
      .replace("thumbnails", "images")
      .replace("thumbnail_", "")
      .replace("thumbnail", "")
      .replace("thumbs", "img");

    posts.push({
      id: link.id.replace("p", ""),
      url: link.attributes.getNamedItem("href")?.value ?? "",
      preview_image: previewImage,
      full_image: fullImage,
      tags: img.attributes.getNamedItem("title")?.value?.split(" ") ?? [],
    });
  }

  return posts;
}
