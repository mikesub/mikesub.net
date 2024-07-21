import render from "./render.js";
import config from "../config.js";

Deno.writeTextFileSync(`${config.targetDir}rss.xml`, render.rss);
Deno.writeTextFileSync(`${config.targetDir}index.html`, render.index);
Deno.writeTextFileSync(`${config.targetDir}feed.json`, render.feed);

render.articles.forEach((article) =>
  Deno.writeTextFileSync(config.targetDir + article.path, article.body)
);
