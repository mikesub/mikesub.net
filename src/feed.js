const url = 'http://mikesub.net/blog/';

const item = ({title, path, body, feedDate}) => {
  let result = {
    title: title,
    id: url + path,
    url: url + path,
    content_html: body,
    date_published: feedDate,
  };
  if (!title) {
    delete result.title;
  }
  return result;
};

const genFeed = items => JSON.stringify({
  version: 'https://jsonfeed.org/version/1',
  title: 'Mike Saburenkov',
  home_page_url: url,
  feed_url: `${url}feed.json`,
  items: items.map(item),
}, null, 1);

module.exports = {genFeed};
