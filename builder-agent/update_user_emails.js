require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, fallbackKey);

async function main() {
    const { data: users, error } = await supabase.from('crm_users').select('id, email');
    if (error) {
        console.error(error);
        return;
    }

    console.log("Found users:", users.length);
    for (const u of users) {
        if (u.email && u.email.includes('@taviweb.com')) {
            const newEmail = u.email.replace('@taviweb.com', '');
            console.log(`Updating ${u.email} -> ${newEmail}`);
            const { error: updErr } = await supabase.from('crm_users').update({ email: newEmail }).eq('id', u.id);
            if (updErr) {
                console.error(`Failed to update ${u.id}:`, updErr);
            }
        }
    }
    console.log("Done");
}

main();
