const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mustache = require('mustache');
const _articles = require('./articles');
const feed = require('./feed');

const templatesDir = 'templates';


const loadTemplate = fileName => fs.readFileSync(path.join(templatesDir, `${fileName}.mustache`), {encoding: 'utf8'});
const articles = _articles.load();
const sortedArticles = _.sortBy(articles, 'sortKey').reverse();
const renderList = (template, items) => mustache.render(loadTemplate(template), {items});
const renderArticle = (template, item) => mustache.render(loadTemplate(template), {item});

module.exports = {
  index: renderList('index', sortedArticles),
  rss: renderList('rss', sortedArticles),
  feed: feed.genFeed(sortedArticles),
  articles: articles.map(article => ({path: article.path, body: renderArticle('article', article)})),
};


