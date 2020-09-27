const fs = require("fs");
const render = require("./render");
const config = require("../config.json");

/* eslint-disable fp/no-unused-expression */
fs.writeFileSync(`${config.targetDir}rss.xml`, render.rss);
fs.writeFileSync(`${config.targetDir}index.html`, render.index);
fs.writeFileSync(`${config.targetDir}feed.json`, render.feed);
render.articles.forEach((article) =>
  fs.writeFileSync(config.targetDir + article.path, article.body)
);
/* eslint-enable fp/no-unused-expression */
