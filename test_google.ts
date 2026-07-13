import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=site:facebook.com+"Spa+thẩm+mỹ"+"Quận+3"');
  await page.screenshot({ path: 'test_google.png' });
  const title = await page.title();
  const count = await page.evaluate(() => document.querySelectorAll('div.g').length);
  console.log("Title:", title);
  console.log("Results found with div.g:", count);
  await browser.close();
})();
