import render from "./render.js";
import config from "./config.js";

Deno.writeFileSync(
  `${config.targetDir}rss.xml`,
  new TextEncoder().encode(render.rss),
);
Deno.writeFileSync(
  `${config.targetDir}index.html`,
  new TextEncoder().encode(render.index),
);
Deno.writeFileSync(
  `${config.targetDir}feed.json`,
  new TextEncoder().encode(render.feed),
);

render.articles.forEach((article) =>
  Deno.writeFileSync(
    config.targetDir + article.path,
    new TextEncoder().encode(article.body),
  ),
);
