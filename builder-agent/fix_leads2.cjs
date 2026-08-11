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

function cleanPhone(phone) {
  if (!phone || typeof phone !== 'string') return phone;
  let cleaned = phone.replace(/-/g, '');
  cleaned = cleaned.replace(/\s+/g, '').trim();
  return cleaned;
}

async function fixLeads() {
  const { data: leads, error } = await supabase.from('leads').select('id, name, formatted_phone_number');
  
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(`Found ${leads.length} leads in 'leads' table.`);
  
  let count = 0;
  for (const lead of leads) {
    const newName = cleanName(lead.name);
    const newPhone = cleanPhone(lead.formatted_phone_number);
    
    let updateData = {};
    if (newName !== lead.name) updateData.name = newName;
    if (newPhone !== lead.formatted_phone_number) updateData.formatted_phone_number = newPhone;
    
    if (Object.keys(updateData).length > 0) {
      const { error: updErr } = await supabase.from('leads').update(updateData).eq('id', lead.id);
      if (updErr) console.error(updErr);
      else count++;
    }
  }
  
  console.log(`Updated ${count} leads in 'leads' table.`);
}
fixLeads();
