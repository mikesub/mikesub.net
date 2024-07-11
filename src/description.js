import _ from "npm:lodash";

function stripTags(html) {
  return html.replace(/<\/?[^>]+>/g, "");
}
function stripNewLines(text) {
  return text.replace(/\n/g, " ");
}

export function truncate(html) {
  return _.truncate(stripNewLines(stripTags(html)).trim(), {
    length: 200,
    omission: "...",
    separator: " ",
  });
}
