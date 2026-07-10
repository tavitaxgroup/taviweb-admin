import { getAllLeads } from '@/lib/data';
import LeadsClientView from './LeadsClientView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadsDashboard() {
  const leads = await getAllLeads();

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
