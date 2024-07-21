import mustache from "mustache";
import * as articles from "./articles.ts";
import * as feed from "./feed.ts";
import config from "../config.json" with { type: "json" };
import type { Article } from "./types.ts";

function loadTemplate(fileName: string) {
  return Deno.readTextFileSync(`${config.templatesDir}${fileName}.mustache`);
}

const partials = {
  _darkmode: loadTemplate("_darkmode"),
};

type Context = {
  items?: Article[];
  item?: Article;
};

function render(template: string, context: Context) {
  return mustache.render(
    loadTemplate(template),
    { config, ...context },
    partials,
  );
}

const sortedArticles = articles
  .load()
  .sort((a, b) => a.sortKey - b.sortKey)
  .reverse();

export default {
  index: render("index", { items: sortedArticles }),
  rss: render("rss", { items: sortedArticles }),
  feed: feed.genFeed(sortedArticles),
  articles: sortedArticles.map((article) => ({
    path: article.path,
    body: render("article", { item: article }),
  })),
};
