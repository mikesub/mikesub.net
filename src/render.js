const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const mustache = require('mustache');
const _articles = require('./articles.js');

const templatesDir = 'templates';
const defaultContext = {
  siteTitle: 'Mike Saburenkov',
  siteURL: 'http://mikesub.net/blog',
  siteHeading: 'Mike Saburenkov',
};

const loadTemplate = fileName => fs.readFileSync(path.join(templatesDir, `${fileName}.mustache`), {encoding: 'utf8'});
const articles = _articles.load();
const sortedArticles = _.sortBy(articles, 'sortKey').reverse();
const renderList = (template, items) => mustache.render(loadTemplate(template), Object.assign({items}, defaultContext));
const renderArticle = (template, item) => mustache.render(loadTemplate(template), Object.assign({item}, defaultContext));

module.exports = {
  index: renderList('index', sortedArticles),
  rss: renderList('rss', sortedArticles),
  articles: articles.map(article => ({path: article.path, body: renderArticle('article', article)})),
};


