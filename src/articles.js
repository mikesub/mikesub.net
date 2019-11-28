const fs = require("fs");
const path = require("path");
const marked = require("meta-marked");
const dateFns = require("date-fns");
const description = require("./description");
const { articlesDir } = require("../config.json");

function parseArticle(fileName) {
  const parsed = marked(
    fs.readFileSync(path.join(articlesDir, fileName), { encoding: "utf8" })
  );

  const date = Date.UTC(
    Number(parsed.meta.date.substring(0, 4)),
    Number(parsed.meta.date.substring(5, 7)) - 1,
    Number(parsed.meta.date.substring(8, 10)),
    Number(parsed.meta.date.substring(11, 13)),
    Number(parsed.meta.date.substring(14))
  );
  const isDateThisYear = dateFns.isThisYear(date);

  return {
    path: `${fileName.replace(/\..+$/, "")}.html`,
    title: parsed.meta.title,
    date: date,
    isThisYear: isDateThisYear,
    sortKey: dateFns.format(date, "yyyyLLddHHmm"),
    machineDate: dateFns.format(date, "yyyy-LL-dd"),
    humanDate: dateFns.format(date, `LLLL d${isDateThisYear ? "" : ", yyyy"}`),
    rssDate: dateFns.format(date, "dd LLL yyyy HH:mm xx"),
    feedDate: dateFns.format(date, "yyyy-LL-dd'T'HH:mm:ssxxx"),
    body: parsed.html,
    description: description.truncate(parsed.html)
  };
}

function load() {
  return fs
    .readdirSync(articlesDir)
    .filter(fileName => !fileName.startsWith("_"))
    .map(parseArticle);
}

module.exports = { load };
