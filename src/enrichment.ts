import puppeteer from 'puppeteer';
import { supabase } from './lib/supabase';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function runEnrichment() {
  const isTest = process.argv.includes('--test');
  console.log(`[ENRICHMENT AGENT] Bắt đầu làm giàu dữ liệu (Chế độ: ${isTest ? 'TEST' : 'TOÀN BỘ'})...`);
  
  // Lấy danh sách leads từ Supabase
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('status', 'new');

  if (error || !leads) {
    console.error('Lỗi khi lấy dữ liệu từ Supabase:', error?.message);
    return;
  }

  console.log(`Tìm thấy ${leads.length} leads cần làm giàu.`);

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let testCount = 0;

  for (const lead of leads) {
    console.log(`\n======================================`);
    console.log(`[ENRICH] Đang xử lý: ${lead.name}`);
    
    let updatedLead = { ...lead };
    let modified = false;

    // 1. Cào địa chỉ chi tiết (nếu chưa có)
    if (!updatedLead.formatted_address || updatedLead.formatted_address.split(',').length < 3 || updatedLead.formatted_address.startsWith('Quận')) {
      const query = `${lead.name} ${lead.formatted_address || "Hồ Chí Minh"}`;
      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=vi`;
      
      try {
        await page.goto(searchUrl, { waitUntil: 'networkidle2' });
        await delay(3000); 
        
        const exactAddress = await page.evaluate(() => {
          const btn = document.querySelector('button[data-item-id="address"]');
          if (btn) {
            const aria = btn.getAttribute('aria-label') || '';
            return aria.replace('Địa chỉ: ', '').replace('Address: ', '').trim();
          }
          const addressDivs = Array.from(document.querySelectorAll('div.fontBodyMedium')).filter(el => {
            const text = el.textContent || '';
            return text.includes('Quận') || text.includes('Phường') || text.includes('TP.HCM');
          });
          if (addressDivs.length > 0) return addressDivs[0].textContent?.trim();
          return null;
        });

        if (exactAddress && exactAddress.length > 5) {
          console.log(` => [MAPS] Đã tìm thấy địa chỉ: ${exactAddress}`);
          updatedLead.formatted_address = exactAddress;
          modified = true;
        }
      } catch (e) {
        console.log(` => [MAPS] Lỗi mạng khi tra cứu địa chỉ.`);
      }
    }

    // 2. Cào Facebook
    if (!updatedLead.facebook_url) {
      const fbQuery = `site:facebook.com "${lead.name}"`;
      const fbSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(fbQuery)}`;
      
      try {
        await page.goto(fbSearchUrl, { waitUntil: 'networkidle2' });
        await delay(2000);

        const fbResult = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          for (const a of links) {
            const href = a.href;
            if (href.includes('facebook.com') && !href.includes('/groups/') && !href.includes('/events/')) {
              return href.split('?')[0]; // Clean URL
            }
          }
          return null;
        });

        if (fbResult) {
          console.log(` => [FACEBOOK] Tìm thấy Fanpage: ${fbResult}`);
          updatedLead.facebook_url = fbResult;
          modified = true;

          // Optional: Chui vào facebook lấy Follower (Rủi ro bị chặn)
          // Tạm thời chỉ lấy URL từ Google để đảm bảo an toàn nếu không có cookie login
        } else {
          console.log(` => [FACEBOOK] Không tìm thấy Fanpage.`);
        }

      } catch (e) {
        console.log(` => [FACEBOOK] Lỗi khi tra cứu Fanpage.`);
      }
    }

    // Đánh dấu đã làm giàu
    if (modified) {
      updatedLead.status = 'verified';
      const { error: updateError } = await supabase
        .from('leads')
        .update(updatedLead)
        .eq('id', lead.id);

      if (updateError) {
         console.error(` => [LỖI DB] Lỗi cập nhật lên Supabase:`, updateError.message);
      } else {
         console.log(` => [DB] Cập nhật thành công lên Supabase.`);
      }
    } else {
      // Đổi status thành verified_no_data để lần sau không quét lại
      await supabase.from('leads').update({ status: 'verified_no_data' }).eq('id', lead.id);
    }

    testCount++;
    if (isTest && testCount >= 3) break;
    
    await delay(2000);
  }

  await browser.close();
  console.log(`\n[HOÀN TẤT] Enrichment Agent đã hoàn thành!`);
}

runEnrichment();
