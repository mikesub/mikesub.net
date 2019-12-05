const _ = require("lodash");
const mime = require("mime-types");
const { url, title } = require("../config.json");

function item({ title, path, bodyUntouched, feedDate, attachment }) {
  return _.pickBy({
    title: title,
    id: url + path,
    url: url + path,
    content_html: bodyUntouched,
    date_published: feedDate,
    attachment: attachment ? [{ url: attachment, mime_type: mime.lookup(attachment) }] : undefined,
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
