-- 1. Create system_audit_logs table
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.crm_users(id) ON DELETE SET NULL,
    module VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(255),
    description TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index for faster querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.system_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_module ON public.system_audit_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.system_audit_logs(user_id);

-- 3. Enable RLS (Row Level Security) - Admins can read, anyone authenticated can insert (via API)
ALTER TABLE public.system_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated to insert logs" 
ON public.system_audit_logs FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow all authenticated to read logs for now" 
ON public.system_audit_logs FOR SELECT 
TO authenticated 
USING (true);

-- 4. Set up Auto Deletion of logs older than 90 days
-- NOTE: Requires pg_cron extension to be enabled in Supabase (Database -> Extensions -> pg_cron)
-- Run this block if pg_cron is enabled:
/*
SELECT cron.schedule(
    'delete_old_audit_logs',
    '0 0 * * *', -- Run at midnight every day
    $$ DELETE FROM public.system_audit_logs WHERE created_at < NOW() - INTERVAL '90 days'; $$
);
*/
