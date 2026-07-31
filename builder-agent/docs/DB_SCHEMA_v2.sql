-- ==========================================
-- TAVIWEB SAAS MULTI-TENANT DATABASE SCHEMA V2
-- ==========================================

-- Bật extension pgvector để hỗ trợ AI RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- Xóa các bảng cũ (CẨN THẬN KHI CHẠY TRÊN PRODUCTION)
DROP TABLE IF EXISTS public.knowledge_chunks CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.packages CASCADE;
DROP TABLE IF EXISTS public.crm_users CASCADE;
DROP TABLE IF EXISTS public.tenants CASCADE;

-- 1. BẢNG QUẢN LÝ GÓI DỊCH VỤ (PACKAGES)
CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tier INTEGER NOT NULL,
    added_quota INTEGER NOT NULL,
    price_prod INTEGER NOT NULL,
    price_test INTEGER NOT NULL,
    features TEXT[] DEFAULT '{}',
    is_recommended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Bật RLS cho packages (Read-only cho tất cả)
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Packages are viewable by everyone." ON public.packages FOR SELECT USING (true);

-- 2. BẢNG QUẢN LÝ KHÁCH HÀNG (TENANTS)
CREATE TABLE public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    template_key TEXT,
    active_modules JSONB DEFAULT '["crm"]'::jsonb,
    package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
    ai_quota INTEGER DEFAULT 0,
    ai_used INTEGER DEFAULT 0,
    package_expires_at TIMESTAMPTZ,
    contact_info JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Bật RLS cho tenants (Tenant admin chỉ được quyền xem/sửa data của chính mình)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
-- Cho phép service role thao tác không giới hạn (bỏ qua policy khi dùng service role key)
CREATE POLICY "Tenant admin can view their own tenant" ON public.tenants FOR SELECT USING (id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
CREATE POLICY "Tenant admin can update their own tenant" ON public.tenants FOR UPDATE USING (id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);

-- 3. BẢNG GIAO DỊCH (TRANSACTIONS)
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    package_id UUID NOT NULL REFERENCES public.packages(id),
    transaction_code TEXT UNIQUE NOT NULL,
    amount INTEGER NOT NULL,
    duration_months INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant can view their own transactions" ON public.transactions FOR SELECT USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);

-- 4. BẢNG LỊCH SỬ THAO TÁC (AUDIT LOGS)
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    actor_id UUID,
    actor_type TEXT NOT NULL, -- 'super_admin', 'tenant_admin', 'system', 'webhook'
    action TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant can view their own audit logs" ON public.audit_logs FOR SELECT USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);

-- 5. BẢNG LƯU TRỮ VECTOR RAG (KNOWLEDGE CHUNKS)
CREATE TABLE public.knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1536) NOT NULL, -- Dành cho text-embedding-3-small
    source_type TEXT NOT NULL, -- 'faq', 'service', 'pricing', 'policy', 'custom'
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant can access their own chunks" ON public.knowledge_chunks FOR SELECT USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
CREATE POLICY "Tenant can insert their own chunks" ON public.knowledge_chunks FOR INSERT WITH CHECK (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
CREATE POLICY "Tenant can delete their own chunks" ON public.knowledge_chunks FOR DELETE USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);

-- Indexing Vector cho pgvector (Tối ưu tìm kiếm HNSW)
CREATE INDEX ON public.knowledge_chunks USING hnsw (embedding vector_cosine_ops);

-- 6. BẢNG QUẢN LÝ NHÂN VIÊN CRM (CRM USERS)
CREATE TABLE public.crm_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'staff',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (tenant_id, email)
);

ALTER TABLE public.crm_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant admin can view users in same tenant" ON public.crm_users FOR SELECT USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);
CREATE POLICY "Tenant admin can update users in same tenant" ON public.crm_users FOR UPDATE USING (tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid);

-- INSERT DEFAULT PACKAGES MẪU
INSERT INTO public.packages (name, tier, added_quota, price_prod, price_test, features, is_recommended) VALUES
('Gói Cơ Bản', 1, 100000, 199000, 2000, '{"1 Website chuyên nghiệp", "Hỗ trợ chuẩn SEO", "100.000 Token AI"}', false),
('Gói Tiêu Chuẩn', 2, 500000, 499000, 5000, '{"Tất cả tính năng Gói Cơ Bản", "Hỗ trợ đa ngôn ngữ", "Hỗ trợ kỹ thuật 24/7", "500.000 Token AI"}', true),
('Gói Nâng Cao', 3, 2000000, 999000, 10000, '{"Tất cả tính năng Gói Tiêu Chuẩn", "Bảo mật nâng cao", "Cấu hình Server riêng", "2.000.000 Token AI"}', false),
('Gói Enterprise', 4, 10000000, 4999000, 50000, '{"Tất cả tính năng Gói Nâng Cao", "Thiết kế giao diện độc quyền", "Đội ngũ support riêng biệt", "Không giới hạn Token AI"}', false);
