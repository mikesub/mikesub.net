export default function ({ item, config }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${item.title || ""} - ${config.author}</title>
  <link rel="stylesheet" href="/blog.css"/>
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate" type="application/json" title="${config.title}" href="${config.url}feed.json" />
  <link rel="alternate" type="application/rss+xml" title="${config.title}" href="${config.url}rss.xml"/>
  <meta name="author" content="${config.author}"/>
  <meta name="description" content="${item.description}"/>
  ${item.photo ? `<meta property="og:image" content="${item.photo}">` : ""}
</head>
<body>
  <header><h1><a href="index.html">${config.title}</a></h1></header>
  <main>
  <article>
    <header>
      ${item.title ? `<h1>${item.title}</h1>` : ""}
      <p><time datetime="${item.machineDate}">${item.humanDate}</time></p>
    </header>
    ${item.body}
  </article>
  </main>
  <footer>
    <p>
      Have thoughts or feedback? Look for “Discussion” links at the end of the post, reach out to me on <a rel="me" href="https://bsky.app/profile/mikesub.net">Bluesky</a>, or drop a message right here.
      Want to stay in the loop? Leave your email for updates or subscribe via <a rel="alternate" href="/blog/rss.xml">RSS</a> or <a rel="alternate" href="/blog/feed.json">JSON</a> feeds.
    </p>
    <form
        action="https://script.google.com/macros/s/AKfycbyt3_RfTFhR0jMCsfz8lykNPpgUbMIicEV6yLFH1A_d2oBM3Rm9h73R7sVxYHCKQlyu/exec"
        method="POST"
    >
        <input type="text" name="fried" placeholder="Enter your email address and/or message"/>
        <input type="text" name="hats" placeholder="Enter your email address and/or message"/>
        <button type="submit">Send</button>
    </form>
  </footer>
</body>
</html>
`;
}
