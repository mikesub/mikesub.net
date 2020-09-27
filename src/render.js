const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const mustache = require("mustache");
const articles = require("./articles");
const feed = require("./feed");
const config = require("../config.json");
const templatesDir = "templates";

function loadTemplate(fileName) {
  return fs.readFileSync(path.join(templatesDir, `${fileName}.mustache`), {
    encoding: "utf8",
  });
}

const partials = {
  _darkmode: loadTemplate("_darkmode"),
};

function render(template, context) {
  return mustache.render(
    loadTemplate(template),
    { config, ...context },
    partials
  );
}

// eslint-disable-next-line fp/no-mutating-methods
const sortedArticles = _.sortBy(articles.load(), "sortKey").reverse();

module.exports = {
  index: render("index", { items: sortedArticles }),
  rss: render("rss", { items: sortedArticles }),
  feed: feed.genFeed(sortedArticles),
  articles: sortedArticles.map((article) => ({
    path: article.path,
    body: render("article", { item: article }),
  })),
};
