import { defineEventHandler, readBody } from "h3";
import { getEngine } from "~/boards/Manager";

export default defineEventHandler<any>(async (event) => {
  const body = await readBody(event);
  let url: string = body.url;
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }

  const origUrl = new URL(url);
  const domain = origUrl.hostname;

  const res = await fetch(`https://${domain}`);
  const html = await res.text();

  if (html.includes("Gelbooru")) {
    let titleRegex = html.match(/<title>(.*?)<\/title>/);
    let title = titleRegex ? titleRegex[1] : domain;

    const name = title.split("|")[0].trim();

    const engine = html.includes("0.2") ? "Gelbooru" : "GelbooruLegacy";
    const options = getEngine(engine).default_options;

    const icon = `https://${domain}/favicon.ico`;

    return {
      engine,
      name,
      icon,
      options,
    };
  }

  return;
});
