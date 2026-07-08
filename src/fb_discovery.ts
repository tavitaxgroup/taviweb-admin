import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { supabase } from './lib/supabase';
import 'dotenv/config';

const configPath = path.join(__dirname, 'config/scraper_config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const progressPath = path.join(__dirname, 'config/fb_progress.json');

const SERPER_API_KEY = process.env.SERPER_API_KEY;

// Regex tìm số điện thoại Việt Nam trong chuỗi (03, 05, 07, 08, 09)
const phoneRegex = /(?:0|\+84)(?:[3|5|7|8|9])[0-9]{8}\b/g;

async function runFBScraper() {
  console.log(`[FACEBOOK DISCOVERY AGENT] Bắt đầu khởi chạy hệ thống cào Fanpage bằng Serper API...`);
  
  if (!SERPER_API_KEY) {
    console.error("Lỗi: Không tìm thấy SERPER_API_KEY trong file .env");
    return;
  }

  let progress = { industryIndex: 0, locationIndex: 0 };
  if (fs.existsSync(progressPath)) {
    try {
      progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
      console.log(`[RESUME] Tiếp tục từ Ngành index: ${progress.industryIndex}, Quận index: ${progress.locationIndex}`);
    } catch (e) {
      console.log("Không thể đọc file fb_progress, chạy lại từ đầu.");
    }
  }

  for (let i = progress.industryIndex; i < config.industries.length; i++) {
    const industry = config.industries[i];
    const startLocIndex = (i === progress.industryIndex) ? progress.locationIndex : 0;

    for (let j = startLocIndex; j < config.locations.length; j++) {
      const location = config.locations[j];
      
      const query = `site:facebook.com "${industry.keyword}" "${location}" "${config.city}"`;
      console.log(`\n======================================`);
      console.log(`[FB QUERY] Đang tìm kiếm: ${query}`);
      console.log(`======================================`);

      try {
        const response = await axios.post(
          'https://google.serper.dev/search',
          { q: query, gl: 'vn', hl: 'vi' },
          { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
        );

        const searchResults = response.data.organic || [];
        console.log(`Tìm thấy ${searchResults.length} Fanpage. Bắt đầu phân tích...`);

        for (const res of searchResults) {
          if (!res.link || !res.link.includes('facebook.com')) continue;
          if (res.link.match(/\/(posts|groups|watch|videos|events|photos|reel|story\.php|permalink\.php|photo\.php|people|public)(\/|\?|$)/i)) continue;

          let name = res.title.split(' - ')[0].replace(' | Facebook', '').replace('Facebook', '').trim();
          
          let phone = null;
          const fullText = (res.title || "") + " " + (res.snippet || "");
          const cleanText = fullText.replace(/[\.\s\,\-]/g, '');
          const phoneMatches = cleanText.match(phoneRegex);
          if (phoneMatches && phoneMatches.length > 0) {
            phone = phoneMatches[0];
            if (phone.startsWith('84')) phone = '0' + phone.slice(2);
            if (phone.startsWith('+84')) phone = '0' + phone.slice(3);
          }

          const hashUrl = require('crypto').createHash('md5').update(res.link).digest('hex').substring(0, 15);
          const placeId = 'FB_' + hashUrl;

          const leadRecord = {
            place_id: placeId,
            name: name,
            industry: industry.id,
            formatted_address: `${location}, ${config.city} (Nguồn: Facebook)`,
            formatted_phone_number: phone || null,
            website: res.link, 
            status: 'facebook',
            image_url: null,
            rating: null,
            user_ratings_total: null
          };

          const { error } = await supabase.from('leads').upsert(leadRecord, { onConflict: 'place_id' });
          if (error) {
             console.error(`[-] Lỗi lưu Supabase cho FB ${name}:`, error.message);
          } else {
             console.log(`[+] Đã lưu FB Lead: ${name} ${phone ? '(SĐT: ' + phone + ')' : '(Không SĐT)'}`);
          }
        }

        fs.writeFileSync(progressPath, JSON.stringify({ industryIndex: i, locationIndex: j + 1 }), 'utf-8');
        
        await new Promise(r => setTimeout(r, 1000));

      } catch (e: any) {
        console.error(`\n[LỖI] Lỗi tại query ${query}.`, e.message);
      }
    }
    
    fs.writeFileSync(progressPath, JSON.stringify({ industryIndex: i + 1, locationIndex: 0 }), 'utf-8');
  }

  console.log(`\n[HOÀN TẤT] Hệ thống Facebook Discovery đã quét xong toàn bộ danh mục!`);
}

runFBScraper();
