import path from 'path';

import nunjucks from 'nunjucks';
import _ from 'lodash';

import loadArticles from './articles.js';

nunjucks.configure(path.resolve(__dirname, '../templates'));

const defaultContext = {
  siteTitle: 'Михаил Сабуренков',
  siteURL: 'http://mikesub.net/blog',
  siteHeading: 'Михаил Сабуренков',
};

const articles = _.sortBy(loadArticles(), 'sortKey').reverse();
const renderList = (template, items) => nunjucks.render(template, Object.assign({items}, defaultContext));
const renderArticle = (template, item) => nunjucks.render(template, Object.assign({item}, defaultContext));

export default {
  index: renderList('index.html', articles),
  rss: renderList('rss.xml', articles),
  articles: [for (article of articles) {path: article.path, body: renderArticle('article.html', article)}],
};
