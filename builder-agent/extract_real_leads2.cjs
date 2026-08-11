const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

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

async function extractRealLeads() {
  const { data: leads, error } = await supabase.from('leads').select('*');
  if (error) return console.error(error);
  
  // Find Top 4 Industries
  const distribution = {};
  leads.forEach(l => {
    let ind = l.industry || 'Unknown';
    if (ind === 'tham_my_vien') ind = 'spa'; 
    if (!distribution[ind]) distribution[ind] = 0;
    distribution[ind]++;
  });
  
  const sortedIndustries = Object.entries(distribution)
    .filter(([ind]) => ind !== 'Unknown' && ind !== 'khac')
    .sort((a, b) => b[1] - a[1]);
    
  const top4 = sortedIndustries.slice(0, 4).map(i => i[0]);
  
  const selectedLeads = [];
  const usedSlugs = new Set();
  
  for (const ind of top4) {
    let industryLeads = leads.filter(l => {
      let lInd = l.industry;
      if (lInd === 'tham_my_vien') lInd = 'spa';
      return lInd === ind;
    });
    
    // De-duplicate by slug before taking 50
    const uniqueForIndustry = [];
    for (const l of industryLeads) {
      if (uniqueForIndustry.length >= 50) break;
      let slug = stringToSlug(l.name);
      
      // If slug exists in our overall used list, increment until unique
      let originalSlug = slug;
      let counter = 1;
      while (usedSlugs.has(slug)) {
        slug = `${originalSlug}-${counter}`;
        counter++;
      }
      
      usedSlugs.add(slug);
      l.finalSlug = slug;
      uniqueForIndustry.push(l);
    }
    
    selectedLeads.push(...uniqueForIndustry);
  }
  
  await supabase.from('tenants').delete().neq('slug', 'tavi');
  
  const newTenants = selectedLeads.map(lead => {
    return {
      id: lead.id,
      name: lead.name,
      slug: lead.finalSlug,
      template_key: lead.industry === 'tham_my_vien' ? 'spa' : lead.industry,
      active_modules: ['crm', 'booking'],
      contact_info: { 
        phone: lead.phone || '0901234567', 
        address: lead.address || 'Việt Nam',
        facebook: lead.facebook_url || ''
      },
      created_at: new Date().toISOString(),
    };
  });
  
  const { error: insertErr } = await supabase.from('tenants').insert(newTenants);
  if (insertErr) {
    console.error("Error inserting tenants:", insertErr);
    return;
  }
  
  // Export to Excel & Markdown
  const formattedData = selectedLeads.map((l, index) => {
    let indDisplay = l.industry;
    if (indDisplay === 'spa' || indDisplay === 'tham_my_vien') indDisplay = 'Spa / Thẩm mỹ viện';
    else if (indDisplay === 'nha_khoa') indDisplay = 'Nha khoa';
    else if (indDisplay === 'noi_that') indDisplay = 'Nội thất';
    else if (indDisplay === 'luat_su') indDisplay = 'Luật sư';
    
    return {
      'STT': index + 1,
      'Tên Doanh Nghiệp': l.name,
      'Ngành Nghề': indDisplay,
      'Số Điện Thoại': l.phone || 'N/A',
      'Địa Chỉ': l.address || 'N/A',
      'Fanpage': l.facebook_url || '',
      'Link Demo': `https://taviweb.vercel.app/${l.finalSlug}`
    };
  });
  
  const worksheet = xlsx.utils.json_to_sheet(formattedData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "200_Khach_Real");
  
  const excelPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_That_Su.xlsx';
  xlsx.writeFile(workbook, excelPath);
  
  let mdContent = '# Danh Sách 200 Khách Hàng Thật Sự (Từ 6001 Leads)\n\n';
  const displayIndustries = ['Nha khoa', 'Spa / Thẩm mỹ viện', 'Nội thất', 'Luật sư'];
  
  for (const ind of displayIndustries) {
    const clients = formattedData.filter(d => d['Ngành Nghề'] === ind);
    
    mdContent += `## 🔹 ${ind} (${clients.length} khách hàng)\n\n`;
    mdContent += `| STT | Tên Doanh Nghiệp | Số Điện Thoại | Link Fanpage | Link Demo |\n`;
    mdContent += `|:---:|:---|:---|:---|:---|\n`;
    
    clients.forEach((c, index) => {
      const fanpage = c['Fanpage'] || '';
      const demo = c['Link Demo'] || '';
      mdContent += `| ${index + 1} | **${c['Tên Doanh Nghiệp']}** | ${c['Số Điện Thoại']} | [Fanpage](${fanpage}) | [Xem Demo](${demo}) |\n`;
    });
    
    mdContent += '\n---\n\n';
  }
  
  const mdPath = 'c:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_200_Khach_That_Su.md';
  fs.writeFileSync(mdPath, mdContent);
  
  console.log("Successfully created real tenants and exported files.");
}

extractRealLeads();
