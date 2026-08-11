const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

const industries = [
  { prefix: 'Nội thất', tag: 'noi_that' },
  { prefix: 'Trung tâm Anh ngữ', tag: 'trung_tam_tieng_anh' },
  { prefix: 'Nha khoa', tag: 'nha_khoa' },
  { prefix: 'Thẩm mỹ viện', tag: 'spa' }
];

const firstNames = ['Hoàng', 'Minh', 'Gia', 'Bảo', 'Tâm', 'Thành', 'Hưng', 'Phát', 'Việt', 'An', 'Trí', 'Đức', 'Phương', 'Lan', 'Ngọc'];
const lastNames = ['Phát', 'Đạt', 'Group', 'Global', 'Vina', 'Plus', 'Pro', 'Khánh', 'Khang', 'Long', 'Thịnh', 'Vượng', 'Luxury', 'Beauty', 'Care'];

function generateRandomName(industryPrefix) {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${industryPrefix} ${name}`;
}

async function fixDistribution() {
  console.log('Fixing tenants...');
  const { data: tenants, error: err1 } = await supabase.from('tenants').select('id, name');
  if (err1) {
    console.error(err1);
    return;
  }
  
  let tCount = 0;
  for (const tenant of tenants) {
    // If it's a lawyer or randomly assigned to redistribute
    if (tenant.name.toLowerCase().includes('luật') || tenant.name.toLowerCase().includes('law')) {
      const ind = industries[Math.floor(Math.random() * industries.length)];
      const newName = generateRandomName(ind.prefix);
      
      const { error } = await supabase.from('tenants').update({ name: newName }).eq('id', tenant.id);
      if (!error) tCount++;
    }
  }
  console.log(`Updated ${tCount} tenants to 4 industries.`);

  console.log('Fixing leads (limiting to 200 to match the file)...');
  // Only get the lawyers in the leads table
  const { data: leads, error: err2 } = await supabase.from('leads').select('id, name').limit(300);
  if (err2) {
    console.error(err2);
    return;
  }
  
  let lCount = 0;
  for (const lead of leads) {
    if (lead.name.toLowerCase().includes('luật') || lead.name.toLowerCase().includes('law')) {
      const ind = industries[Math.floor(Math.random() * industries.length)];
      const newName = generateRandomName(ind.prefix);
      
      const { error } = await supabase.from('leads').update({ 
        name: newName,
        industry: ind.tag 
      }).eq('id', lead.id);
      if (!error) lCount++;
    }
  }
  console.log(`Updated ${lCount} leads to 4 industries.`);
}

fixDistribution();
