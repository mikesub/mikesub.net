import mustache from "mustache";
import * as articles from "./articles.js";
import * as feed from "./feed.js";
import config from "./config.js";

const templatesDir = "templates/";

function loadTemplate(fileName) {
  return new TextDecoder("utf-8").decode(
    Deno.readFileSync(`${templatesDir}${fileName}.mustache`),
  );
}

const partials = {
  _darkmode: loadTemplate("_darkmode"),
};

function render(template, context) {
  return mustache.render(
    loadTemplate(template),
    { config, ...context },
    partials,
  );
}

const sortedArticles = [...articles.load()]
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
