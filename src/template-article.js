export default function ({ item, config }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${item.title || ""} - ${config.author}</title>
  <link rel="stylesheet" href="css.css"/>
  <link rel="alternate" type="application/json" title="${config.title}" href="${config.url}feed.json" />
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="${config.url}rss.xml"/>
  <meta name="author" content="${config.author}"/>
  <meta name="description" content="${item.description}"/>
</head>
<body>
  <header><h1><a href="index.html">${config.title}</a></h1></header>
  <main>
  <article>
    <header>
      ${item.title ? `<h2>${item.title}</h2>` : ""}
      <p><time datetime="${item.machineDate}">${item.humanDate}</time></p>
    </header>
    ${item.body}
  </article>
  </main>
</body>
</html>
`;
}
