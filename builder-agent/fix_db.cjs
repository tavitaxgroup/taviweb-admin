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

async function fixDB() {
  console.log('Fetching contacts...');
  const { data: contacts, error: e1 } = await supabase.from('crm_contacts').select('id, name, phone');
  
  if (e1) {
    console.error('Error fetching contacts:', e1);
    return;
  }
  
  let contactUpdates = 0;
  for (const c of contacts) {
    const newName = cleanName(c.name);
    const newPhone = cleanPhone(c.phone);
    if (newName !== c.name || newPhone !== c.phone) {
      await supabase.from('crm_contacts').update({ name: newName, phone: newPhone }).eq('id', c.id);
      contactUpdates++;
    }
  }
  console.log(`Updated ${contactUpdates} contacts.`);

  console.log('Fetching deals...');
  const { data: deals, error: e2 } = await supabase.from('crm_deals').select('id, title');
  
  if (e2) {
    console.error('Error fetching deals:', e2);
    return;
  }

  let dealUpdates = 0;
  for (const d of deals) {
    const newTitle = cleanName(d.title);
    if (newTitle !== d.title) {
      await supabase.from('crm_deals').update({ title: newTitle }).eq('id', d.id);
      dealUpdates++;
    }
  }
  console.log(`Updated ${dealUpdates} deals.`);
  console.log('Done!');
}

fixDB();
