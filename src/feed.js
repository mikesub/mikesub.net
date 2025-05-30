import config from "../config.json" with { type: "json" };

function item({ title, path, body, feedDate, photo }) {
	return {
		title: title,
		id: config.url + path,
		url: config.url + path,
		content_html: body,
		date_published: feedDate,
		image: photo,
	};
}

export function genFeed(items) {
	return JSON.stringify(
		{
			version: "https://jsonfeed.org/version/1.1",
			title: config.title,
			home_page_url: config.url,
			feed_url: `${config.url}feed.json`,
			items: items.map(item),
			authors: [{ name: "Mike Saburenkov", url: "https://mikesub.net" }],
		},
		null,
		1,
	);
}
