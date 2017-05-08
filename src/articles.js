const fs = require('fs');
const path = require('path');
const marked = require('meta-marked');
const moment = require('moment');

const articlesDir = 'articles';

const parse = fileName => {
  const parsed = marked(fs.readFileSync(path.join(articlesDir, fileName), {encoding: 'utf8'}));
  const date = moment(parsed.meta.date);
  const isDateThisYear = date.year() === moment().year();
  return {
    path: `${fileName.replace(/\..+$/, '')}.html`,
    title: parsed.meta.title,
    date: date,
    isThisYear: isDateThisYear,
    sortKey: date.format('YYYYMMDDHHMM'),
    machineDate: date.format('YYYY-MM-DD'),
    humanDate: date.locale('en').format(`MMMM D${isDateThisYear ? '' : ', Y'}`),
    rssDate: date.locale('en').format('DD MMM YYYY HH:MM ZZ'),
    body: parsed.html,
  };
};

module.exports.load = () => fs.readdirSync(articlesDir).map(parse);
