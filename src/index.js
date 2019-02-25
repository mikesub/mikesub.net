const fs = require("fs");
const render = require("./render");

fs.writeFileSync("./rss.xml", render.rss);
fs.writeFileSync("./index.html", render.index);
fs.writeFileSync("./feed.json", render.feed);
render.articles.forEach(article =>
  fs.writeFileSync(article.path, article.body)
);
