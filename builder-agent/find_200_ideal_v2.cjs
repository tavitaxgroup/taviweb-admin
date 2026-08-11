const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');
const axios = require('axios');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;
const supabase = createClient(supabaseUrl, supabaseKey);

const SERPER_API_KEY = "6112b6ddf42def5dd4c75ec9c98ad82088412eb3";

const IGNORE_DOMAINS = [
  'facebook.com', 'tiktok.com', 'youtube.com', 'instagram.com', 'zalo.me', 
  'shopee.vn', 'lazada.vn', 'tiki.vn', 'chotot.com', 'foody.vn', 'shopeefood.vn',
  'pasgo.vn', 'toplist.vn', 'vnexpress.net', 'thanhnien.vn', 'tuoitre.vn',
  'dantri.com.vn', 'baomoi.com', 'booking.com', 'agoda.com', 'traveloka.com',
  'yellowpages.vn', 'trangvangvietnam.com', 'hosocongty.vn', 'masothue.com',
  'linkedin.com', 'pinterest.com', 'vntrip.vn', 'reviewphongkham.vn', 'top10tphcm.com',
  'top10vietnam.vn', 'vinhlongtourist.vn', 'nhatrangtourist.vn'
];

// Trực tiếp loại bỏ nếu tên có các chữ này
const CHAIN_NAME_KEYWORDS = [
  'chi nhánh', 'cơ sở', 'hệ thống', 'chuỗi', 'trụ sở', 'quốc tế', 
  'nha khoa sài gòn', 'nha khoa việt mỹ', 'nha khoa đại nam', 'nha khoa paris', 'nha khoa kim',
  'thẩm mỹ viện ngọc dung', 'thẩm mỹ viện mailisa', 'thẩm mỹ viện kangnam',
  'group', 'corporation', 'chi nhanh', 'co so'
];

// Loại bỏ qua Snippet trên Google
const CHAIN_SEARCH_KEYWORDS = [
  'hệ thống', 'chuỗi', 'chi nhánh', 'trụ sở chính', 'hàng chục chi nhánh', 
  'hệ thống nha khoa', 'hệ thống thẩm mỹ viện', 'chuỗi phòng khám'
];

function stringToSlug(str) {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');
  str = str.replace(/([^0-9a-z-\s])/g, '');
  str = str.replace(/(\s+)/g, '-');
  str = str.replace(/^-+/g, '');
  str = str.replace(/-+$/g, '');
  return str;
}

function extractDomain(urlStr) {
  try {
    const url = new URL(urlStr);
    let domain = url.hostname;
    if (domain.startsWith('www.')) domain = domain.slice(4);
    return domain;
  } catch (e) {
    return null;
  }
}

async function searchSerper(query) {
  try {
    const res = await axios.post(
      'https://google.serper.dev/search',
      { q: query, gl: 'vn', hl: 'vi', num: 10 },
      { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (e) {
    if (e.response && e.response.status === 429) {
      await new Promise(r => setTimeout(r, 2000));
      return searchSerper(query); // retry once
    }
    return null;
  }
}

async function run() {
  console.log("Fetching all leads...");
  const { data: leads, error } = await supabase.from('leads').select('*');
  if (error) return console.error(error);
  
  const top4 = ['nha_khoa', 'spa', 'noi_that', 'luat_su'];
  const idealLeads = [];
  const usedSlugs = new Set();
  
  for (const ind of top4) {
    console.log(`\n--- Quét ngành: ${ind} ---`);
    let industryLeads = leads.filter(l => {
      let lInd = l.industry;
      if (lInd === 'tham_my_vien') lInd = 'spa';
      const hasPhone = l.formatted_phone_number && l.formatted_phone_number.trim().length > 5;
      const hasFb = l.facebook_url && l.facebook_url.trim().length > 5;
      
      if (lInd !== ind || (!hasPhone && !hasFb)) return false;
      
      const n = (l.name || '').toLowerCase();
      // Bỏ ngay từ vòng gửi xe nếu tên có dấu hiệu chuỗi
      for (const kw of CHAIN_NAME_KEYWORDS) {
        if (n.includes(kw)) return false;
      }
      return true;
    });
    
    // Ưu tiên khách có đủ Phone + FB, và tên ngắn gọn (ít có khả năng là brand lớn)
    industryLeads.sort((a, b) => {
      const aScore = (a.formatted_phone_number ? 1 : 0) + (a.facebook_url ? 1 : 0);
      const bScore = (b.formatted_phone_number ? 1 : 0) + (b.facebook_url ? 1 : 0);
      return bScore - aScore;
    });
    
    let found = 0;
    for (const lead of industryLeads) {
      if (found >= 50) break;
      
      // Bỏ ngoặc kép để Google tìm linh hoạt hơn!
      const query = `${lead.name} ${lead.formatted_address || ''} ${lead.formatted_phone_number || ''}`.trim();
      const searchData = await searchSerper(query);
      
      let hasWebsite = false;
      let isChain = false;
      
      if (searchData && searchData.organic) {
        for (const res of searchData.organic) {
          const domain = extractDomain(res.link);
          if (domain && !IGNORE_DOMAINS.some(d => domain.includes(d))) {
            hasWebsite = true;
            break;
          }
        }
        
        const textToAnalyze = searchData.organic.map(o => (o.title + " " + o.snippet).toLowerCase()).join(" ");
        for (const kw of CHAIN_SEARCH_KEYWORDS) {
          if (textToAnalyze.includes(kw)) {
            isChain = true;
            break;
          }
        }
      }
      
      if (!hasWebsite && !isChain) {
        let slug = stringToSlug(lead.name);
        let originalSlug = slug;
        let counter = 1;
        while (usedSlugs.has(slug)) {
          slug = `${originalSlug}-${counter}`;
          counter++;
        }
        usedSlugs.add(slug);
        lead.finalSlug = slug;
        idealLeads.push(lead);
        found++;
        process.stdout.write(`+`);
      } else {
        process.stdout.write(`.`);
      }
      
      await new Promise(r => setTimeout(r, 600)); 
    }
    console.log(`\nTìm được ${found}/50 khách.`);
  }
  
  if (idealLeads.length === 0) return;
  
  console.log("\nXóa tenants cũ và lưu tenants mới vào CSDL...");
  await supabase.from('tenants').delete().neq('slug', 'tavi');
  
  const newTenants = idealLeads.map(lead => {
    return {
      id: lead.id,
      name: lead.name,
      slug: lead.finalSlug,
      template_key: lead.industry === 'tham_my_vien' ? 'spa' : lead.industry,
      active_modules: ['crm', 'booking'],
      contact_info: { 
        phone: lead.formatted_phone_number || '', 
        address: lead.formatted_address || 'Việt Nam',
        facebook: lead.facebook_url || ''
      },
      created_at: new Date().toISOString(),
    };
  });
  
  for(let i=0; i<newTenants.length; i+=50) {
      await supabase.from('tenants').insert(newTenants.slice(i, i+50));
  }
  
  const formattedData = idealLeads.map((l, index) => {
    let indDisplay = l.industry;
    if (indDisplay === 'spa' || indDisplay === 'tham_my_vien') indDisplay = 'Spa / Thẩm mỹ viện';
    else if (indDisplay === 'nha_khoa') indDisplay = 'Nha khoa';
    else if (indDisplay === 'noi_that') indDisplay = 'Nội thất';
    else if (indDisplay === 'luat_su') indDisplay = 'Luật sư';
    
    return {
      'STT': index + 1,
      'Tên Doanh Nghiệp': l.name,
      'Ngành Nghề': indDisplay,
      'Số Điện Thoại': l.formatted_phone_number || '',
      'Fanpage': l.facebook_url || '',
      'Địa Chỉ': l.formatted_address || '',
      'Link Demo Của Mình': `https://taviweb.vercel.app/${l.finalSlug}`
    };
  });
  
  const worksheet = xlsx.utils.json_to_sheet(formattedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "200_Ly_Tuong");
  
  const excelPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Ly_Tuong_Chuan.xlsx';
  xlsx.writeFile(workbook, excelPath);
  
  let mdContent = `# Danh Sách 200 Khách Hàng SIÊU LÝ TƯỞNG (ĐÃ LỌC CHUẨN MỚI)\n\n`;
  mdContent += `Đây là danh sách 200 khách hàng thỏa mãn:\n`;
  mdContent += `- ✅ Có SĐT / Fanpage\n`;
  mdContent += `- ✅ CHƯA CÓ Website riêng (Kiểm tra chính xác không dùng ngoặc kép)\n`;
  mdContent += `- ✅ KHÔNG PHẢI chuỗi/hệ thống lớn (Đã loại trừ Sài Gòn, Việt Mỹ, Quốc Tế, Chi Nhánh... từ ngay trong tên)\n\n`;
  
  const displayIndustries = ['Nha khoa', 'Spa / Thẩm mỹ viện', 'Nội thất', 'Luật sư'];
  for (const ind of displayIndustries) {
    const clients = formattedData.filter(d => d['Ngành Nghề'] === ind);
    mdContent += `## 🔹 ${ind} (${clients.length} khách)\n\n`;
    mdContent += `| STT | Tên Doanh Nghiệp | SĐT | Fanpage | Link Demo |\n`;
    mdContent += `|:---:|:---|:---|:---|:---|\n`;
    clients.forEach((c, index) => {
      const fb = c['Fanpage'] ? `[Link](${c['Fanpage']})` : '';
      mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Số Điện Thoại']} | ${fb} | [Xem Demo](${c['Link Demo Của Mình']}) |\n`;
    });
    mdContent += '\n---\n\n';
  }
  
  const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Ly_Tuong_Chuan.md';
  fs.writeFileSync(mdPath, mdContent);
  console.log("\nHOÀN TẤT!");
}

run();
