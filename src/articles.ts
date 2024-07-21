import marked from "meta-marked";
import * as description from "./description.ts";
import config from "../config.json" with { type: "json" };
import type { Article } from "./types.ts";

function addLeadingZero(number: number) {
  return number < 10 ? `0${number}` : String(number);
}

function parseArticle(fileEntry: Deno.DirEntry): Article {
  const parsed = marked(
    Deno.readTextFileSync(`${config.articlesDir}${fileEntry.name}`),
  );

  const yearUTC = Number(parsed.meta.date.substring(0, 4));
  const monthUTC = Number(parsed.meta.date.substring(5, 7));
  const dayUTC = Number(parsed.meta.date.substring(8, 10));
  const hoursUTC = Number(parsed.meta.date.substring(11, 13));
  const minutesUTC = Number(parsed.meta.date.substring(14));

  const isDateThisYear = yearUTC === new Date().getUTCFullYear();
  const date = new Date(
    Date.UTC(yearUTC, monthUTC - 1, dayUTC, hoursUTC, minutesUTC),
  );

  const yyyy = date.getFullYear(); // 2024
  const d = date.getDate(); // 1
  const dd = addLeadingZero(d); // 01
  const HH = addLeadingZero(date.getHours()); // 01
  const mm = addLeadingZero(date.getMinutes()); // 01
  const ss = "00";
  const LL = addLeadingZero(date.getMonth() + 1); // 01
  const LLL = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date); // Jan
  const LLLL = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date); // January
  const tzOffset = date.getTimezoneOffset();
  const tzSign = tzOffset < 0 ? "+" : "-";
  const tzHours = Math.floor(Math.abs(tzOffset) / 60);
  const tzMinutes = (tzOffset / 60 - Math.floor(tzOffset / 60)) * 60;
  const xx = `${tzSign}${addLeadingZero(tzHours)}${addLeadingZero(tzMinutes)}`; // -0800, +0530, +0000
  const xxx = `${tzSign}${addLeadingZero(tzHours)}:${
    addLeadingZero(tzMinutes)
  }`; // -08:00, +05:30, +00:00

  return {
    path: `${fileEntry.name.replace(/\..+$/, "")}.html`,
    title: parsed.meta.title,
    date: date,
    isThisYear: isDateThisYear,
    sortKey: Number(`${yyyy}${LL}${dd}${HH}${mm}`),
    machineDate: `${yyyy}-${LL}-${dd}`,
    humanDate: `${LLLL} ${d}${isDateThisYear ? "" : `, ${yyyy}`}`,
    rssDate: `${dd} ${LLL} ${yyyy} ${HH}:${mm} ${xx}`,
    feedDate: `${yyyy}-${LL}-${dd}T${HH}:${mm}:${ss}${xxx}`,
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
