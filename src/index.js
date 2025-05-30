import config from "../config.json" with { type: "json" };
import render from "./render.js";

Deno.writeTextFileSync(`${config.targetDir}rss.xml`, render.rss);
Deno.writeTextFileSync(`${config.targetDir}index.html`, render.index);
Deno.writeTextFileSync(`${config.targetDir}feed.json`, render.feed);

for (const article of render.articles) {
  Deno.writeTextFileSync(config.targetDir + article.path, article.body);
}
