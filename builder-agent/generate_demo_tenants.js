require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đđ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

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
    
    console.log(`Found ${top200.length} leads to generate tenants for.`);

    for (let i = 0; i < top200.length; i++) {
      const lead = top200[i];
      const leadName = (lead.name || '').replace(/\|/g, '-');
      let baseSlug = toSlug(leadName);
      if (!baseSlug) baseSlug = 'demo-site-' + i;
      const slug = `demo-${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      let ind = lead.industry || '';
      if (ind === 'tham_my_vien') ind = 'spa';
      
      let templateKey = '';
      switch(ind) {
        case 'noi_that': templateKey = 'interior-design'; break;
        case 'trung_tam_tieng_anh': templateKey = 'english-center'; break;
        case 'nha_khoa': templateKey = 'dental'; break;
        case 'spa': templateKey = 'spa'; break;
        case 'luat_su': templateKey = 'law-firm'; break;
        default: templateKey = 'business';
      }

      const hasFb = (lead.website || '').toLowerCase().includes('facebook') || lead.facebook_url;
      let fbLink = hasFb ? (lead.website || lead.facebook_url) : '';
      
      const contactInfo = {
        phone: (lead.phone || '').replace('Phone: ', ''),
        facebook: fbLink
      };

      await client.query(`
        INSERT INTO tenants (name, slug, template_key, active_modules, contact_info)
        VALUES ($1, $2, $3, $4, $5)
      `, [leadName, slug, templateKey, JSON.stringify(["crm", "booking"]), contactInfo]);
    }
    
    console.log('Successfully inserted 200 demo tenants.');
  } catch (e) {
    console.error('Error generating tenants:', e);
  } finally {
    await client.end();
  }
}

run();
