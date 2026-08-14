require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";

const supabase = createClient(supabaseUrl, fallbackKey);

async function test() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
  
  const pipeline = { name: 'Test Pipeline', tenant_id: tenantId };
  
  const { data, error } = await supabase.from('crm_pipelines').upsert([pipeline], { onConflict: 'id' }).select().single();
  
  if (error) {
    console.error("Pipeline Error:", error);
    return;
  }
  
  console.log("Pipeline OK:", data);
  
  const stage = {
    tenant_id: tenantId,
    pipeline_id: data.id,
    name: 'Tiếp nhận',
    order: 0,
    color: 'bg-slate-200'
  };
  
  const { data: sData, error: sError } = await supabase.from('crm_stages').upsert([stage]);
  if (sError) {
    console.error("Stage Error:", sError);
  } else {
    console.log("Stage OK", sData);
  }
}

test();
