require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const xlsx = require('xlsx');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT name, industry, formatted_phone_number as phone, website, facebook_url, rating, user_ratings_total as reviews
      FROM leads
    `);
    
    const validTags = ['noi_that', 'trung_tam_tieng_anh', 'nha_khoa', 'spa', 'tham_my_vien', 'luat_su'];

    const validLeads = rows.filter(r => {
      const site = (r.website || '').toLowerCase();
      const hasRealWeb = site && !site.includes('facebook.com') && !site.includes('fb.com') && !site.includes('business.site') && !site.includes('linktr.ee');
      
      let ind = r.industry || '';
      if (ind === 'tham_my_vien') ind = 'spa';

      return !hasRealWeb && validTags.includes(ind);
    });
    
    // Sort logic: First by Industry, then by Rating, then by Reviews
    validLeads.sort((a, b) => {
      let indA = a.industry || '';
      if (indA === 'tham_my_vien') indA = 'spa';
      let indB = b.industry || '';
      if (indB === 'tham_my_vien') indB = 'spa';
      
      if (indA !== indB) return indA.localeCompare(indB);
      
      let ratingA = parseFloat(a.rating) || 0;
      let ratingB = parseFloat(b.rating) || 0;
      if (ratingA !== ratingB) return ratingB - ratingA;
      
      let reviewsA = parseInt(a.reviews) || 0;
      let reviewsB = parseInt(b.reviews) || 0;
      return reviewsB - reviewsA;
    });
    
    const top200 = validLeads.slice(0, 200);
    
    // Map data for excel
    const excelData = top200.map(lead => {
      let industryName = '';
      let ind = lead.industry || '';
      if (ind === 'tham_my_vien') ind = 'spa';
      
      switch(ind) {
        case 'noi_that': industryName = 'Nội thất & Kiến trúc'; break;
        case 'trung_tam_tieng_anh': industryName = 'Trung tâm Tiếng Anh'; break;
        case 'nha_khoa': industryName = 'Nha khoa'; break;
        case 'spa': industryName = 'Spa / Thẩm mỹ viện'; break;
        case 'luat_su': industryName = 'Văn phòng Luật sư'; break;
        default: industryName = ind;
      }

      const site = (lead.website || '').toLowerCase();
      const hasFb = site.includes('facebook') || site.includes('fb.com') || lead.facebook_url;
      
      let channel = 'Chưa có';
      let link = '';
      if (hasFb) {
         channel = 'Fanpage';
         link = lead.website || lead.facebook_url;
      } else if (lead.website) {
         channel = 'Linktree/Business.site';
         link = lead.website;
      }

      return {
        'Tên Doanh Nghiệp': (lead.name || '').replace(/\\|/g, '-'),
        'Ngành Nghề': industryName,
        'Số Điện Thoại': (lead.phone || '').replace('Phone: ', '').replace(/\\|/g, '-'),
        'Kênh Hiện Có': channel,
        'Link': link,
        'Rating': lead.rating || '-',
        'Số Đánh Giá': lead.reviews || 0
      };
    });

    const worksheet = xlsx.utils.json_to_sheet(excelData);
    
    // Auto-size columns
    const colWidths = [
      { wch: 40 }, // Tên Doanh Nghiệp
      { wch: 25 }, // Ngành Nghề
      { wch: 20 }, // Số Điện Thoại
      { wch: 15 }, // Kênh Hiện Có
      { wch: 50 }, // Link
      { wch: 10 }, // Rating
      { wch: 15 }, // Số Đánh Giá
    ];
    worksheet['!cols'] = colWidths;

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Top 200 Leads VIP');
    
    const outputPath = 'C:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/Danh_Sach_Top_200_Leads_VIP.xlsx';
    xlsx.writeFile(workbook, outputPath);
    
    console.log('Successfully exported to Excel.');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
