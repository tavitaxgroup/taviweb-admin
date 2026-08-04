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
    
    // Condition: does not have a real website (empty or it's a facebook page)
    const validLeads = rows.filter(r => {
      const site = (r.website || '').toLowerCase();
      const hasRealWeb = site && !site.includes('facebook.com') && !site.includes('fb.com') && !site.includes('business.site') && !site.includes('linktr.ee');
      return !hasRealWeb; // Keep those without a real website
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
    
    const top100 = validLeads.slice(0, 100);
    
    // Generate Markdown
    let md = '# 🎯 Top Khách Hàng Tiềm Năng (Chưa có Website)\n\n';
    md += 'Danh sách các doanh nghiệp **chưa có website riêng** (hoặc chỉ dùng Fanpage/Linktree) nhưng có tiềm năng cao (ưu tiên có Số điện thoại hoặc Facebook).\n\n';
    md += '| Tên Doanh Nghiệp | Ngành Nghề | Số Điện Thoại | Kênh Hiện Có | Rating |\n';
    md += '|---|---|---|---|---|\n';

    top100.forEach(lead => {
      const name = (lead.name || '').replace(/\\|/g, '-');
      const industry = (lead.industry || '').replace(/\\|/g, '-');
      const phone = (lead.phone || '').replace('Phone: ', '').replace(/\\|/g, '-');
      
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

    fs.writeFileSync('C:/Users/Admin/.gemini/antigravity/brain/8ebaf72b-459c-42e9-a419-6407bb0b8b0b/leads_no_website.md', md);
    console.log('Generated leads_no_website.md');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
