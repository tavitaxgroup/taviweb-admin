const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, fallbackKey);

async function testUpsertStages() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
  const pipelineId = 'dcd96102-08d4-417e-9ef9-2bd7bdab8576'; // ID from previous test

  const stages = [
    { tenant_id: tenantId, pipeline_id: pipelineId, name: 'Mới (Leads)', order: 0 },
    { tenant_id: tenantId, pipeline_id: pipelineId, name: 'Đang xử lý', order: 1 },
    { tenant_id: tenantId, pipeline_id: pipelineId, name: 'Hoàn thành', order: 2 }
  ];

  const { data, error } = await supabase.from('crm_stages').upsert(stages, { onConflict: 'id' }).select();
  if (error) {
    console.error('ERROR UPSERTING STAGES:', error);
  } else {
    console.log('SUCCESS UPSERTING STAGES:', data.length);
  }
}

testUpsertStages();
