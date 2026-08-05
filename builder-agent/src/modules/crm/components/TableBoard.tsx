import React, { useState } from 'react';
import { CRMStage, CRMDeal } from '../types';
import { CRMService } from '../api/crm.service';
import { useAuth } from '../contexts/AuthContext';

interface TableBoardProps {
  stages: CRMStage[];
  deals: CRMDeal[];
  onDealClick: (deal: CRMDeal) => void;
  onRefresh?: () => void;
}

export default function TableBoard({ stages, deals, onDealClick, onRefresh }: TableBoardProps) {
  const { user } = useAuth();
  const [editingCell, setEditingCell] = useState<{ dealId: string, field: string } | null>(null);
  const [editValue, setEditValue] = useState<string | number>('');

  const handleCellClick = (e: React.MouseEvent, deal: CRMDeal, field: string, currentValue: string | number) => {
    e.stopPropagation();
    setEditValue(currentValue);
    setEditingCell({ dealId: deal.id, field });
  };

  const handleSaveCell = async (deal: CRMDeal) => {
    if (!editingCell || !user?.tenant_id) return;
    try {
      if (editingCell.field === 'title' && editValue !== deal.title) {
        await CRMService.updateDeal(user.tenant_id, deal.id, { title: editValue as string });
        deal.title = editValue as string;
      } else if (editingCell.field === 'value' && editValue !== deal.value) {
        await CRMService.updateDeal(user.tenant_id, deal.id, { value: Number(editValue) });
        deal.value = Number(editValue);
      } else if (editingCell.field === 'stage_id' && editValue !== deal.stage_id) {
        await CRMService.updateDealStage(user.tenant_id, deal.id, editValue as string);
        deal.stage_id = editValue as string;
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
    setEditingCell(null);
  };
  return (
    <div className="overflow-auto border border-slate-200 bg-white flex-1 h-full custom-scrollbar rounded-xl shadow-sm relative">
      <table className="min-w-full divide-y divide-slate-200 border-collapse">
        <thead className="bg-slate-50 text-slate-500 text-xs font-semibold sticky top-0 z-20 shadow-sm border-b border-slate-200">
          <tr className="divide-x divide-slate-100">
            <th className="px-3 py-2 font-medium text-slate-500 whitespace-nowrap"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l16 0"/><path d="M4 12l16 0"/><path d="M4 18l16 0"/></svg>Tiêu đề Deal</div></th>
            <th className="px-3 py-2 font-medium text-slate-500 whitespace-nowrap"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/></svg>Khách hàng</div></th>
            <th className="px-3 py-2 font-medium text-slate-500 whitespace-nowrap"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l0 4l2 2"/></svg>Trạng thái</div></th>
            <th className="px-3 py-2 font-medium text-slate-500 text-right whitespace-nowrap">Giá trị</th>
            <th className="px-3 py-2 font-medium text-slate-500 whitespace-nowrap"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/></svg>Người phụ trách</div></th>
            <th className="px-3 py-2 font-medium text-slate-500 whitespace-nowrap"><div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M4 11h16"/><path d="M11 15h1"/><path d="M12 15v3"/></svg>Ngày tạo</div></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
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
                className="hover:bg-slate-50 cursor-pointer transition-none group text-[13px] divide-x divide-slate-100"
              >
                <td 
                  className="px-3 py-2 font-medium text-slate-900 group-hover:text-indigo-600 truncate max-w-[250px] border-l-2 border-transparent hover:border-l-indigo-500 cursor-text"
                  onClick={(e) => handleCellClick(e, deal, 'title', deal.title)}
                >
                  {editingCell?.dealId === deal.id && editingCell?.field === 'title' ? (
                    <input 
                      autoFocus
                      className="w-full bg-white border border-indigo-400 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500"
                      value={editValue as string}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveCell(deal)}
                      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    />
                  ) : deal.title}
                </td>
                <td className="px-3 py-2 text-slate-600 truncate max-w-[200px]">{deal.contact?.name || '-'}</td>
                <td 
                  className="px-3 py-2 text-center whitespace-nowrap cursor-pointer hover:bg-slate-100"
                  onClick={(e) => handleCellClick(e, deal, 'stage_id', deal.stage_id)}
                >
                  {editingCell?.dealId === deal.id && editingCell?.field === 'stage_id' ? (
                    <select 
                      autoFocus
                      className="w-full bg-white border border-indigo-400 rounded px-1 py-0.5 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500"
                      value={editValue as string}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleSaveCell(deal)}
                      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    >
                      {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  ) : (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
                      {stage?.name || 'Unknown'}
                    </span>
                  )}
                </td>
                <td 
                  className="px-3 py-2 text-slate-700 text-right whitespace-nowrap font-mono text-[13px] cursor-text hover:bg-slate-100"
                  onClick={(e) => handleCellClick(e, deal, 'value', deal.value || 0)}
                >
                  {editingCell?.dealId === deal.id && editingCell?.field === 'value' ? (
                    <input 
                      autoFocus
                      type="number"
                      className="w-[100px] text-right bg-white border border-indigo-400 rounded px-1.5 py-0.5 text-xs text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500"
                      value={editValue as number}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      onBlur={() => handleSaveCell(deal)}
                      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    />
                  ) : (
                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)
                  )}
                </td>
                <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                  {deal.assignee ? (
                    <span className="inline-flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                        {(deal.assignee?.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[120px]">{deal.assignee.name}</span>
                    </span>
                  ) : '-'}
                </td>
                <td className="px-3 py-2 text-slate-500 whitespace-nowrap">
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
