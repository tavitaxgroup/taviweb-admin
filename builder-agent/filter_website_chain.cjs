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
  'linkedin.com', 'pinterest.com', 'vntrip.vn', 'reviewphongkham.vn', 'top10tphcm.com'
];

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
    console.error("Serper Error for query", query, e.message);
    return null;
  }
}

async function checkWebsiteAndChain() {
  console.log("Fetching the 200 tenants...");
  const { data: tenants, error } = await supabase.from('tenants').select('*').neq('slug', 'tavi');
  if (error) return console.error(error);
  
  console.log(`Checking ${tenants.length} tenants on Google (Serper)...`);
  
  const resultsData = [];
  
  // Batch processing
  const batchSize = 10;
  for (let i = 0; i < tenants.length; i += batchSize) {
    const batch = tenants.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(tenants.length / batchSize)}...`);
    
    const promises = batch.map(async (tenant) => {
      const address = tenant.contact_info?.address || '';
      const phone = tenant.contact_info?.phone || '';
      // Better query: Name + address/phone to narrow down
      const query = `"${tenant.name}" ${address} ${phone}`.trim();
      
      const searchData = await searchSerper(query);
      let hasWebsite = false;
      let websiteUrl = '';
      let isChain = false;
      let chainEvidence = '';
      
      if (searchData && searchData.organic) {
        // Check for official website
        for (const res of searchData.organic) {
          const domain = extractDomain(res.link);
          if (domain && !IGNORE_DOMAINS.some(d => domain.includes(d))) {
            hasWebsite = true;
            websiteUrl = res.link;
            break; // found one!
          }
        }
        
        // Check for chain evidence in snippets and titles
        const textToAnalyze = searchData.organic.map(o => (o.title + " " + o.snippet).toLowerCase()).join(" ");
        const chainKeywords = ['hệ thống', 'chuỗi', 'chi nhánh', 'trụ sở chính', 'hàng chục chi nhánh', 'nhiều chi nhánh', 'hệ thống nha khoa', 'hệ thống thẩm mỹ viện', 'chuỗi phòng khám'];
        
        for (const kw of chainKeywords) {
          if (textToAnalyze.includes(kw)) {
            isChain = true;
            chainEvidence = kw;
            break;
          }
        }
      }
      
      return {
        tenant,
        hasWebsite,
        websiteUrl,
        isChain,
        chainEvidence
      };
    });
    
    const batchResults = await Promise.all(promises);
    resultsData.push(...batchResults);
    
    // Slight delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Export results
  const formattedData = resultsData.map((res, index) => {
    let indDisplay = res.tenant.template_key;
    if (indDisplay === 'spa' || indDisplay === 'tham_my_vien') indDisplay = 'Spa / Thẩm mỹ viện';
    else if (indDisplay === 'nha_khoa') indDisplay = 'Nha khoa';
    else if (indDisplay === 'noi_that') indDisplay = 'Nội thất';
    else if (indDisplay === 'luat_su') indDisplay = 'Luật sư';
    
    return {
      'STT': index + 1,
      'Tên Doanh Nghiệp': res.tenant.name,
      'Ngành Nghề': indDisplay,
      'Số Điện Thoại': res.tenant.contact_info?.phone || '',
      'Đã Có Website?': res.hasWebsite ? 'CÓ' : 'CHƯA',
      'Website URL (Nếu có)': res.websiteUrl,
      'Là Hệ Thống/Chuỗi?': res.isChain ? 'CÓ' : 'KHÔNG RÕ',
      'Dấu hiệu nhận biết': res.chainEvidence,
      'Link Demo Của Mình': `https://taviweb.vercel.app/${res.tenant.slug}`
    };
  });
  
  const worksheet = xlsx.utils.json_to_sheet(formattedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Check_Website_Chuoi");
  
  const excelPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Check_Web_Chuoi.xlsx';
  xlsx.writeFile(workbook, excelPath);
  
  // Also create a Markdown summary
  const hasWebCount = resultsData.filter(r => r.hasWebsite).length;
  const isChainCount = resultsData.filter(r => r.isChain).length;
  
  let mdContent = `# Kết Quả Khảo Sát 200 Khách Hàng\n\n`;
  mdContent += `- **Số khách hàng đã có Website riêng:** ${hasWebCount} / 200\n`;
  mdContent += `- **Số khách hàng là Chuỗi/Hệ thống lớn:** ${isChainCount} / 200\n\n`;
  mdContent += `> Những khách hàng *CHƯA CÓ WEBSITE* và *KHÔNG PHẢI CHUỖI* là nhóm đối tượng vô cùng lý tưởng để chốt Sale Website Demo này.\n\n`;
  
  const idealClients = formattedData.filter(d => d['Đã Có Website?'] === 'CHƯA' && d['Là Hệ Thống/Chuỗi?'] !== 'CÓ');
  mdContent += `## 🔹 Danh sách Khách Lý Tưởng (${idealClients.length} khách)\n\n`;
  mdContent += `| STT | Tên Doanh Nghiệp | Ngành Nghề | Số Điện Thoại | Link Demo |\n`;
  mdContent += `|:---:|:---|:---|:---|:---|\n`;
  
  idealClients.forEach((c, index) => {
    mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Ngành Nghề']} | ${c['Số Điện Thoại']} | [Xem Demo](${c['Link Demo']}) |\n`;
  });
  
  const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_Check_Web_Chuoi.md';
  fs.writeFileSync(mdPath, mdContent);
  
  console.log("Check complete! Exported to Excel and Markdown.");
}

checkWebsiteAndChain();
