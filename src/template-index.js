export default function ({ items, config }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog - ${config.author}</title>
  <link rel="stylesheet" href="/blog.css"/>
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate" type="application/feed+json" title="${config.title}" href="${config.url}feed.json" />
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="${config.url}rss.xml"/>
  <meta name="author" content="${config.author}"/>
  <meta name="description" content="${config.title}"/>
</head>
<body>
  <header><h1><a href="..">${config.author}</a>, blog</h1></header>
  <main>
${items
	.map(
		({ path, title, machineDate, humanDate, body }) => `    <article>
      <header>
        <h1><a href="${path}">${title ? title : "#"}</a></h1>
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
