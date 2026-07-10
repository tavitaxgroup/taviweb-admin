'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function DashboardStats({ leads }: { leads: any[] }) {
  // 1. Calculate top level metrics
  const totalLeads = leads.length;
  
  const googleLeads = leads.filter(l => !l.place_id?.startsWith('FB_'));
  const facebookLeads = leads.filter(l => l.place_id?.startsWith('FB_'));
  
  const verifiedLeads = leads.filter(l => l.status === 'verified').length;
  const hasWebsiteLeads = leads.filter(l => l.status === 'has_website').length;
  
  const hasPhoneLeads = leads.filter(l => l.formatted_phone_number && l.formatted_phone_number.trim() !== '').length;

  // 2. Data for Source Pie Chart
  const sourceData = [
    { name: 'Google Maps', value: googleLeads.length },
    { name: 'Facebook', value: facebookLeads.length }
  ];
  const SOURCE_COLORS = ['#3B82F6', '#1877F2'];

  // 3. Data for Industry Bar Chart
  const industryCounts: Record<string, number> = {};
  leads.forEach(l => {
    const ind = l.industry || 'Khác';
    industryCounts[ind] = (industryCounts[ind] || 0) + 1;
  });
  
  const industryData = Object.keys(industryCounts)
    .map(key => ({ name: key, count: industryCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // top 10

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

  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng Leads</div>
          <div className="text-4xl font-black text-slate-800">{totalLeads}</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-sm text-white">
          <div className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-2">Khách Xịn (Chưa Web)</div>
          <div className="text-4xl font-black">{verifiedLeads}</div>
          <div className="mt-2 text-sm font-medium text-emerald-100">Cơ hội vàng để chốt sale</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Đã Có Website</div>
          <div className="text-4xl font-black text-rose-500">{hasWebsiteLeads}</div>
          <div className="mt-2 text-sm font-medium text-slate-400">Có thể upsell SEO/Ads</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-sm text-white">
          <div className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-2">Có Số Điện Thoại</div>
          <div className="text-4xl font-black">{hasPhoneLeads}</div>
          <div className="mt-2 text-sm font-medium text-blue-100">Tỉ lệ: {totalLeads > 0 ? Math.round((hasPhoneLeads/totalLeads)*100) : 0}%</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Source Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Nguồn Dữ Liệu</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top 10 Ngành Nghề</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Số lượng leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Status Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-3">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Tiến Độ Chốt Sale</h3>
          <div className="h-[300px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(props: any) => `${props.name} ${((props.percent || 0) * 100).toFixed(0)}%`}
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
