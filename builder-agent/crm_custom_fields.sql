DROP TABLE IF EXISTS public.crm_custom_fields CASCADE;

CREATE TABLE public.crm_custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('deal', 'contact')),
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'number', 'date', 'select', 'boolean')),
  options JSONB,
  required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, entity_type, name)
);

INSERT INTO public.crm_custom_fields (tenant_id, entity_type, name, label, type, options, order_index)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'deal', 'ngay_kham', 'Ngày dự kiến đến', 'date', NULL, 1),
  ('00000000-0000-0000-0000-000000000000', 'deal', 'loai_dich_vu', 'Dịch vụ quan tâm', 'select', '["Khám tổng quát", "Nhổ răng", "Niềng răng", "Khác"]', 2)
ON CONFLICT (tenant_id, entity_type, name) DO NOTHING;
