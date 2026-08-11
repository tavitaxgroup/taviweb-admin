const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function findIndustryWithMostPhones() {
  console.log("Fetching leads with phone numbers...");
  const { data: leads, error } = await supabase.from('leads').select('industry, phone');
  
  if (error) {
    console.error(error);
    return;
  }
  
  const distribution = {};
  
  leads.forEach(l => {
    // Check if phone exists and is reasonably valid (e.g. at least 5 chars)
    if (l.phone && l.phone.trim().length >= 5) {
      let ind = l.industry || 'Unknown';
      if (ind === 'tham_my_vien') ind = 'spa'; // merge
      
      if (!distribution[ind]) distribution[ind] = 0;
      distribution[ind]++;
    }
  });
  
  const sortedIndustries = Object.entries(distribution)
    .filter(([ind]) => ind !== 'Unknown' && ind !== 'khac')
    .sort((a, b) => b[1] - a[1]);
    
  console.log("\nNgành có nhiều số điện thoại nhất:");
  sortedIndustries.forEach(([ind, count]) => {
    console.log(`- ${ind}: ${count} khách hàng có SĐT`);
  });
}

findIndustryWithMostPhones();
