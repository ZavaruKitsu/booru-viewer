import { Gelbooru } from "~/boards/engines/Gelbooru";
import { GelbooruLegacy } from "~/boards/engines/GelbooruLegacy";
import { Engine } from "~/boards/Engine";

export const engines: { [name: string]: Engine } = {
  Gelbooru: new Gelbooru(),
  GelbooruLegacy: new GelbooruLegacy(),
};

export function getEngine(name: string): Engine {
  return engines[name];
}

export async function detectEngine(URL: string): Promise<Engine | null> {
  return await $fetch<Engine | null>("/api/detect-engine", {
    body: { url: URL },
    method: "POST",
  });
}
