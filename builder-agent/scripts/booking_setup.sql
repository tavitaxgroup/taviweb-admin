-- Booking Resources Table (Staff, Tables, Rooms)
CREATE TABLE IF NOT EXISTS public.booking_resources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('staff', 'table', 'room')),
  capacity integer DEFAULT 1,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Booking Services Table (e.g. Haircut, Massage, Combo)
CREATE TABLE IF NOT EXISTS public.booking_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  price numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Booking Customers Table
CREATE TABLE IF NOT EXISTS public.booking_customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Booking Appointments Table
CREATE TABLE IF NOT EXISTS public.booking_appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid REFERENCES public.booking_customers(id) ON DELETE CASCADE,
  resource_id uuid REFERENCES public.booking_resources(id) ON DELETE SET NULL,
  service_id uuid REFERENCES public.booking_services(id) ON DELETE SET NULL,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) but allow all for simplicity in this CRM context
ALTER TABLE public.booking_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_appointments ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow anonymous/public access (since API routes will handle logic)
CREATE POLICY "Enable all access for resources" ON public.booking_resources FOR ALL USING (true);
CREATE POLICY "Enable all access for services" ON public.booking_services FOR ALL USING (true);
CREATE POLICY "Enable all access for customers" ON public.booking_customers FOR ALL USING (true);
CREATE POLICY "Enable all access for appointments" ON public.booking_appointments FOR ALL USING (true);

-- Insert dummy data for testing
INSERT INTO public.booking_resources (name, type, capacity) VALUES 
('Thợ cắt tóc Sơn', 'staff', 1),
('Thợ làm móng Hoa', 'staff', 1),
('Bàn VIP 1', 'table', 4),
('Bàn Thường 2', 'table', 2);

INSERT INTO public.booking_services (name, duration_minutes, price) VALUES 
('Cắt tóc nam', 30, 100000),
('Làm nail cơ bản', 60, 250000),
('Gội đầu dưỡng sinh', 45, 150000),
('Buffet nướng (4 người)', 120, 1200000);
