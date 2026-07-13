const puppeteer = require('puppeteer');
async function test() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  await page.goto('https://html.duckduckgo.com/html/?q=nha+khoa+hi-care', { waitUntil: 'networkidle2' });
  
  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.result')).map(el => {
      const a = el.querySelector('.result__url');
      const title = el.querySelector('.result__title');
      const snippet = el.querySelector('.result__snippet');
      return {
        link: a ? a.href : '',
        title: title ? title.innerText : '',
        snippet: snippet ? snippet.innerText : ''
      };
    });
  });
  console.log("Found", results.length, "results on DDG");
  console.log(results[0]);
  await browser.close();
}
test();
