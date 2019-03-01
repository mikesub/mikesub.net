const fs = require("fs");
const render = require("./render");
const config = require("../config.json");

/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync(`${config.targetDir}rss.xml`, render.rss);
/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync(`${config.targetDir}index.html`, render.index);
/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync(`${config.targetDir}feed.json`, render.feed);
/* eslint-disable-next-line fp/no-unused-expression */
render.articles.forEach(article =>
  fs.writeFileSync(config.targetDir + article.path, article.body)
);
