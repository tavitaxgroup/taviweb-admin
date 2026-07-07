import { getAllLeads } from '@/lib/data';
import SalesStatusSelect from './SalesStatusSelect';

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

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[20%] text-left">Tên doanh nghiệp</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[12%] text-left">Ngành nghề</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[15%] text-left">Số điện thoại</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[20%] text-left">Địa chỉ</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-center">Trạng thái Data</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-center">Trạng thái Sale</th>
                  <th className="p-4 font-bold uppercase text-xs tracking-wider w-[13%] text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 truncate" title={lead.name}>
                      {lead.name}
                    </td>
                    <td className="p-4 text-sm text-slate-500 truncate">
                      <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{lead.industry}</span>
                    </td>
                    <td className="p-4 font-mono text-sm font-bold text-slate-700 truncate">
                      {lead.formatted_phone_number ? (
                        lead.formatted_phone_number
                      ) : (
                        <span className="text-slate-300 italic">Trống</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-slate-600 truncate" title={lead.formatted_address}>
                      {lead.formatted_address}
                    </td>
                    <td className="p-4 text-center">
                      {lead.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Khách Xịn
                        </span>
                      ) : lead.status === 'has_website' ? (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
                           Đã Có Web
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                           Mới cào
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <SalesStatusSelect leadId={lead.id} initialStatus={lead.sales_status} />
                    </td>
                    <td className="p-4 text-center flex items-center justify-center gap-2">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + " " + lead.formatted_address)}`} 
                        target="_blank"
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                        title="Xem trên Google Maps"
                      >
                        📍 Maps
                      </a>
                      {lead.status === 'verified' && lead.formatted_phone_number && (
                        <a 
                          href={`/demo/${lead.place_id}`} 
                          target="_blank"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                        >
                          👁️ Demo
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {leads.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Không có dữ liệu nào. Vui lòng chạy Discovery Agent trước.
          </div>
        )}
      </div>
    </div>
  );
}
