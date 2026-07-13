'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { extractCityDistrict } from '@/lib/utils';

export default function DashboardStats({ leads }: { leads: any[] }) {
  // 1. Calculate top level metrics
  const totalLeads = leads.length;
  
  const googleLeads = leads.filter(l => !l.place_id?.startsWith('FB_'));
  const facebookLeads = leads.filter(l => l.place_id?.startsWith('FB_'));
  
  const verifiedLeads = leads.filter(l => l.status === 'verified').length;
  const hasWebsiteLeads = leads.filter(l => l.status === 'has_website').length;
  const newLeadsCount = leads.filter(l => l.status === 'new' || l.status === 'facebook').length;
  
  const hasPhoneLeads = leads.filter(l => l.formatted_phone_number && l.formatted_phone_number.trim() !== '').length;

  // Recent 24h leads
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const leadsLast24h = leads.filter(l => new Date(l.created_at) > oneDayAgo).length;

  // Top 5 Verified (Khách Xịn)
  const recentVerified = [...leads].filter(l => l.status === 'verified').sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  // 2. Data for Source Pie Chart
  const sourceData = [
    { name: 'Google Maps', value: googleLeads.length },
    { name: 'Facebook', value: facebookLeads.length }
  ];
  const SOURCE_COLORS = ['#3B82F6', '#1877F2'];

  // Status Pie Chart
  const statusData = [
    { name: 'Khách Xịn (Chưa Web)', value: verifiedLeads },
    { name: 'Đã Có Web', value: hasWebsiteLeads },
    { name: 'Mới Cào (Chưa xác thực)', value: newLeadsCount }
  ];
  const STATUS_COLORS = ['#10B981', '#F43F5E', '#94A3B8'];

  // 3. Data for Location Bar Chart
  const cityCounts: Record<string, number> = {};
  leads.forEach(l => {
    const { city } = extractCityDistrict(l.formatted_address);
    const c = city || 'Chưa rõ';
    cityCounts[c] = (cityCounts[c] || 0) + 1;
  });
  const locationData = Object.keys(cityCounts)
    .map(key => ({ name: key, count: cityCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // 4. Data for Sales Status Pie Chart
  const salesCounts: Record<string, number> = {};
  leads.forEach(l => {
    const s = l.sales_status || 'chưa sale';
    salesCounts[s] = (salesCounts[s] || 0) + 1;
  });
  const salesData = [
    { name: 'Chưa Sale', value: salesCounts['chưa sale'] || 0 },
    { name: 'Đang liên hệ', value: salesCounts['đang liên hệ'] || 0 },
    { name: 'Đã chốt', value: salesCounts['đã chốt'] || 0 },
    { name: 'Fail', value: salesCounts['fail'] || 0 },
  ];
  const SALES_COLORS = ['#94A3B8', '#F59E0B', '#10B981', '#EF4444'];

  const totalContacted = (salesCounts['đang liên hệ'] || 0) + (salesCounts['đã chốt'] || 0) + (salesCounts['fail'] || 0);
  const conversionRate = totalContacted > 0 ? Math.round(((salesCounts['đã chốt'] || 0) / totalContacted) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng Leads</div>
          <div className="text-4xl font-black text-slate-800">{totalLeads}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-sm text-white">
          <div className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-2">Khách Xịn (Chưa Web)</div>
          <div className="text-4xl font-black">{verifiedLeads}</div>
          <div className="mt-2 text-sm font-medium text-emerald-100">Cơ hội vàng chốt sale</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tỉ lệ chốt (Conversion)</div>
          <div className="text-4xl font-black text-blue-600">{conversionRate}%</div>
          <div className="mt-2 text-sm font-medium text-slate-400">{salesCounts['đã chốt'] || 0} chốt / {totalContacted} liên hệ</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Có Số Điện Thoại</div>
          <div className="text-4xl font-black text-indigo-600">{hasPhoneLeads}</div>
          <div className="mt-2 text-sm font-medium text-slate-400">Tỉ lệ: {totalLeads > 0 ? Math.round((hasPhoneLeads/totalLeads)*100) : 0}%</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-sm text-white">
          <div className="text-sm font-bold text-orange-100 uppercase tracking-wider mb-2">Leads Mới 24h Qua</div>
          <div className="text-4xl font-black">{leadsLast24h}</div>
          <div className="mt-2 text-sm font-medium text-orange-100">Cần liên hệ nóng</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 5 Verified Recent Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-800">Top 5 Khách Tiềm Năng Nhất</h3>
             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">Chưa có web</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase text-slate-500">
                     <th className="py-2">Doanh nghiệp</th>
                     <th className="py-2">SĐT</th>
                     <th className="py-2">Tỉnh/Thành</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {recentVerified.length > 0 ? recentVerified.map(l => (
                     <tr key={l.id} className="hover:bg-slate-50">
                        <td className="py-3 font-semibold text-slate-800">{l.name}</td>
                        <td className="py-3 font-mono text-sm text-slate-700">{l.formatted_phone_number || '-'}</td>
                        <td className="py-3 text-sm text-slate-600">{extractCityDistrict(l.formatted_address).city}</td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={3} className="py-4 text-center text-slate-400">Chưa có khách xịn nào</td>
                     </tr>
                  )}
               </tbody>
            </table>
          </div>
        </div>

        {/* Status Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Phân Loại Trạng Thái</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top 10 Tỉnh/Thành Phố (Nhiều data nhất)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="count" fill="#F43F5E" radius={[0, 4, 4, 0]} name="Số lượng leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Status Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Tiến Độ Chốt Sale</h3>
          <div className="h-[300px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={(props: any) => `${((props.percent || 0) * 100).toFixed(0)}%`}
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SALES_COLORS[index % SALES_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
