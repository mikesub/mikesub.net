const fs = require("fs");
const render = require("./render");

/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync("./rss.xml", render.rss);
/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync("./index.html", render.index);
/* eslint-disable-next-line fp/no-unused-expression */
fs.writeFileSync("./feed.json", render.feed);
/* eslint-disable-next-line fp/no-unused-expression */
render.articles.forEach(article =>
  fs.writeFileSync(article.path, article.body)
);
