const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixKeys() {
  const { data: tenants, error } = await supabase.from('tenants').select('id, template_key');
  if (error) {
    console.error(error);
    return;
  }
  
  let updatedCount = 0;
  for (const t of tenants) {
    let newKey = null;
    if (t.template_key === 'dental') newKey = 'nha_khoa';
    else if (t.template_key === 'english-center') newKey = 'trung_tam_tieng_anh';
    else if (t.template_key === 'general-clinic') newKey = 'phong_kham';
    
    if (newKey) {
      await supabase.from('tenants').update({ template_key: newKey }).eq('id', t.id);
      updatedCount++;
    }
  }
  console.log(`Fixed template keys for ${updatedCount} tenants.`);
}

fixKeys();
