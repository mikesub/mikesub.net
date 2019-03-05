import _ from "lodash";

function stripTags(html: string) {
  return html.replace(/<\/?[^>]+>/g, "");
}
function stripNewLines(text: string) {
  return text.replace(/\n/g, "");
}

export function truncate(html: string) {
  return _.truncate(stripNewLines(stripTags(html)), {
    length: 200,
    omission: "...",
    separator: " "
  });
}
