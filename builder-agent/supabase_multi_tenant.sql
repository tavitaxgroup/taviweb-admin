-- 1. Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  active_modules JSONB DEFAULT '["crm"]'::jsonb,
  theme_config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insert the default tenant (TAVI)
INSERT INTO public.tenants (id, name, slug, active_modules)
VALUES (
  '00000000-0000-0000-0000-000000000000', 
  'TAVI SaaS', 
  'tavi', 
  '["crm", "booking", "leads"]'
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Function to add tenant_id to a table and set default to TAVI
CREATE OR REPLACE FUNCTION add_tenant_id_to_table(table_name TEXT)
RETURNS void AS $$
BEGIN
  -- Add column if not exists
  EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id)', table_name);
  
  -- Update existing rows to use the default tenant
  EXECUTE format('UPDATE %I SET tenant_id = %L WHERE tenant_id IS NULL', table_name, '00000000-0000-0000-0000-000000000000');
  
  -- Set NOT NULL
  EXECUTE format('ALTER TABLE %I ALTER COLUMN tenant_id SET NOT NULL', table_name);
END;
$$ LANGUAGE plpgsql;

-- 4. Apply to all CRM tables
SELECT add_tenant_id_to_table('crm_users');
SELECT add_tenant_id_to_table('crm_roles');
SELECT add_tenant_id_to_table('crm_pipelines');
SELECT add_tenant_id_to_table('crm_stages');
SELECT add_tenant_id_to_table('crm_contacts');
SELECT add_tenant_id_to_table('crm_deals');
SELECT add_tenant_id_to_table('crm_activities');
SELECT add_tenant_id_to_table('crm_products');
SELECT add_tenant_id_to_table('crm_quotes');
SELECT add_tenant_id_to_table('crm_quote_items');
SELECT add_tenant_id_to_table('crm_kpis');
SELECT add_tenant_id_to_table('system_audit_logs');
