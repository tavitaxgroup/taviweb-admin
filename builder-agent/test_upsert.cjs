const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, fallbackKey); // Using service role key for admin access

async function testUpsert() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa'; // mock tenant
  const pipeline = { name: 'Quy trình chuẩn', description: 'Test', tenant_id: tenantId };
  
  const { data, error } = await supabase.from('crm_pipelines').upsert([pipeline], { onConflict: 'id' }).select().single();
  if (error) {
    console.error('ERROR UPSERTING:', error);
  } else {
    console.log('SUCCESS UPSERTING:', data);
  }
}

testUpsert();
