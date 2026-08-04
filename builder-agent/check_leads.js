require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT name, industry, formatted_phone_number as phone, website, rating, user_ratings_total as reviews
      FROM leads
    `);
    
    const validLeads = rows.filter(r => (r.phone && r.phone.trim() !== '') || (r.website && r.website.trim() !== ''));
    
    validLeads.sort((a, b) => {
      // Calculate score
      let scoreA = (a.phone ? 1 : 0) + (a.website ? 1 : 0) + (a.rating ? 1 : 0);
      let scoreB = (b.phone ? 1 : 0) + (b.website ? 1 : 0) + (b.rating ? 1 : 0);
      
      if (scoreA !== scoreB) return scoreB - scoreA;
      
      let ratingA = parseFloat(a.rating) || 0;
      let ratingB = parseFloat(b.rating) || 0;
      if (ratingA !== ratingB) return ratingB - ratingA;
      
      let reviewsA = parseInt(a.reviews) || 0;
      let reviewsB = parseInt(b.reviews) || 0;
      return reviewsB - reviewsA;
    });
    
    const top100 = validLeads.slice(0, 100);
    
    fs.writeFileSync('top_100_leads.json', JSON.stringify(top100, null, 2));
    console.log(`Saved ${top100.length} leads to top_100_leads.json`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
