const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://llposvgrqjsrqktahrtw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const tenant_id = '6b381b43-4359-49d3-9c0e-8bf77c8a43b5';

  // 1. Create pipeline
  const { data: pipeline, error: pErr } = await supabase.from('crm_pipelines').insert([{
    tenant_id,
    name: 'Quy trình Sale Mặc định',
    description: 'Tự động tạo'
  }]).select().single();
  if (pErr) {
    console.error("Pipeline Error:", pErr);
    return;
  }
  
  console.log("Pipeline created:", pipeline.id);

  // 2. Create stages
  const stages = [
    { tenant_id, pipeline_id: pipeline.id, name: 'Khách Mới', color: '#3b82f6', order: 1 },
    { tenant_id, pipeline_id: pipeline.id, name: 'Đang Tư Vấn', color: '#eab308', order: 2 },
    { tenant_id, pipeline_id: pipeline.id, name: 'Chốt Khách', color: '#22c55e', order: 3 },
  ];
  
  const { error: sErr } = await supabase.from('crm_stages').insert(stages);
  if (sErr) {
    console.error("Stages Error:", sErr);
    return;
  }
  
  console.log("Stages created.");
}
seed();
