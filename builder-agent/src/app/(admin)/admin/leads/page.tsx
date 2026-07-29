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

  const isSuperAdmin = user.role === 'superadmin' || user.role === 'admin' && user.tenant_id === '00000000-0000-0000-0000-000000000000';
  const leads = await getAllLeads(user.tenant_id, isSuperAdmin);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Trung Tâm Dữ Liệu Khách Hàng</h1>
          <p className="text-slate-500 text-lg">Quản lý và theo dõi danh sách khách hàng tiềm năng được cào tự động.</p>
        </div>

        <LeadsClientView leads={leads} />
      </div>
    </div>
  );
}
