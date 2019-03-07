import fs from "fs";
import _ from "lodash";
import mustache from "mustache";
import path from "path";
import config from "../config.json";
import * as _articles from "./articles";
import * as _feed from "./feed";

import { Article } from "./articles";

type TemplateSingleContext = {
  item: Article;
};

type TemplateListContext = {
  items: Article[];
};

const templatesDir = "templates";

function loadTemplate(fileName: string) {
  return fs.readFileSync(path.join(templatesDir, `${fileName}.mustache`), {
    encoding: "utf8"
  });
}

const partials = {
  _darkmode: loadTemplate("_darkmode")
};

function render(
  template: string,
  context: TemplateSingleContext | TemplateListContext
) {
  return mustache.render(
    loadTemplate(template),
    { config, ...context },
    partials
  );
}

const sortedArticles = _.sortBy(_articles.load(), "sortKey").reverse();

export const index = render("index", { items: sortedArticles });
export const rss = render("rss", { items: sortedArticles });
export const feed = _feed.genFeed(sortedArticles);
export const articles = sortedArticles.map(article => ({
  path: article.path,
  body: render("article", { item: article })
}));
