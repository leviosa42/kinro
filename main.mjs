const CONSTANTS = {
  LINEUP_URL: "https://kinro.ntv.co.jp/lineup"
};

import {
  fetch_html,
  scrape_html
} from "./kinro-lineup.mjs";

const html = await fetch_html(CONSTANTS.LINEUP_URL);
const scraped = scrape_html(html);

const processed = scraped.map(el => {
  return {
    title: el.title,
    broadcastDate: el.date.replace("放送", ""),
    thumbnailUrl: el.src,
    articleUrl: CONSTANTS.LINEUP_URL + el.href,
    lineupId: el.lineupid,
    mitaiCount: el.mitai,
    raw: el
  }
});

const json = JSON.stringify({
  createdAt: new Date().toISOString(), 
  movies: processed
}, null, 2);
console.log(json);


