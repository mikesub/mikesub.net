export default function ({ items, config }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog - ${config.author}</title>
  <link rel="stylesheet" href="css.css"/>
  <link rel="alternate" type="application/json" title="${config.title}" href="${config.url}feed.json" />
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="${config.url}rss.xml"/>
  <meta name="author" content="${config.author}"/>
  <meta name="description" content="${config.author}"/>
</head>
<body>
  <header><h1><a href="..">${config.title}</a></h1></header>
  <main>
${items
	.map(
		({ path, title, machineDate, humanDate, body }) => `    <article>
      <header>
        <h2><a href="${path}">${title ? title : "#"}</a></h2>
        <p><time datetime="${machineDate}">${humanDate}</time></p>
      </header>
      ${body}
    </article>
`,
	)
	.join("")}
</main>
</body>
</html>
`;
}
