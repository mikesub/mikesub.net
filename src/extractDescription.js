const _ = require("lodash");

function stripTags(html) {
  return html.replace(/<\/?[^>]+>/g, "");
}
function stripNewLines(text) {
  return text.replace(/\n/g, "");
}

module.exports = function(html) {
  return _.truncate(stripNewLines(stripTags(html)), {
    length: 200,
    omission: "...",
    separator: " "
  });
};
