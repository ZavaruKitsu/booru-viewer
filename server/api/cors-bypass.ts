import { defineEventHandler, getMethod, getQuery, readBody } from "h3";

export default defineEventHandler<any>(async (event) => {
  const method = getMethod(event);
  const params = getQuery(event);
  const body = await readBody(event);
  let url: string = body.url;
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }

  event.res.setHeader("Content-Type", "application/json");

  return await $fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    params,
  });
});
