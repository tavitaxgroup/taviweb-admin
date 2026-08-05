import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPipelines() {
  const { data, error } = await supabase.from('crm_pipelines').select('*');
  if (error) {
    console.error('Error fetching pipelines:', error);
  } else {
    console.log('Pipelines:', data);
  }
}

checkPipelines();
