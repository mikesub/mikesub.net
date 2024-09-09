function escapeHTML(htmlString) {
  return htmlString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function ({ items, config }) {
  return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <atom:link href="https://mikesub.net/blog/rss.xml" rel="self" type="application/rss+xml" />
        <title>${config.title}</title>
        <link>${config.url}</link>
        <description>${config.title}</description>
        ${items
          .map(
            ({ path, title, rssDate, body }) => `    <item>
                ${title ? `<title>${title}</title>` : ""}
                <guid isPermaLink="true">${config.url}${path}</guid>
                <link>${config.url}${path}</link>
                <description>${escapeHTML(body)}</description>
                <pubDate>${rssDate}</pubDate>
            </item>
        `,
          )
          .join("")}
    </channel>
</rss>
`;
}
