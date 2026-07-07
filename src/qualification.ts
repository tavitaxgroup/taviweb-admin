import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const IGNORED_DOMAINS = [
  'facebook.com', 'fb.com', 'youtube.com', 'tiktok.com', 'instagram.com', 
  'foody.vn', 'toplist.vn', 'diadiem.com', 'vietbando.com', 'vnexpress.net', 
  'thanhnien.vn', 'tuoitre.vn', 'dantri.com.vn', 'shopee.vn', 'lazada.vn',
  'tiki.vn', 'chotot.com', 'yellowpages.vn', 'trangvangvietnam.com', 'maps.google.com'
];

async function runQualification() {
  console.log(`[QUALIFICATION AGENT] Bắt đầu quá trình xác thực Leads...`);
  
  const leadsDir = path.join(__dirname, 'data/leads');
  if (!fs.existsSync(leadsDir)) {
    console.log(`Thư mục ${leadsDir} không tồn tại. Vui lòng chạy Discovery Agent trước.`);
    return;
  }

  const files = fs.readdirSync(leadsDir).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    console.log("Không tìm thấy file JSON nào trong data/leads.");
    return;
  }

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  for (const file of files) {
    const filePath = path.join(leadsDir, file);
    let leads = [];
    try {
      leads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      console.log(`Lỗi đọc file ${file}`);
      continue;
    }

    let modified = false;
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      // Chỉ check những lead mới (chưa qua qualification) hoặc chưa có website
      if (lead.status !== 'new' || lead.website !== null) {
        continue; 
      }

      const phone = lead.formatted_phone_number || '';
      const name = lead.name || '';
      if (!phone) {
        console.log(`[SKIP] Bỏ qua ${name} vì không có SĐT để cross-check.`);
        lead.status = 'verified'; // Xem như khách xịn vì ko tra cứu chéo được
        modified = true;
        continue;
      }

      // Xây dựng cú pháp search thông minh
      const query = `"${phone}" "${name}"`;
      console.log(`\n======================================`);
      console.log(`[SEARCH] Đang kiểm chứng: ${name}`);
      console.log(`[QUERY] ${query}`);
      
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      
      try {
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        await delay(2000); // Chờ load trang
        
        // Cào kết quả search (Top 5-10)
        const searchResults = await page.evaluate(() => {
          const results = [];
          const items = document.querySelectorAll('div.g'); // Class phổ biến của kết quả search Google
          
          items.forEach(item => {
            const linkEl = item.querySelector('a');
            const titleEl = item.querySelector('h3');
            // Cố gắng tìm phần mô tả (snippet)
            const snippetEl = item.querySelector('div[style*="-webkit-line-clamp"]'); 
            
            if (linkEl && titleEl) {
              results.push({
                url: linkEl.href,
                title: titleEl.innerText,
                snippet: snippetEl ? snippetEl.textContent : (item.textContent || '')
              });
            }
          });
          return results;
        });

        console.log(`Tìm thấy ${searchResults.length} kết quả tự nhiên.`);
        
        let foundRealWebsite = false;
        let foundUrl = '';

        for (const res of searchResults) {
          try {
            const urlObj = new URL(res.url);
            const hostname = urlObj.hostname.toLowerCase();
            
            // Bỏ qua các domain rác/mxh
            const isIgnored = IGNORED_DOMAINS.some(domain => hostname.includes(domain));
            if (isIgnored) continue;
            
            // SMART MATCHING
            // Kiểm tra xem title hoặc snippet có chứa SĐT hoặc tên hay không
            // Loại bỏ khoảng trắng/dấu để so sánh SĐT
            const cleanPhone = phone.replace(/\D/g, '');
            const cleanSnippet = (res.title + ' ' + res.snippet).replace(/\D/g, '');
            
            const nameMatch = res.title.toLowerCase().includes(name.toLowerCase().split(' ')[0]); // Check chữ đầu tiên của tên
            const phoneMatch = cleanPhone.length > 5 && cleanSnippet.includes(cleanPhone);

            if (nameMatch || phoneMatch) {
               foundRealWebsite = true;
               foundUrl = res.url;
               console.log(`[SMART MATCH] Phát hiện domain của chủ cơ sở: ${hostname}`);
               console.log(`  - Trùng khớp: ${nameMatch ? 'TÊN ' : ''}${phoneMatch ? 'SĐT' : ''}`);
               console.log(`  - Title: ${res.title}`);
               break;
            } else {
               console.log(`[IGNORE] Thấy domain ${hostname} nhưng content không khớp (Web đối thủ).`);
            }
          } catch (e) {
            // Lỗi URL parsing
          }
        }

        if (foundRealWebsite) {
          console.log(`[KẾT LUẬN] => LOẠI: Doanh nghiệp đã có web (${foundUrl})`);
          lead.status = 'has_website';
          lead.website = foundUrl; // Cập nhật luôn website tìm được
        } else {
          console.log(`[KẾT LUẬN] => KHÁCH XỊN (VERIFIED): Hoàn toàn không có web!`);
          lead.status = 'verified';
        }
        
        modified = true;
        
        // Random delay 7-12s chống Captcha
        const sleepTime = Math.floor(Math.random() * 5000) + 7000;
        console.log(`Tạm nghỉ Anti-bot ${Math.round(sleepTime/1000)}s...`);
        await delay(sleepTime);

      } catch (e) {
        console.error(`[LỖI] Không thể kiểm chứng ${name}`, e.message);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
      console.log(`Đã cập nhật trạng thái vào file ${file}`);
    }
  }

  await browser.close();
  console.log(`\n[HOÀN TẤT] Quá trình kiểm chứng Qualification đã hoàn thành!`);
}

runQualification();
