import axios from 'axios';
import { supabase } from './lib/supabase';
import 'dotenv/config';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const IGNORED_DOMAINS = [
  'facebook.com', 'fb.com', 'youtube.com', 'tiktok.com', 'instagram.com', 
  'foody.vn', 'toplist.vn', 'diadiem.com', 'vietbando.com', 'vnexpress.net', 
  'thanhnien.vn', 'tuoitre.vn', 'dantri.com.vn', 'shopee.vn', 'lazada.vn',
  'tiki.vn', 'chotot.com', 'yellowpages.vn', 'trangvangvietnam.com', 'maps.google.com'
];

const SERPER_API_KEY = process.env.SERPER_API_KEY;

async function runQualification() {
  console.log(`[QUALIFICATION AGENT] Bắt đầu quá trình xác thực Leads bằng Serper API...`);
  
  if (!SERPER_API_KEY) {
    console.error("Lỗi: Không tìm thấy SERPER_API_KEY trong file .env");
    return;
  }

  // Fetch leads from Supabase
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('status', 'new')
    .is('website', null);

  if (error) {
    console.error("Lỗi khi tải dữ liệu từ Supabase:", error);
    return;
  }

  if (!leads || leads.length === 0) {
    console.log("Không tìm thấy Lead mới nào cần kiểm chứng trên cơ sở dữ liệu.");
    return;
  }

  console.log(`Tìm thấy ${leads.length} Leads cần xác thực từ Supabase.`);

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const phone = lead.formatted_phone_number || '';
    const name = lead.name || '';
    
    if (!phone) {
      console.log(`[SKIP] Bỏ qua ${name} vì không có SĐT để cross-check.`);
      await supabase.from('leads').update({ status: 'verified' }).eq('id', lead.id);
      continue;
    }

    // Xây dựng cú pháp search thông minh
    const query = `"${phone}" "${name}"`;
    console.log(`\n======================================`);
    console.log(`[SEARCH] Đang kiểm chứng (${i+1}/${leads.length}): ${name}`);
    console.log(`[QUERY] ${query}`);
    
    try {
      const response = await axios.post(
        'https://google.serper.dev/search',
        { q: query, gl: 'vn', hl: 'vi' },
        { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
      );

      const searchResults = response.data.organic || [];
      console.log(`Tìm thấy ${searchResults.length} kết quả tự nhiên.`);
      
      let foundRealWebsite = false;
      let foundUrl = '';

      for (const res of searchResults) {
        try {
          const urlObj = new URL(res.link);
          const hostname = urlObj.hostname.toLowerCase();
          
          // Bỏ qua các domain rác/mxh
          const isIgnored = IGNORED_DOMAINS.some(domain => hostname.includes(domain));
          if (isIgnored) continue;
          
          // SMART MATCHING
          const cleanPhone = phone.replace(/\D/g, '');
          const cleanSnippet = (res.title + ' ' + (res.snippet || '')).replace(/\D/g, '');
          
          const nameMatch = res.title.toLowerCase().includes(name.toLowerCase().split(' ')[0]);
          const phoneMatch = cleanPhone.length > 5 && cleanSnippet.includes(cleanPhone);

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
        await supabase.from('leads').update({ status: 'has_website', website: foundUrl }).eq('id', lead.id);
      } else {
        console.log(`[KẾT LUẬN] => KHÁCH XỊN (VERIFIED): Hoàn toàn không có web!`);
        await supabase.from('leads').update({ status: 'verified' }).eq('id', lead.id);
      }
      
      await delay(1000); // API chạy nhanh, chỉ cần nghỉ 1s

    } catch (e: any) {
      console.error(`[LỖI] Không thể kiểm chứng ${name}`, e.message);
    }
  }

  console.log(`\n[HOÀN TẤT] Quá trình kiểm chứng Qualification đã hoàn thành!`);
}

runQualification();
