const ending = "...";
const length = 200;

function stripTags(html) {
  return html.replace(/<\/?[^>]+>/g, "");
}

function splitByWords(text) {
  return text.replace(/\n/g, " ").split(" ");
}

module.exports = function(html) {
  const words = splitByWords(stripTags(html));
  let result = ""; // eslint-disable-line fp/no-let

  // eslint-disable-next-line fp/no-loops, fp/no-nil, fp/no-mutation
  for (const word of words) {
    if (result.length + word.length + ending.length > length) {
      result += ending; // eslint-disable-line fp/no-mutation
      break;
    }
    result += ` ${word}`; // eslint-disable-line fp/no-mutation
  }

  return result;
};
