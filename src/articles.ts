import fs from "fs";
import marked from "meta-marked";
import moment from "moment";
import path from "path";
import { articlesDir } from "../config.json";
import * as description from "./description";

export type Article = {
  path: string;
  title: string;
  date: moment.Moment;
  isThisYear: boolean;
  sortKey: string;
  machineDate: string;
  humanDate: string;
  rssDate: string;
  feedDate: string;
  body: string;
  description: string;
};

function parseArticle(fileName: string): Article {
  const parsed = marked(
    fs.readFileSync(path.join(articlesDir, fileName), { encoding: "utf8" })
  );
  const date = moment.parseZone(parsed.meta.date);
  const isDateThisYear = date.year() === moment().year();
  return {
    path: `${fileName.replace(/\..+$/, "")}.html`,
    title: parsed.meta.title,
    date,
    isThisYear: isDateThisYear,
    sortKey: date.format("YYYYMMDDHHmm"),
    machineDate: date.format("YYYY-MM-DD"),
    humanDate: date.locale("en").format(`MMMM D${isDateThisYear ? "" : ", Y"}`),
    rssDate: date.locale("en").format("DD MMM YYYY HH:mm ZZ"),
    feedDate: date.locale("en").format("YYYY-MM-DDTHH:mm:ssZ"),
    body: parsed.html,
    description: description.truncate(parsed.html)
  };
}

export function load() {
  return fs.readdirSync(articlesDir).map(parseArticle);
}
