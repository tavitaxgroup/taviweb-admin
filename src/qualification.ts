import puppeteer from 'puppeteer';
import { supabase } from './lib/supabase';
import 'dotenv/config';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const IGNORED_DOMAINS = [
  'youtube.com', 'tiktok.com', 'instagram.com', 
  'foody.vn', 'toplist.vn', 'diadiem.com', 'vietbando.com', 'vnexpress.net', 
  'thanhnien.vn', 'tuoitre.vn', 'dantri.com.vn', 'shopee.vn', 'lazada.vn',
  'tiki.vn', 'chotot.com', 'yellowpages.vn', 'trangvangvietnam.com', 'maps.google.com',
  'google.com', 'zalo.me', 'zaloapp.com', 'hsctvn.com', 'masothue.com',
  'tracuumasothue.com', 'tracuunnt.gdt.gov.vn', 'hosocongty.vn', 'thuonggiaonline.vn',
  'infodoanhnghiep.com', 'doanhnghiep.vn', 'timdoanhnghiep.com', 'vinapha.com',
  'vmap.vn', 'nhakhoatot.com', 'nhasioi.vn', 'sotayvang.com', 'doctogo.vn',
  'viet-biz.com', 'danhsachcuahang.com', 'doctortrust.vn', 'beautihost.com',
  'worldplaces.me', 'congchungnguyenvietcuong.com', 'thuvienphapluat.vn',
  'doanhnghiep.me', 'tratencongty.com', 'danhba.net', 'topaz.vn', 'top3.vn',
  'canthoreview.vn', 'bacsi247.com', 'asiafirms.com', 'youmed.vn', 'bookingcare.vn',
  'dongnaireview.vn', 'bvranghammat.com', 'hellodaklak.com', 'sotongdai.com',
  'bippermedia.com', 'maptons.com', 'reviewnhakhoa.com', 'cybo.com', 'tungnguyenads.com'
];

async function runQualification() {
  console.log(`[QUALIFICATION AGENT] Bắt đầu quá trình xác thực Leads bằng Puppeteer (Google Search)...`);
  
  // Fetch leads from Supabase
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .or('status.eq.new,status.eq.facebook')
    .is('website', null);

  if (error) {
    console.error("Lỗi khi tải dữ liệu từ Supabase:", error);
    return;
  }

  if (!leads || leads.length === 0) {
    console.log("Không tìm thấy Lead mới nào cần kiểm chứng trên cơ sở dữ liệu.");
    return;
  }

  console.log(`Tìm thấy ${leads.length} Leads cần xác thực từ Supabase. Đang khởi động trình duyệt...`);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const phone = lead.formatted_phone_number || '';
    const name = lead.name || '';
    let currentFbUrl = lead.facebook_url || '';

    // Chuẩn hóa sđt để search (DuckDuckGo rất khắt khe với ngoặc kép)
    let cleanPhoneForQuery = '';
    if (phone) {
        cleanPhoneForQuery = phone.replace(/Phone:\s*/i, '').trim();
        if (cleanPhoneForQuery.startsWith('+84')) {
            cleanPhoneForQuery = '0' + cleanPhoneForQuery.slice(3).replace(/\D/g, '');
        } else {
            cleanPhoneForQuery = cleanPhoneForQuery.replace(/\D/g, '');
        }
    }

    // Xây dựng cú pháp search thông minh, bỏ ngoặc kép để DuckDuckGo dễ tìm hơn
    const query = cleanPhoneForQuery ? `${cleanPhoneForQuery} ${name}` : `${name}`;
    console.log(`\n======================================`);
    console.log(`[SEARCH] Đang kiểm chứng (${i+1}/${leads.length}): ${name}`);
    console.log(`[QUERY] ${query}`);
    
    try {
      const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      await delay(1500); // Chờ load trang

      const searchResults = await page.evaluate(() => {
        const results = Array.from(document.querySelectorAll('.result'));
        return results.map((el) => {
          const a = el.querySelector('.result__url') as HTMLAnchorElement;
          const title = el.querySelector('.result__title');
          const snippet = el.querySelector('.result__snippet');
          
          let actualUrl = '';
          if (a && a.href) {
             try {
                const urlObj = new URL(a.href);
                actualUrl = decodeURIComponent(urlObj.searchParams.get('uddg') || a.href);
             } catch (e) {
                actualUrl = a.href;
             }
          }
          
          return {
            link: actualUrl,
            title: title ? (title as HTMLElement).innerText : '',
            snippet: snippet ? (snippet as HTMLElement).innerText : ''
          };
        }).filter(r => r.link && r.title);
      });

      console.log(`Tìm thấy ${searchResults.length} kết quả tự nhiên.`);
      
      let foundRealWebsite = false;
      let foundUrl = '';
      let foundFbUrl = currentFbUrl;

      for (const res of searchResults) {
        try {
          const urlObj = new URL(res.link);
          const hostname = urlObj.hostname.toLowerCase();
          
          // Bắt FB page
          if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
              // Bỏ qua trang login, hashtag, ...
              if (!res.link.includes('/pages/') && !res.link.includes('/p/') && !res.link.match(/facebook\.com\/[^/]+$/)) {
                 continue; 
              }
              const nameParts = name.toLowerCase().split(' ').slice(0, 2).join(' '); // Match 2 chữ đầu
              if (res.title.toLowerCase().includes(nameParts) && !foundFbUrl) {
                  foundFbUrl = res.link;
                  console.log(`[SMART MATCH] Tìm thấy Facebook Page: ${foundFbUrl}`);
              }
              continue; // Bỏ qua FB page vì FB ko tính là website chính thức để gạt lead
          }

          // Bỏ qua các domain rác/mxh
          const isIgnored = IGNORED_DOMAINS.some(domain => hostname.includes(domain));
          if (isIgnored) continue;
          
          // SMART MATCHING
          const cleanPhone = phone.replace(/\D/g, '');
          const cleanSnippet = (res.title + ' ' + (res.snippet || '')).replace(/\D/g, '');
          
          let coreName = name.toLowerCase()
              .replace(/^(nha khoa thẩm mỹ|nha khoa quốc tế|phòng khám nha khoa|nha khoa|phòng răng|công ty|cty|chi nhánh)\s+/i, '')
              .trim();
          // Lấy 2 từ đầu của tên chính (sau khi bỏ prefix)
          const coreNameParts = coreName.split(' ').slice(0, 2).join(' ');
          
          const nameMatch = coreNameParts.length > 3 ? res.title.toLowerCase().includes(coreNameParts) : false;
          const phoneMatch = cleanPhone.length > 5 ? cleanSnippet.includes(cleanPhone) : false;

          // Relax condition: If no phone, just matching name loosely might be dangerous, but we try.
          if (nameMatch || phoneMatch) {
             foundRealWebsite = true;
             foundUrl = res.link;
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
        const updateData: any = { status: 'has_website', website: foundUrl };
        if (foundFbUrl && !currentFbUrl) updateData.facebook_url = foundFbUrl;
        await supabase.from('leads').update(updateData).eq('id', lead.id);
      } else if (phone || foundFbUrl) {
        console.log(`[KẾT LUẬN] => KHÁCH XỊN (VERIFIED): Hoàn toàn không có web!`);
        const updateData: any = { status: 'verified' };
        if (foundFbUrl && !currentFbUrl) updateData.facebook_url = foundFbUrl;
        await supabase.from('leads').update(updateData).eq('id', lead.id);
      } else {
        console.log(`[KẾT LUẬN] => THIẾU INFO: Không SĐT, Không Web, Không FB.`);
        await supabase.from('leads').update({ status: 'missing_info' }).eq('id', lead.id);
      }
      
      await delay(2500); // Chờ lâu hơn để tránh block từ Google

    } catch (e: any) {
      console.error(`[LỖI] Không thể kiểm chứng ${name}`, e.message);
    }
  }

  await browser.close();
  console.log(`\n[HOÀN TẤT] Quá trình kiểm chứng Qualification đã hoàn thành!`);
}

runQualification();
