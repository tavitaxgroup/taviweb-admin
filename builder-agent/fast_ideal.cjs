const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const CHAIN_NAME_KEYWORDS = [
  'chi nhánh', 'cơ sở', 'hệ thống', 'chuỗi', 'trụ sở', 'quốc tế', 
  'sài gòn', 'việt mỹ', 'đại nam', 'paris', 'kim', 'ngọc dung', 'mailisa', 'kangnam',
  'group', 'corporation', 'chi nhanh', 'co so', 'company', 'công ty'
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

async function run() {
  const { data: leads, error } = await supabase.from('leads').select('*');
  
  const top4 = ['nha_khoa', 'spa', 'noi_that', 'luat_su'];
  const idealLeads = [];
  const usedSlugs = new Set(['tavi']);
  
  for (const ind of top4) {
    let industryLeads = leads.filter(l => {
      let lInd = l.industry;
      if (lInd === 'tham_my_vien') lInd = 'spa';
      if (lInd !== ind) return false;
      
      const hasPhone = l.formatted_phone_number && l.formatted_phone_number.trim().length > 5;
      const hasFb = l.facebook_url && l.facebook_url.trim().length > 5;
      if (!hasPhone && !hasFb) return false;
      
      const n = (l.name || '').toLowerCase();
      // Lọc siêu gắt các từ khóa chuỗi/công ty lớn
      for (const kw of CHAIN_NAME_KEYWORDS) {
        if (n.includes(kw)) return false;
      }
      
      // Lọc nếu website không phải facebook/zalo/tiktok (nghĩa là có website thật)
      if (l.website && l.website.trim().length > 5) {
         const web = l.website.toLowerCase();
         if (!web.includes('facebook.com') && !web.includes('zalo.me') && !web.includes('tiktok.com') && !web.includes('business.site')) {
             return false;
         }
      }
      
      return true;
    });
    
    // Sort so those with BOTH are tested first, and shorter names preferred (less likely to be a complex company name)
    industryLeads.sort((a, b) => {
      const aScore = (a.formatted_phone_number ? 1 : 0) + (a.facebook_url ? 1 : 0);
      const bScore = (b.formatted_phone_number ? 1 : 0) + (b.facebook_url ? 1 : 0);
      if (bScore !== aScore) return bScore - aScore;
      return (a.name || '').length - (b.name || '').length;
    });
    
    let found = 0;
    for (const lead of industryLeads) {
      if (found >= 50) break;
      
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
    }
  }
  
  // Xóa tenants cũ (trừ tavi admin mình vừa tạo)
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
  
  let mdContent = `# Danh Sách 200 Khách Hàng SIÊU LÝ TƯỞNG (ĐÃ LỌC CHUẨN)\n\n`;
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
  console.log("HOÀN TẤT!");
}

run();
