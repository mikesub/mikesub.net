import render from "./render.ts";
import config from "../config.json" with { type: "json" };

Deno.writeTextFileSync(`${config.targetDir}rss.xml`, render.rss);
Deno.writeTextFileSync(`${config.targetDir}index.html`, render.index);
Deno.writeTextFileSync(`${config.targetDir}feed.json`, render.feed);

render.articles.forEach((article) =>
  Deno.writeTextFileSync(config.targetDir + article.path, article.body)
);
