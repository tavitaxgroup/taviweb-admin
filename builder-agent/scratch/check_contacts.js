const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://llposvgrqjsrqktahrtw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: contacts, error: cErr } = await supabase.from('crm_contacts').select('*').limit(1);
  console.log("Contacts Columns:", contacts ? Object.keys(contacts[0] || {}) : cErr);
}
check();
