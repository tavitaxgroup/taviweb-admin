const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
let anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure we strictly use the ANON key
const supabase = createClient(supabaseUrl, anonKey);

async function testSelect() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa'; 
  const { data, error } = await supabase.from('crm_pipelines').select('*').eq('tenant_id', tenantId);
  if (error) {
    console.error('ERROR SELECTING:', error);
  } else {
    console.log('SUCCESS SELECTING:', data.length, 'records');
  }
}

async function testInsert() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa'; 
  const pipeline = { name: 'Quy trình chuẩn 2', description: 'Test anon', tenant_id: tenantId };
  
  const { data, error } = await supabase.from('crm_pipelines').upsert([pipeline], { onConflict: 'id' }).select().single();
  if (error) {
    console.error('ERROR UPSERTING ANON:', error);
  } else {
    console.log('SUCCESS UPSERTING ANON:', data);
  }
}

async function run() {
  await testSelect();
  await testInsert();
}
run();
