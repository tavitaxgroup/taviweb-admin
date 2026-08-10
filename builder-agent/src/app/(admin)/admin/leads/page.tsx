import { getAllLeads } from '@/lib/data';
import LeadsClientView from './LeadsClientView';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadsDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_token')?.value;
  
  console.log("=== DEBUG ADMIN/LEADS COOKIES ===", cookieStore.getAll());
  
  if (!token) {
    return (
      <div className="p-8">
        <h2>Chưa đăng nhập. Vui lòng quay lại trang đăng nhập.</h2>
        <pre>{JSON.stringify(cookieStore.getAll(), null, 2)}</pre>
      </div>
    );
  }

  let user: any = null;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123');
  } catch (err) {
    return <div>Phiên đăng nhập không hợp lệ.</div>;
  }

  if (!user?.tenant_id) {
    return <div>Không tìm thấy thông tin tenant.</div>;
  }

  const isSuperAdmin = user.role === 'superadmin' || (user.role === 'admin' && user.tenant_id === '6064025b-7fe4-4840-a27f-2d5da65e15fa');
  const isSale = user.role === 'sale';
  
  console.log("=== DEBUG LEADS PAGE ===", { userId: user.id, role: user.role, isSuperAdmin, isSale });

  if (!isSuperAdmin && !isSale) {
    return (
      <div className="p-8">
        <h2>Bạn không có quyền truy cập trang này.</h2>
      </div>
    );
  }

  const leads = await getAllLeads(user.tenant_id, isSuperAdmin, isSale ? user.id : undefined);
  console.log("=== DEBUG LEADS PAGE: Fetched Leads ===", leads.length);

  let salesUsers: any[] = [];
  if (isSuperAdmin) {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('crm_users').select('id, name').eq('role', 'sale');
    if (data) salesUsers = data;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Trung Tâm Dữ Liệu Khách Hàng</h1>
          <p className="text-slate-500 text-lg">Quản lý và theo dõi danh sách khách hàng tiềm năng được cào tự động.</p>
          
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mt-4 font-mono text-sm">
             [HỆ THỐNG DEBUG] user.role: {user.role} | isSuperAdmin: {String(isSuperAdmin)} | isSale: {String(isSale)} | userId: {user.id} | Tổng Data Tải Về: {leads.length}
          </div>
        </div>

        <LeadsClientView leads={leads} isSuperAdmin={isSuperAdmin} salesUsers={salesUsers} />
      </div>
    </div>
  );
}
