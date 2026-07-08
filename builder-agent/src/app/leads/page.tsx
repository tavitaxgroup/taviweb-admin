import { getAllLeads } from '@/lib/data';
import LeadsTable from './LeadsTable';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadsDashboard() {
  const leads = await getAllLeads();
  
  const totalLeads = leads.length;
  const verifiedLeads = leads.filter(l => l.status === 'verified').length;
  const hasWebsiteLeads = leads.filter(l => l.status === 'has_website').length;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Trung Tâm Dữ Liệu Khách Hàng</h1>
            <p className="text-slate-500 text-lg">Quản lý và theo dõi danh sách khách hàng tiềm năng được cào tự động.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center min-w-[120px]">
              <div className="text-3xl font-black text-blue-600">{totalLeads}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Tổng Leads</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center min-w-[120px]">
              <div className="text-3xl font-black text-emerald-500">{verifiedLeads}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Khách Xịn</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center min-w-[120px]">
              <div className="text-3xl font-black text-rose-500">{hasWebsiteLeads}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Đã Có Web</div>
            </div>
          </div>
        </div>

        <LeadsTable initialLeads={leads} />
      </div>
    </div>
  );
}
