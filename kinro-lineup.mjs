async function fetch_html(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const html = res.text();
  return html;
}

function scrape_html(html) {
  const result = html
    .replaceAll(/\n|\t/g, "")
    .match(/<section id="after_lineup">.*?<\/section>/)[0]
    .match(/<li>.*?<\/li>/g)
    .map(el => {
      const href = el.match(/href='(.*?)'/)[1];
      const src = el.match(/src="(.*?)"/)[1];
      const date = el.match(/class="date">(.*?)</)[1];
      const title = el.match(/alt="(.*?)"/)[1];
      const lineupid = el.match(/lineupid="(\d*?)"/)[1];
      const mitai = el.match(/<mark class="en">(\d*?)</)[1];
      return {
        href,
        src,
        date,
        lineupid,
        mitai,
        title
      }
    });
  return result;
}

export {
  fetch_html,
  scrape_html
};
