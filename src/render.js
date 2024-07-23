import mustache from "npm:mustache@4.2.0";
import * as articles from "./articles.js";
import * as feed from "./feed.js";
import config from "../config.json" with { type: "json" };

function loadTemplate(fileName) {
  return Deno.readTextFileSync(`${config.templatesDir}${fileName}.mustache`);
}

function render(template, context) {
  return mustache.render(
    loadTemplate(template),
    { config, ...context }
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
