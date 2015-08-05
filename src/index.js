import fs from 'fs';

import rendered from './render.js';

fs.writeFileSync('./rss.xml', rendered.rss);
fs.writeFileSync('./index.html', rendered.index);
for (let article of rendered.articles) {
  fs.writeFileSync(article.path, article.body);
}

process.exit();
