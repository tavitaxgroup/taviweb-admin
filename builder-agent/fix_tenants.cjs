const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

function cleanName(name) {
  if (!name || typeof name !== 'string') return name;
  let cleaned = name.replace(/-/g, '');
  cleaned = cleaned.replace(/\(@[^)]+\)/g, ' ');
  cleaned = cleaned.replace(/•/g, ' ');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

async function fixTenants() {
  const { data: tenants, error } = await supabase.from('tenants').select('id, name');
  
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(`Found ${tenants.length} tenants in 'tenants' table.`);
  
  let count = 0;
  for (const tenant of tenants) {
    const newName = cleanName(tenant.name);
    
    if (newName !== tenant.name) {
      console.log(`Updating ${tenant.name} -> ${newName}`);
      const { error: updErr } = await supabase.from('tenants').update({ name: newName }).eq('id', tenant.id);
      if (updErr) console.error(updErr);
      else count++;
    }
  }
  
  console.log(`Updated ${count} tenants in 'tenants' table.`);
}
fixTenants();
