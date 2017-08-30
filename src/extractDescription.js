const ending = '...';
const length = 200;

module.exports = function (html) {
  const words = html
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\n/g, ' ')
    .split(' ');
  let result = '';

  for (const word of words) {
    if (result.length + word.length + ending.length > length) {
      result += ending;
      break;
    }
    result += ` ${word}`;
  }

  return result;
};
