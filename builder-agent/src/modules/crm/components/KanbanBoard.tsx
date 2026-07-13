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
    <div className="flex h-full gap-6 overflow-x-auto pb-6 pt-2 px-2 custom-scrollbar">
      {stages.map((stage, index) => {
        const stageDeals = deals.filter((d) => d.stage_id === stage.id);
        
        // Premium colors based on stage index
        const headerColors = [
          'from-blue-500 to-cyan-500',
          'from-indigo-500 to-purple-500',
          'from-fuchsia-500 to-pink-500',
          'from-orange-500 to-amber-500',
          'from-emerald-500 to-teal-500',
          'from-slate-500 to-gray-500',
        ];
        const colorClass = headerColors[index % headerColors.length];
        
        return (
          <div
            key={stage.id}
            className="flex flex-col min-w-[320px] w-[320px] bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${colorClass} rounded-t-2xl`}></div>
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {stage.name}
              </h3>
              <span className="bg-white shadow-sm text-slate-600 text-xs font-bold py-1 px-2.5 rounded-lg border border-slate-200">
                {stageDeals.length}
              </span>
            </div>
            
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto p-4 custom-scrollbar">
              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                  onClick={() => onDealClick(deal)}
                  className="group bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-bold text-slate-800 mb-1 leading-tight group-hover:text-indigo-700 transition-colors">{deal.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span className="truncate">{deal.contact?.name || 'Unknown Contact'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}
                    </span>
                    {deal.assignee && (
                      <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold border border-indigo-100 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        {deal.assignee.name.split(' ')[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {stageDeals.length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <span className="text-sm text-slate-400 font-medium">Kéo thả deal vào đây</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
