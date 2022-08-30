import { defineEventHandler, readBody } from "h3";
import { JSDOM } from "jsdom";
import { parse } from "~/server/parsers";

export default defineEventHandler<any>(async (event) => {
  const body = await readBody(event);
  let url: string = body.url;
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  let type: string = body.type;

  const res = await fetch(url);

  const html = await res.text();
  const dom = new JSDOM(html);

  const doc = dom.window.document.body;

  return parse(doc, type);
});
