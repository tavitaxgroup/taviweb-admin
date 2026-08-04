import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://llposvgrqjsrqktahrtw.supabase.co";
if (supabaseUrl.includes('placeholder.supabase.co')) {
  supabaseUrl = "https://llposvgrqjsrqktahrtw.supabase.co";
}

const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscG9zdmdycWpzcnFrdGFocnR3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwNDM3NywiZXhwIjoyMDk4OTgwMzc3fQ.3ESmqkafBVkIe5nnh2egk8Mr4iOI2332KmdH312aS-A";

let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;
if (supabaseKey.includes('your-anon-key-here')) {
  supabaseKey = fallbackKey;
}

const isServer = typeof window === 'undefined';
const effectiveKey = isServer 
  ? (process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey || fallbackKey) 
  : (supabaseKey || fallbackKey);

export const supabase = createClient(supabaseUrl, effectiveKey);

// Dành cho các Server API Routes cần quyền cao nhất (Bypass RLS) - Giữ lại để tương thích ngược
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey || 'dummy-server-key';
export const adminSupabase = createClient(supabaseUrl, serviceRoleKey);
