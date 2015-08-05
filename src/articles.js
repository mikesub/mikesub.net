import fs from 'fs';

import marked from 'marked';
import moment from 'moment';

function getDescription(html) {
  const words = html
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\n/g, ' ')
    .split(' ');
  let result = '';

  for (const word of words) {
    if (result.length + word.length + 3 > 200) {
      if (!result.endsWith('.')) {
        result += '...';
      }
      break;
    }
    result += ` ${word}`;
  }

  return result;
}

function parseArticle(fileName) {
  const body = marked(fs.readFileSync(`./articles/${fileName}.md`, {encoding: 'utf8'}));
  const meta = JSON.parse(fs.readFileSync(`./articles/${fileName}.json`));
  const title = meta.title;
  const date = moment(meta.date);
  const isDateThisYear = date.year() === moment().year();

  return {
    title: title,
    body: body,
    description: getDescription(body),
    machineDate: date.format('YYYY-MM-DD'),
    sortKey: date.format('YYYYMMDDHHMM'),
    humanDate: `${date.locale('ru').format('D MMMM')}${isDateThisYear ? '' : ` ${date.year()}`}`,
    rssDate: date.locale('en').format('DD MMM YYYY HH:MM ZZ'),
    path: `${fileName}.html`,
  };
}

export default () => fs
  .readdirSync('./articles')
  .filter(i => i.endsWith('.md'))
  .map(i => i.replace(/\..+$/, ''))
  .map(parseArticle);
