const puppeteer = require('puppeteer');
async function test() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  const query = '0934781722 "Nha Khoa Hi-Care"';
  await page.goto(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
  
  const results = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.result')).map(el => {
      const a = el.querySelector('.result__url');
      return a ? a.href : null;
    }).filter(Boolean);
  });
  console.log("Found", results.length, "results for query:", query);

  const query2 = '"Phone: +84 934 781 722" "Nha Khoa Hi-Care"';
  await page.goto(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query2)}`, { waitUntil: 'networkidle2' });
  const results2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.result')).map(el => {
      const a = el.querySelector('.result__url');
      return a ? a.href : null;
    }).filter(Boolean);
  });
  console.log("Found", results2.length, "results for query:", query2);

  await browser.close();
}
test();
