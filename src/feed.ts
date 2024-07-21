import config from "../config.json" with { type: "json" };
import type { Article } from "./types.ts";

function item({ title, path, body, feedDate }: Article) {
  return {
    title: title,
    id: config.url + path,
    url: config.url + path,
    content_html: body,
    date_published: feedDate,
  };
}

export function genFeed(items: Article[]) {
  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1",
      title: config.title,
      home_page_url: config.url,
      feed_url: `${config.url}feed.json`,
      items: items.map(item),
    },
    null,
    1,
  );
}
