const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Go to the live site
  await page.goto('https://taviweb.vercel.app', { waitUntil: 'networkidle2' });
  
  // Wait a bit just in case
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  await browser.close();
  console.log("Screenshot saved as screenshot.png");
})();
