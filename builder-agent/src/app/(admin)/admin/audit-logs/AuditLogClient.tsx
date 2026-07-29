'use client';

import React, { useState } from 'react';
import { History, Search, Filter } from 'lucide-react';
import { AuditService } from '@/lib/audit.service';

interface AuditLogClientProps {
  initialLogs: any[];
}

export default function AuditLogClient({ initialLogs }: AuditLogClientProps) {
  const [logs, setLogs] = useState(initialLogs);
  const [filterModule, setFilterModule] = useState<string>('ALL');

  const handleFilterChange = async (module: string) => {
    setFilterModule(module);
    const data = await AuditService.getAuditLogs({ 
      module: module === 'ALL' ? undefined : module,
      limit: 100 
    });
    setLogs(data);
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(d);
  };

  const getModuleBadge = (module: string) => {
    switch(module) {
      case 'CRM': return <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold border border-indigo-200">CRM</span>;
      case 'LEADS': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold border border-blue-200">LEADS</span>;
      case 'SETTINGS': return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">SETTINGS</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-bold border border-gray-200">{module}</span>;
    }
  };

  const getActionBadge = (action: string) => {
    if (action.includes('CREATE') || action.includes('ADD')) {
       return <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">{action}</span>;
    }
    if (action.includes('UPDATE')) {
       return <span className="text-amber-600 font-bold text-xs bg-amber-50 px-2 py-1 rounded-md border border-amber-100">{action}</span>;
    }
    if (action.includes('DELETE')) {
       return <span className="text-rose-600 font-bold text-xs bg-rose-50 px-2 py-1 rounded-md border border-rose-100">{action}</span>;
    }
    return <span className="text-slate-600 font-bold text-xs bg-slate-50 px-2 py-1 rounded-md border border-slate-200">{action}</span>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <History className="w-8 h-8 text-indigo-600" />
            Nhật ký hệ thống
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi toàn bộ các hoạt động, thao tác trên hệ thống.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
            <select 
              value={filterModule}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white shadow-sm focus:border-indigo-500 outline-none appearance-none cursor-pointer"
            >
              <option value="ALL">Tất cả Module</option>
              <option value="CRM">CRM & Deals</option>
              <option value="LEADS">Leads Data</option>
              <option value="SETTINGS">Hệ thống & Cài đặt</option>
            </select>
          </div>
          
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
             </div>
             <input 
               type="text"
               placeholder="Tìm kiếm log..."
               className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm w-64 bg-white shadow-sm focus:border-indigo-500 outline-none"
             />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[180px]">Thời gian</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[120px]">Module</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[200px]">Người thực hiện</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-[120px]">Hành động</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Chi tiết thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-500">
                    {formatDate(log.created_at)}
                  </td>
                  <td className="p-4">
                    {getModuleBadge(log.module)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 shrink-0">
                        {log.user?.name ? log.user.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">
                          {log.user?.name || 'Hệ thống'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {log.user?.role || ''}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-800 font-medium">
                      {log.description}
                    </p>
                    {log.entity_type && (
                      <p className="text-xs text-slate-400 mt-1">
                        Entity: {log.entity_type} {log.entity_id ? `(#${log.entity_id.substring(0, 8)})` : ''}
                      </p>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Chưa có hoạt động nào được ghi nhận.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">
            Hiển thị {logs.length} bản ghi mới nhất.
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold bg-white text-slate-400 cursor-not-allowed">
              Trang trước
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50">
              Trang sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
