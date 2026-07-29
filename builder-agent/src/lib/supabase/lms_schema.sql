-- Bảng Khoá học (Courses)
CREATE TABLE crm_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, draft, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bảng Lớp học (Classes)
CREATE TABLE crm_classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  course_id UUID REFERENCES crm_courses(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Giả sử bảng users là bảng nhân viên/giáo viên
  name VARCHAR(255) NOT NULL,
  schedule_desc TEXT, -- Ví dụ: "Tối 2-4-6 19h00"
  google_meet_link VARCHAR(255),
  status VARCHAR(50) DEFAULT 'upcoming', -- upcoming, ongoing, completed
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bảng Đăng ký (Enrollments) - Nối học viên (Contact) vào Lớp học
CREATE TABLE crm_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  class_id UUID REFERENCES crm_classes(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL, -- Để tracking từ deal nào sang
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, partial, paid
  amount_paid DECIMAL(12, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, dropped, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bảng Tài liệu học tập (Materials)
CREATE TABLE crm_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  class_id UUID REFERENCES crm_classes(id) ON DELETE CASCADE,
  course_id UUID REFERENCES crm_courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50), -- pdf, video, doc
  is_ai_embedded BOOLEAN DEFAULT false, -- Đánh dấu đã vector hóa cho RAG chưa
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Bảng Điểm danh (Attendance) - Nếu cần
CREATE TABLE crm_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  class_id UUID REFERENCES crm_classes(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'present', -- present, absent, late, excused
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
