require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, fallbackKey);

async function upsertPipeline(tenantId, pipeline) {
    const { data, error } = await supabase.from('crm_pipelines').upsert([{...pipeline, tenant_id: tenantId}], { onConflict: 'id' }).select().single();
    if (error) throw error;
    return data;
}

async function getStages(tenantId, pipelineId) {
    const { data, error } = await supabase.from('crm_stages').select('*').eq('pipeline_id', pipelineId).eq('tenant_id', tenantId).order('order');
    if (error) throw error;
    return data || [];
}

async function upsertStages(tenantId, pipelineId, stages) {
    const currentStages = await getStages(tenantId, pipelineId);
    const newStageIds = stages.filter(s => !s.id?.startsWith('s_new_')).map(s => s.id);
    const stagesToDelete = currentStages.filter(s => !newStageIds.includes(s.id));
    
    for (const st of stagesToDelete) {
      await supabase.from('crm_stages').delete().eq('id', st.id);
    }

    const stagesToUpdate = [];
    const stagesToInsert = [];

    stages.forEach(s => {
      const dbStage = {
        tenant_id: tenantId,
        pipeline_id: pipelineId,
        name: s.name,
        // color: s.color,
        order: s.order
      };
      if (s.id && !s.id.startsWith('s_new_')) {
        dbStage.id = s.id;
        stagesToUpdate.push(dbStage);
      } else {
        stagesToInsert.push(dbStage);
      }
    });

    if (stagesToUpdate.length > 0) {
      const { error } = await supabase.from('crm_stages').upsert(stagesToUpdate);
      if (error) throw error;
    }
    
    if (stagesToInsert.length > 0) {
      const { error } = await supabase.from('crm_stages').insert(stagesToInsert);
      if (error) throw error;
    }
}

async function test() {
  const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa';
  
  const activePipelineId = `p_new_${Date.now()}`;
  const activePipeline = {
      name: 'Full Test Pipeline ' + Date.now(),
      stages: [
          { id: `s_new_1`, name: 'Stage 1', order: 0 },
          { id: `s_new_2`, name: 'Stage 2', order: 1 }
      ]
  };
  
  try {
      let finalPipelineId = activePipelineId;
      if (activePipelineId.startsWith('p_new_')) {
        const savedPipeline = await upsertPipeline(tenantId, { name: activePipeline.name });
        finalPipelineId = savedPipeline.id;
      } else {
        await upsertPipeline(tenantId, { id: activePipelineId, name: activePipeline.name });
      }

      const stagesToSave = activePipeline.stages.map((s, idx) => ({ ...s, order: idx }));
      await upsertStages(tenantId, finalPipelineId, stagesToSave);
      console.log("Full save OK");
  } catch(e) {
      console.error("Full save ERROR", e);
  }
}

test();
