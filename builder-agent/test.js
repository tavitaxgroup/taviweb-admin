const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:3000/admin/settings');
  await page.waitForSelector('button.fixed.bottom-6.right-6');
  await page.click('button.fixed.bottom-6.right-6');
  
  await page.waitForSelector('input[placeholder="Nhập câu hỏi của bạn..."]');
  await page.type('input[placeholder="Nhập câu hỏi của bạn..."]', 'Hello');
  await page.click('button[type="submit"]');
  
  await new Promise(r => setTimeout(r, 5000));
  
  const html = await page.evaluate(() => document.querySelector('.custom-scrollbar').innerHTML);
  console.log('HTML CONTENT:', html);
  
  await browser.close();
})();
