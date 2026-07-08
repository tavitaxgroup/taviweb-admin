'use client';

import React, { useState } from 'react';
import SalesStatusSelect from './SalesStatusSelect';

export default function LeadsTable({ initialLeads }: { initialLeads: any[] }) {
  const [dataStatusFilter, setDataStatusFilter] = useState('all');
  const [salesStatusFilter, setSalesStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Lấy danh sách ngành nghề độc nhất để làm menu thả xuống
  const uniqueIndustries = Array.from(new Set(initialLeads.map(lead => lead.industry).filter(Boolean)));

  const filteredLeads = initialLeads.filter(lead => {
    let matchData = true;
    if (dataStatusFilter !== 'all') {
      matchData = lead.status === dataStatusFilter;
    }
    
    let matchSales = true;
    if (salesStatusFilter !== 'all') {
      matchSales = lead.sales_status === salesStatusFilter;
    }

    let matchIndustry = true;
    if (industryFilter !== 'all') {
      matchIndustry = lead.industry === industryFilter;
    }

    return matchData && matchSales && matchIndustry;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">Ngành nghề:</span>
          <select 
            className="text-sm border-slate-300 rounded-md py-1.5 px-3 outline-none focus:ring-2 focus:ring-blue-500 max-w-[200px]"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            {uniqueIndustries.map((industry: any, idx) => (
              <option key={idx} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">Lọc Data:</span>
          <select 
            className="text-sm border-slate-300 rounded-md py-1.5 px-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={dataStatusFilter}
            onChange={(e) => setDataStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="verified">Khách Xịn (Đã xác minh)</option>
            <option value="facebook">Data Facebook</option>
            <option value="has_website">Đã Có Web</option>
            <option value="new">Mới cào</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">Lọc Sales:</span>
          <select 
            className="text-sm border-slate-300 rounded-md py-1.5 px-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={salesStatusFilter}
            onChange={(e) => setSalesStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="chưa sale">Chưa Sale</option>
            <option value="đang liên hệ">Đang liên hệ</option>
            <option value="đã chốt">Đã chốt</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        
        <div className="ml-auto text-sm text-slate-500 font-semibold">
          Hiển thị: {filteredLeads.length} / {initialLeads.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[25%] text-left">Tên doanh nghiệp</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[15%] text-left">Ngành nghề</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[20%] text-left">Số điện thoại</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[20%] text-left">Địa chỉ</th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[20%] text-center sticky right-0 bg-slate-900 z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.2)]">Hành động & Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4 font-semibold text-slate-800 break-words" title={lead.name}>
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
                <td className="p-4 text-center flex items-center justify-center gap-2 sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-l border-slate-100 flex-wrap">
                  {lead.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-bold border border-emerald-200 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Khách Xịn
                    </span>
                  ) : lead.status === 'facebook' ? (
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold border border-blue-200 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> FB Lead
                    </span>
                  ) : lead.status === 'has_website' ? (
                    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-md text-xs font-bold border border-rose-200 whitespace-nowrap">
                       Đã Có Web
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 whitespace-nowrap">
                       Mới cào
                    </span>
                  )}
                  
                  <SalesStatusSelect leadId={lead.id} initialStatus={lead.sales_status} />
                  
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + " " + lead.formatted_address)}`} 
                    target="_blank"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                    title="Xem trên Google Maps"
                  >
                    📍 Maps
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Không tìm thấy dữ liệu phù hợp với bộ lọc.
          </div>
        )}
      </div>
    </div>
  );
}
