const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkKey() {
  const { data, error } = await supabase.from('tenants').select('id, developer_api_key').not('developer_api_key', 'is', null).limit(1);
  if (error) {
    console.error("Lỗi:", error);
  } else {
    console.log("VALID_API_KEY_FOUND:", data[0]?.developer_api_key);
  }
}

checkKey();
