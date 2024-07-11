import * as path from "@std/path";
import marked from "meta-marked";
import * as dateFns from "date-fns";
import * as description from "./description.js";
import config from "./config.js";

function parseArticle(fileEntry) {
  const parsed = marked(
    new TextDecoder("utf-8").decode(
      Deno.readFileSync(path.join(config.articlesDir, fileEntry.name)),
    ),
  );

  const date = Date.UTC(
    Number(parsed.meta.date.substring(0, 4)),
    Number(parsed.meta.date.substring(5, 7)) - 1,
    Number(parsed.meta.date.substring(8, 10)),
    Number(parsed.meta.date.substring(11, 13)),
    Number(parsed.meta.date.substring(14)),
  );
  const isDateThisYear = dateFns.isThisYear(date);

  return {
    path: `${fileEntry.name.replace(/\..+$/, "")}.html`,
    title: parsed.meta.title,
    date: date,
    isThisYear: isDateThisYear,
    sortKey: dateFns.format(date, "yyyyLLddHHmm"),
    machineDate: dateFns.format(date, "yyyy-LL-dd"),
    humanDate: dateFns.format(date, `LLLL d${isDateThisYear ? "" : ", yyyy"}`),
    rssDate: dateFns.format(date, "dd LLL yyyy HH:mm xx"),
    feedDate: dateFns.format(date, "yyyy-LL-dd'T'HH:mm:ssxxx"),
    body: parsed.html,
    description: description.truncate(parsed.html),
    photo: parsed.meta.photo,
  };
}

export function load() {
  return Array.from(Deno.readDirSync(config.articlesDir))
    .filter((dirEntry) => dirEntry.isFile && !dirEntry.name.startsWith("_"))
    .map(parseArticle);
}
