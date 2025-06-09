import config from "../config.json" with { type: "json" };
import * as articles from "./articles.js";
import * as feed from "./feed.js";

import articleTemplate from "./template-article.js";
import indexTemplate from "./template-index.js";
import rssTemplate from "./template-rss.js";

const sortedArticles = articles
	.load()
	.sort((a, b) => a.sortKey - b.sortKey)
	.reverse();

export default {
	index: indexTemplate({ config, items: sortedArticles }),
	rss: rssTemplate({ config, items: sortedArticles }),
	feed: feed.genFeed(sortedArticles),
	articles: sortedArticles.map((article) => ({
		path: article.path,
		body: articleTemplate({ config, item: article }),
	})),
};
