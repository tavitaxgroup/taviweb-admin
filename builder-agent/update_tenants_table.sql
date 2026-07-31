ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS template_key TEXT;
ALTER TABLE public.tenants ADD COLUMN IF NOT EXISTS contact_info JSONB DEFAULT '{}'::jsonb;
