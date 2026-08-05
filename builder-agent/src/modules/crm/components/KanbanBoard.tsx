import React, { useState } from 'react';
import { CRMStage, CRMDeal } from '../types';

interface KanbanBoardProps {
  stages: CRMStage[];
  deals: CRMDeal[];
  onDealMove: (dealId: string, newStageId: string) => void;
  onDealClick: (deal: CRMDeal) => void;
}

export default function KanbanBoard({ stages, deals, onDealMove, onDealClick }: KanbanBoardProps) {
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDealId(dealId);
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId && draggedDealId === dealId) {
      onDealMove(dealId, stageId);
    }
    setDraggedDealId(null);
  };

  return (
    <div className="flex flex-1 h-full gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-2 custom-scrollbar relative z-10 w-full">
      {stages.map((stage, index) => {
        const stageDeals = deals.filter((d) => d.stage_id === stage.id);
        const stageTotalValue = stageDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);
        
        // Premium solid colors for column accents
        const headerColors = [
          'bg-blue-500',
          'bg-indigo-500',
          'bg-fuchsia-500',
          'bg-orange-500',
          'bg-emerald-500',
          'bg-slate-600',
        ];
        const colorClass = headerColors[index % headerColors.length];
        
        return (
          <div
            key={stage.id}
            className="flex flex-col min-w-[280px] w-[280px] transition-all duration-300 group/column border-r border-slate-200/60 pr-4 last:border-r-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column Header */}
            <div className="flex flex-col py-2 mb-2 sticky top-0 bg-slate-50 z-10">
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${colorClass}`}></div>
                  <h3 className="font-semibold text-slate-700 text-sm">
                    {stage.name}
                  </h3>
                </div>
                <span className="text-slate-400 text-xs font-medium">
                  {stageDeals.length}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400 ml-4">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stageTotalValue)}
              </div>
            </div>
            
            {/* Column Body */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar pb-10">
              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                  onClick={() => onDealClick(deal)}
                  className="group bg-white p-3 rounded-lg border border-slate-200 cursor-grab active:cursor-grabbing hover:border-slate-300 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] transition-all duration-150 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors text-[13px] line-clamp-2">
                      {deal.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2 font-medium">
                    <span className="truncate">{deal.contact?.name || 'Chưa cập nhật'}</span>
                  </div>
                  
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[11px] font-medium text-slate-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}
                    </span>
                    
                    {deal.assignee && (
                      <div className="flex items-center gap-1.5" title={`Phụ trách: ${deal.assignee.name}`}>
                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">
                          {(deal.assignee?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Empty Drop Zone */}
              {stageDeals.length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 transition-colors group-hover/column:border-slate-300">
                  <span className="text-xs text-slate-400 font-medium">Kéo thả deal vào đây</span>
                </div>
              )}
              
              {/* Quick Add Button (Visual only for now) */}
              <button className="mt-2 w-full py-2 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg text-sm font-medium transition-colors opacity-0 group-hover/column:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Thêm Deal
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
