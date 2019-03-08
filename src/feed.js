const _ = require("lodash");
const { url, title } = require("../config.json");

function item({ title, path, body, feedDate }) {
  return _.pickBy({
    title: title,
    id: url + path,
    url: url + path,
    content_html: body,
    date_published: feedDate
  });
}

function genFeed(items) {
  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1",
      title: title,
      home_page_url: url,
      feed_url: `${url}feed.json`,
      items: items.map(item)
    },
    null, // eslint-disable-line fp/no-nil
    1
  );
}
module.exports = { genFeed };
