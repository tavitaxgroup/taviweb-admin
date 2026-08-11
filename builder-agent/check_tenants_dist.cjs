const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTenants() {
  const { data: tenants, error } = await supabase.from('tenants').select('id, name');
  
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(`Found ${tenants.length} tenants in 'tenants' table.`);
  
  let luatsuCount = 0;
  for (const tenant of tenants) {
    if (tenant.name.toLowerCase().includes('luật sư') || tenant.name.toLowerCase().includes('law')) {
      luatsuCount++;
    }
  }
  
  console.log(`Lawyers count: ${luatsuCount} / ${tenants.length}`);
  
  // print a few non-lawyers if any
  const others = tenants.filter(t => !t.name.toLowerCase().includes('luật sư') && !t.name.toLowerCase().includes('law'));
  console.log('Some non-lawyers:');
  console.log(others.slice(0, 10).map(t => t.name));
}

checkTenants();
