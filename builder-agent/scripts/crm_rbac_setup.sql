-- ========================================================
-- KỊCH BẢN TẠO BẢNG PHÂN QUYỀN ĐỘNG (DYNAMIC RBAC)
-- Chạy script này trong SQL Editor của Supabase
-- ========================================================

-- 1. Tạo bảng crm_roles
CREATE TABLE IF NOT EXISTS crm_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Thêm 2 quyền mặc định (Admin và Sale)
INSERT INTO crm_roles (name, description, permissions) 
VALUES
('Quản trị viên', 'Có toàn quyền trên hệ thống', '["view_all_deals", "edit_all_deals", "delete_deals", "manage_pipelines", "manage_users", "manage_roles", "manage_settings"]'::jsonb),
('Nhân viên Sale', 'Quyền xem và xử lý Deal được giao', '["view_own_deals", "edit_own_deals"]'::jsonb);

-- 3. Thêm cột role_id vào bảng crm_users (nếu chưa có)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='crm_users' AND column_name='role_id') THEN
        ALTER TABLE crm_users ADD COLUMN role_id UUID REFERENCES crm_roles(id);
    END IF;
END $$;

-- 4. Đồng bộ dữ liệu cũ (Map role cũ sang role_id mới)
UPDATE crm_users 
SET role_id = (SELECT id FROM crm_roles WHERE name = 'Quản trị viên') 
WHERE role = 'admin' AND role_id IS NULL;

UPDATE crm_users 
SET role_id = (SELECT id FROM crm_roles WHERE name = 'Nhân viên Sale') 
WHERE role = 'sale' AND role_id IS NULL;

-- (Tùy chọn) Không xóa cột 'role' cũ vội để tránh lỗi app, ta sẽ dần chuyển sang dùng role_id.
