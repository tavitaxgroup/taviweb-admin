const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeadsIndustries() {
  const { data: leads, error } = await supabase.from('leads').select('industry');
  if (error) {
    console.error("Error fetching leads:", error);
    return;
  }
  
  const distribution = {};
  leads.forEach(l => {
    const ind = l.industry || 'Unknown';
    if (!distribution[ind]) distribution[ind] = 0;
    distribution[ind]++;
  });
  
  console.log("Industry distribution in 6001 leads:");
  // Sort by count
  const sorted = Object.entries(distribution).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([ind, count]) => {
    console.log(`- ${ind}: ${count}`);
  });
}

checkLeadsIndustries();
