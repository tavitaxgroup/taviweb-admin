require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";
const supabase = createClient(supabaseUrl, fallbackKey);

async function main() {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error(error);
        return;
    }
    console.log("Buckets:", buckets.map(b => b.name));
    
    if (!buckets.find(b => b.name === 'uploads')) {
        console.log("Creating uploads bucket...");
        const { error: createErr } = await supabase.storage.createBucket('uploads', { public: true });
        if (createErr) console.error("Create bucket error:", createErr);
        else console.log("Created 'uploads' bucket (public).");
    }
}

main();
