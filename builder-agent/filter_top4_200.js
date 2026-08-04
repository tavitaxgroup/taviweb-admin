require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT name, industry, formatted_phone_number as phone, website, facebook_url, rating, user_ratings_total as reviews
      FROM leads
    `);
    
    const validTags = ['noi_that', 'trung_tam_tieng_anh', 'nha_khoa', 'spa', 'tham_my_vien', 'luat_su'];

    // Condition: does not have a real website (empty or it's a facebook page)
    const validLeads = rows.filter(r => {
      const site = (r.website || '').toLowerCase();
      const hasRealWeb = site && !site.includes('facebook.com') && !site.includes('fb.com') && !site.includes('business.site') && !site.includes('linktr.ee');
      
      let ind = r.industry || '';
      if (ind === 'tham_my_vien') ind = 'spa'; // group them

      return !hasRealWeb && validTags.includes(ind);
    });
    
    validLeads.sort((a, b) => {
      const siteA = (a.website || '').toLowerCase();
      const siteB = (b.website || '').toLowerCase();
      
      const hasFbA = siteA.includes('facebook') || siteA.includes('fb.com') || a.facebook_url;
      const hasFbB = siteB.includes('facebook') || siteB.includes('fb.com') || b.facebook_url;
      const hasPhoneA = (a.phone && a.phone.trim() !== '');
      const hasPhoneB = (b.phone && b.phone.trim() !== '');
      
      // Calculate score based on priorities
      let scoreA = (hasPhoneA ? 2 : 0) + (hasFbA ? 1 : 0);
      let scoreB = (hasPhoneB ? 2 : 0) + (hasFbB ? 1 : 0);
      
      if (scoreA !== scoreB) return scoreB - scoreA;
      
      // Tie breaker: ratings
      let ratingA = parseFloat(a.rating) || 0;
      let ratingB = parseFloat(b.rating) || 0;
      if (ratingA !== ratingB) return ratingB - ratingA;
      
      let reviewsA = parseInt(a.reviews) || 0;
      let reviewsB = parseInt(b.reviews) || 0;
      return reviewsB - reviewsA;
    });
    
    const top200 = validLeads.slice(0, 200);
    
    // Generate Markdown
    let md = '# 🎯 Top 200 Khách Hàng Tiềm Năng (4 Ngành Trọng Điểm)\n\n';
    md += 'Danh sách 200 doanh nghiệp THẬT từ Database thuộc 4 ngành: Nội thất, Ngoại ngữ, Thẩm mỹ/Nha khoa, Luật sư.\n\n';
    md += '| Tên Doanh Nghiệp | Ngành Nghề | Số Điện Thoại | Kênh Hiện Có | Rating |\n';
    md += '|---|---|---|---|---|\n';

    top200.forEach(lead => {
      let name = (lead.name || '').replace(/\|/g, '-');
      let industry = (lead.industry || '').replace(/\|/g, '-');
      if (industry === 'tham_my_vien') industry = 'spa';
      let phone = (lead.phone || '').replace('Phone: ', '').replace(/\|/g, '-');
      
      const site = (lead.website || '').toLowerCase();
      const hasFb = site.includes('facebook') || site.includes('fb.com') || lead.facebook_url;
      
      let channel = '';
      if (hasFb) {
         channel = `[Fanpage](${lead.website || lead.facebook_url})`;
      } else if (lead.website) {
         channel = `[Link](${lead.website})`;
      } else {
         channel = 'Chưa có';
      }
      
      const rating = lead.rating || '-';
      
      md += `| ${name} | ${industry} | ${phone} | ${channel} | ${rating} ⭐ |\n`;
    });

    fs.writeFileSync('C:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/top_4_industries_leads.md', md);
    console.log('Generated top_4_industries_leads.md with real DB leads');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
