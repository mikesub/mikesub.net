import fs from "fs";
import config from "../config.json";
import * as render from "./render";

fs.writeFileSync(`${config.targetDir}rss.xml`, render.rss);
fs.writeFileSync(`${config.targetDir}index.html`, render.index);
fs.writeFileSync(`${config.targetDir}feed.json`, render.feed);
render.articles.forEach(article =>
  fs.writeFileSync(config.targetDir + article.path, article.body)
);
