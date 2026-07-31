-- Thêm cột màu sắc cho Stages để hỗ trợ bảng Kanban tùy biến
ALTER TABLE public.crm_stages 
ADD COLUMN IF NOT EXISTS color text DEFAULT 'bg-slate-200 text-slate-800';

-- Thêm cột custom_data dạng JSONB cho crm_deals để lưu trữ các trường dữ liệu tùy chỉnh
ALTER TABLE public.crm_deals
ADD COLUMN IF NOT EXISTS custom_data jsonb DEFAULT '{}'::jsonb;

-- Bảng lưu trữ định nghĩa các trường tùy chỉnh (Custom Fields) cho từng Pipeline
CREATE TABLE IF NOT EXISTS public.crm_custom_fields (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    pipeline_id uuid REFERENCES public.crm_pipelines(id) ON DELETE CASCADE,
    name text NOT NULL,
    field_type text NOT NULL, -- 'text', 'number', 'date', 'select'
    options jsonb, -- Chứa danh sách tùy chọn nếu là kiểu 'select' (VD: ["Khách VIP", "Khách thường"])
    "order" integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies cho bảng crm_custom_fields (Tương tự các bảng CRM khác)
ALTER TABLE public.crm_custom_fields ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép đọc crm_custom_fields" ON public.crm_custom_fields FOR SELECT USING (true);
CREATE POLICY "Cho phép thêm crm_custom_fields" ON public.crm_custom_fields FOR INSERT WITH CHECK (true);
CREATE POLICY "Cho phép sửa crm_custom_fields" ON public.crm_custom_fields FOR UPDATE USING (true);
CREATE POLICY "Cho phép xóa crm_custom_fields" ON public.crm_custom_fields FOR DELETE USING (true);
