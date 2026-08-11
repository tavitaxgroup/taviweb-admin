const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('c:/Users/Admin/OneDrive/Desktop/Webbuider_Multi_Agent_Project/builder-agent/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackKey;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExactCount() {
  const { count: leadCount, error: leadErr } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });
    
  if (leadErr) {
    console.error("Error fetching leads count:", leadErr);
    return;
  }
  
  const { count: tenantCount, error: tenantErr } = await supabase
    .from('tenants')
    .select('*', { count: 'exact', head: true });
    
  if (tenantErr) {
    console.error("Error fetching tenants count:", tenantErr);
    return;
  }
  
  console.log(`Chính xác tổng số Leads: ${leadCount}`);
  console.log(`Chính xác tổng số Tenants (Demo): ${tenantCount}`);
}

checkExactCount();
