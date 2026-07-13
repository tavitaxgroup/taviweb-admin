import React from 'react';
import { CRMStage, CRMDeal } from '../types';

interface TableBoardProps {
  stages: CRMStage[];
  deals: CRMDeal[];
  onDealClick: (deal: CRMDeal) => void;
}

export default function TableBoard({ stages, deals, onDealClick }: TableBoardProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white pb-2 custom-scrollbar">
      <table className="min-w-full divide-y divide-slate-100 text-sm text-left">
        <thead className="bg-slate-50/80 text-slate-500 font-semibold sticky top-0 backdrop-blur-sm z-10">
          <tr>
            <th className="px-6 py-4">Tiêu đề Deal</th>
            <th className="px-6 py-4">Khách hàng</th>
            <th className="px-6 py-4 text-center">Trạng thái</th>
            <th className="px-6 py-4 text-right">Giá trị</th>
            <th className="px-6 py-4">Người phụ trách</th>
            <th className="px-6 py-4">Ngày tạo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 bg-white">
          {deals.map((deal) => {
            const stage = stages.find(s => s.id === deal.stage_id);
            const stageIndex = stages.findIndex(s => s.id === deal.stage_id);
            
            // Dynamic badge color based on stage index
            const badgeColors = [
              'bg-blue-50 text-blue-700 border-blue-200',
              'bg-indigo-50 text-indigo-700 border-indigo-200',
              'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
              'bg-orange-50 text-orange-700 border-orange-200',
              'bg-emerald-50 text-emerald-700 border-emerald-200',
              'bg-slate-50 text-slate-700 border-slate-200',
            ];
            const badgeClass = stageIndex >= 0 ? badgeColors[stageIndex % badgeColors.length] : badgeColors[5];

            return (
              <tr 
                key={deal.id} 
                onClick={() => onDealClick(deal)}
                className="hover:bg-slate-50 cursor-pointer transition-all duration-150 group"
              >
                <td className="px-6 py-4 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{deal.title}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">{deal.contact?.name || '-'}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold border ${badgeClass}`}>
                    {stage?.name || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 text-emerald-600 font-extrabold text-right">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {deal.assignee ? (
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {deal.assignee.name.charAt(0).toUpperCase()}
                      </div>
                      {deal.assignee.name}
                    </span>
                  ) : '-'}
                </td>
                <td className="px-6 py-4 text-slate-400 font-medium">
                  {new Date(deal.created_at).toLocaleDateString('vi-VN')}
                </td>
              </tr>
            );
          })}
          {deals.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>Chưa có deal nào.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
