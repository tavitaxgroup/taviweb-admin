const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixTemplateKeys() {
  const { data: tenants, error } = await supabase.from('tenants').select('id, name').limit(300);
  if (error) {
    console.error(error);
    return;
  }
  
  let updatedCount = 0;
  for (const t of tenants) {
    let tpl = null;
    if (t.name.toLowerCase().includes('thẩm mỹ viện')) tpl = 'spa';
    else if (t.name.toLowerCase().includes('nha khoa')) tpl = 'dental';
    else if (t.name.toLowerCase().includes('anh ngữ') || t.name.toLowerCase().includes('tiếng anh')) tpl = 'english-center';
    else if (t.name.toLowerCase().includes('phòng khám')) tpl = 'general-clinic';
    
    if (tpl) {
      await supabase.from('tenants').update({ template_key: tpl }).eq('id', t.id);
      updatedCount++;
    }
  }
  
  console.log(`Updated template_key for ${updatedCount} tenants.`);
}

fixTemplateKeys();
