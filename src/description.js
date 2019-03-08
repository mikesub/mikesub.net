const _ = require("lodash");

function stripTags(html) {
  return html.replace(/<\/?[^>]+>/g, "");
}
function stripNewLines(text) {
  return text.replace(/\n/g, " ");
}

function truncate(html) {
  return _.truncate(stripNewLines(stripTags(html)), {
    length: 200,
    omission: "...",
    separator: " "
  });
}

module.exports = { truncate };
