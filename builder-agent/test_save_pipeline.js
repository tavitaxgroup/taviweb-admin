require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, fallbackKey);

async function test() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
  
  // Create an array of stages where ONE has an ID and ONE does NOT have an ID.
  // This simulates modifying an existing pipeline and adding a new stage.
  const stagesToUpsert = [
    {
      id: 'f6f80a48-2f6d-4772-b387-a75eab10a1f3',
      tenant_id: tenantId,
      pipeline_id: '1f115b02-72cd-48dc-b21f-322cf85efb57',
      name: 'Existing Stage',
      order: 0
    },
    {
      tenant_id: tenantId,
      pipeline_id: '1f115b02-72cd-48dc-b21f-322cf85efb57',
      name: 'New Stage',
      order: 1
    }
  ];
  
  const { data, error } = await supabase.from('crm_stages').upsert(stagesToUpsert);
  if (error) {
    console.error("Lỗi upsert stages:", error);
  } else {
    console.log("Upsert stages OK", data);
  }
}

test();
