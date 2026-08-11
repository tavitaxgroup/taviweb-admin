const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixNames() {
  const { data, error } = await supabase
    .from('crm_contacts')
    .select('id, name')
    .like('name', '%(@%');

  if (error) {
    console.error('Error fetching contacts:', error);
    return;
  }

  console.log(`Found ${data.length} contacts with (@...) in name.`);
  
  for (const contact of data) {
    const newName = contact.name.replace(/\s*\(@[^)]+\)\s*/g, ' ').trim();
    console.log(`Updating: "${contact.name}" -> "${newName}"`);
    const { error: updateError } = await supabase
      .from('crm_contacts')
      .update({ name: newName })
      .eq('id', contact.id);
      
    if (updateError) {
      console.error(`Failed to update ${contact.id}:`, updateError);
    }
  }
  console.log('Done!');
}

fixNames();
