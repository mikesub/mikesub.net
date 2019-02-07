const fs = require('fs');
const path = require('path');
const marked = require('meta-marked');
const moment = require('moment');
const extractDescription = require('./extractDescription');


const articlesDir = 'articles';

const parse = fileName => {
  const parsed = marked(fs.readFileSync(path.join(articlesDir, fileName), {encoding: 'utf8'}));
  const date = moment.parseZone(parsed.meta.date);
  const isDateThisYear = date.year() === moment().year();
  return {
    path: `${fileName.replace(/\..+$/, '')}.html`,
    title: parsed.meta.title,
    date: date,
    isThisYear: isDateThisYear,
    sortKey: date.format('YYYYMMDDHHmm'),
    machineDate: date.format('YYYY-MM-DD'),
    humanDate: date.locale('en').format(`MMMM D${isDateThisYear ? '' : ', Y'}`),
    rssDate: date.locale('en').format('DD MMM YYYY HH:mm ZZ'),
    feedDate: date.locale('en').format('YYYY-MM-DDTHH:mm:ssZ'),
    body: parsed.html,
    description: extractDescription(parsed.html)
  };
};

module.exports.load = () => fs.readdirSync(articlesDir).map(parse);
