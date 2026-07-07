import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { supabase } from './lib/supabase';

// Đọc cấu hình
const configPath = path.join(__dirname, 'config/scraper_config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const progressPath = path.join(__dirname, 'config/progress.json');
const leadsDir = path.join(__dirname, 'data/leads');

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function runScraper() {
  console.log(`[LARGE-SCALE SCRAPER] Bắt đầu khởi chạy hệ thống cào dữ liệu...`);
  
  // Khôi phục tiến độ nếu có
  let progress = { industryIndex: 0, locationIndex: 0 };
  if (fs.existsSync(progressPath)) {
    try {
      progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
      console.log(`[RESUME] Tiếp tục từ Ngành index: ${progress.industryIndex}, Quận index: ${progress.locationIndex}`);
    } catch (e) {
      console.log("Không thể đọc file progress, chạy lại từ đầu.");
    }
  }

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  for (let i = progress.industryIndex; i < config.industries.length; i++) {
    const industry = config.industries[i];
    const outputFile = path.join(leadsDir, `${industry.id}.json`);
    
    // Đọc dữ liệu cũ nếu có
    let currentLeads = [];
    if (fs.existsSync(outputFile)) {
      try {
        currentLeads = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      } catch (e) { /* ignore */ }
    }

    const startLocIndex = (i === progress.industryIndex) ? progress.locationIndex : 0;

    for (let j = startLocIndex; j < config.locations.length; j++) {
      const location = config.locations[j];
      const query = `${industry.keyword} tại ${location}, ${config.city}`;
      console.log(`\n======================================`);
      console.log(`[QUERY] Đang tìm kiếm: "${query}"`);
      console.log(`======================================`);

      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
      
      try {
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        
        // Đợi kết quả
        await page.waitForSelector('a[href*="/maps/place/"]', { timeout: 15000 }).catch(() => {});
        await delay(2000);

        const placeLinks = await page.evaluate((max) => {
          const links = Array.from(document.querySelectorAll('a[href*="/maps/place/"]'));
          return [...new Set(links.map(a => (a as HTMLAnchorElement).href))].slice(0, max);
        }, config.maxResultsPerQuery);

        console.log(`Tìm thấy ${placeLinks.length} kết quả. Đang thu thập...`);

        for (let k = 0; k < placeLinks.length; k++) {
          const url = placeLinks[k];
          try {
            await page.goto(url, { waitUntil: 'networkidle2' });
            await delay(1500); // Chờ animation

            const data = await page.evaluate(() => {
              const nameEl = document.querySelector('h1');
              const name = nameEl ? nameEl.innerText : 'Unknown';

              let rating = 0;
              let reviews = 0;
              const ratingEl = document.querySelector('div[role="img"][aria-label*=" sao"], div[role="img"][aria-label*=" stars"]');
              if (ratingEl) {
                const ariaLabel = ratingEl.getAttribute('aria-label') || '';
                const matchRating = ariaLabel.match(/([\d\.]+)\s*(sao|stars)/);
                const matchReviews = ariaLabel.match(/([\d\,\.]+)\s*(bài đánh giá|reviews)/);
                if (matchRating) rating = parseFloat(matchRating[1].replace(',', '.'));
                if (matchReviews) reviews = parseInt(matchReviews[1].replace(/\D/g, ''));
              }

              let website = null;
              const webLinks = Array.from(document.querySelectorAll('a'));
              for (const a of webLinks) {
                const href = a.getAttribute('href');
                const aria = a.getAttribute('aria-label') || '';
                if (href && (a.dataset.itemId === 'authority' || aria.includes('Trang web') || aria.includes('Website'))) {
                  website = href;
                  break;
                }
              }

              let phone = null;
              const phoneBtns = Array.from(document.querySelectorAll('button[data-item-id*="phone:tel:"]'));
              if (phoneBtns.length > 0) {
                const aria = phoneBtns[0].getAttribute('aria-label') || '';
                phone = aria.replace('Số điện thoại: ', '').trim();
              }

              let imageUrl = null;
              const images = Array.from(document.querySelectorAll('img'));
              for (const img of images) {
                const src = img.getAttribute('src');
                if (src && (src.includes('lh3.googleusercontent.com') || src.includes('lh5.googleusercontent.com')) && !src.includes('Author')) {
                   imageUrl = src.split('=')[0] + '=w800-h600-k-no';
                   break;
                }
              }

              // Trích xuất một review mẫu (tìm các thẻ chứa dấu ngoặc kép hoặc có nội dung dài trên 20 ký tự trong khu vực review)
              let reviewText = "Dịch vụ ở đây cực kỳ chuyên nghiệp và tận tâm. Không gian sạch sẽ, bác sĩ rất nhiệt tình và chu đáo. Hoàn toàn hài lòng và sẽ giới thiệu cho bạn bè!"; // Fallback mặc định
              const possibleReviews = Array.from(document.querySelectorAll('span')).filter(el => {
                const text = el.innerText || '';
                // Các review snippet trên map thường kết thúc bằng "..." hoặc nằm sau tên người dùng
                return text.length > 30 && text.length < 200 && !text.includes('Google') && !text.includes('Website');
              });
              if (possibleReviews.length > 0) {
                 // Lấy cái đầu tiên có vẻ hợp lý
                 reviewText = possibleReviews[0].innerText.replace(/\n/g, ' ').replace(/\.\.\.$/, '') + "...";
              }

              return {
                place_id: "ID_" + Math.random().toString(36).substr(2, 9),
                name, rating, user_ratings_total: reviews, website, formatted_phone_number: phone, image_url: imageUrl, review_text: reviewText
              };
            });

            // Lọc Lead: Không web hoặc Facebook
            const isLead = !data.website || data.website.toLowerCase().includes('facebook.com') || data.website.toLowerCase().includes('fb.com');
            
            if (isLead) {
              console.log(`[+] PHÁT HIỆN LEAD: ${data.name} - Web: ${data.website || 'Trống'}`);
              const leadRecord = {
                place_id: data.place_id,
                name: data.name,
                industry: industry.id,
                formatted_address: `${location}, ${config.city}`,
                formatted_phone_number: data.formatted_phone_number || null,
                website: data.website || null,
                status: 'new',
                image_url: data.image_url || null,
                rating: data.rating || null,
                user_ratings_total: data.user_ratings_total || null
              };
              
              const { error } = await supabase.from('leads').upsert(leadRecord, { onConflict: 'place_id' });
              if (error) {
                 console.error(`[-] Lỗi lưu Supabase cho ${data.name}:`, error.message);
              }
            } else {
              process.stdout.write('.'); // In dấu chấm cho những chỗ không phải lead để log đỡ dài
            }

          } catch (e) {
            console.log(`\n[-] Lỗi khi xử lý địa điểm thứ ${k+1}`);
          }
        } // End loop places

        // Không còn lưu file JSON của ngành đó nữa, data đã nằm trên Supabase.

        // Lưu progress
        fs.writeFileSync(progressPath, JSON.stringify({ industryIndex: i, locationIndex: j + 1 }), 'utf-8');
        
        console.log(`\nHoàn tất ${location}. Tạm nghỉ Anti-bot ${config.delayBetweenQueriesMs/1000}s...`);
        await delay(config.delayBetweenQueriesMs);

      } catch (e) {
        console.error(`\n[LỖI NGHIÊM TRỌNG] Lỗi tại ${query}. Sẽ thử lại sau.`, e.message);
      }
    } // End loop locations
    
    // Reset location index cho ngành tiếp theo
    fs.writeFileSync(progressPath, JSON.stringify({ industryIndex: i + 1, locationIndex: 0 }), 'utf-8');
  } // End loop industries

  await browser.close();
  console.log(`\n[HOÀN TẤT] Hệ thống đã quét xong toàn bộ danh mục!`);
}

runScraper();
