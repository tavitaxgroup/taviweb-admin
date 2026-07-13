"use client";

import React, { useEffect, useState } from 'react';
import { CRMService } from '../api/crm.service';
import { CRMPipeline, CRMStage, CRMDeal } from '../types';
import KanbanBoard from './KanbanBoard';
import TableBoard from './TableBoard';
import DealDetailModal from './DealDetailModal';

import TeamManagement from './TeamManagement';

export default function CRMView() {
  const [viewMode, setViewMode] = useState<'kanban' | 'table' | 'team'>('kanban');
  const [pipelines, setPipelines] = useState<CRMPipeline[]>([]);
  const [activePipeline, setActivePipeline] = useState<string | null>(null);
  const [stages, setStages] = useState<CRMStage[]>([]);
  const [deals, setDeals] = useState<CRMDeal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<CRMDeal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPipelines();
  }, []);

  useEffect(() => {
    if (activePipeline) {
      loadPipelineData(activePipeline);
    }
  }, [activePipeline]);

  const loadPipelines = async () => {
    try {
      const p = await CRMService.getPipelines();
      setPipelines(p);
      if (p.length > 0) {
        setActivePipeline(p[0].id);
      }
    } catch (error) {
      console.error('Failed to load pipelines', error);
    }
  };

  const loadPipelineData = async (pipelineId: string) => {
    setLoading(true);
    try {
      const [s, d] = await Promise.all([
        CRMService.getStages(pipelineId),
        CRMService.getDeals(pipelineId)
      ]);
      setStages(s);
      // Ensure we only show deals that belong to stages in this pipeline
      const stageIds = new Set(s.map(stage => stage.id));
      setDeals(d.filter(deal => stageIds.has(deal.stage_id)));
    } catch (error) {
      console.error('Failed to load pipeline data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDealMove = async (dealId: string, newStageId: string) => {
    // Optimistic update
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage_id: newStageId } : d));
    try {
      await CRMService.updateDealStage(dealId, newStageId);
    } catch (error) {
      console.error('Failed to move deal', error);
      // Revert if error
      if (activePipeline) loadPipelineData(activePipeline);
    }
  };

  if (loading && !activePipeline) {
    return <div className="p-8 text-center text-slate-500">Loading CRM...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold">CRM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
            Team Sales CRM
          </h1>
          {pipelines.length > 0 && viewMode !== 'team' && (
            <select 
              className="ml-4 border border-slate-200 bg-slate-50 rounded-lg px-4 py-2 text-sm font-medium outline-none hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-indigo-500/20"
              value={activePipeline || ''}
              onChange={(e) => setActivePipeline(e.target.value)}
            >
              {pipelines.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (activePipeline) loadPipelineData(activePipeline);
              if (viewMode === 'team') setViewMode('team'); // dummy to trigger re-render if needed
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
            title="Làm mới dữ liệu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Làm mới
          </button>
          
          <div className="flex items-center bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 shadow-inner">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                viewMode === 'kanban' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/></svg>
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                viewMode === 'table' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              Bảng
            </button>
            <button
              onClick={() => setViewMode('team')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                viewMode === 'team' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Quản lý Team
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden p-6">
        {loading && viewMode !== 'team' ? (
          <div className="flex items-center justify-center h-full text-slate-500">Loading Data...</div>
        ) : (
          viewMode === 'team' ? (
            <div className="max-w-5xl mx-auto"><TeamManagement /></div>
          ) : viewMode === 'kanban' ? (
            <KanbanBoard 
              stages={stages} 
              deals={deals} 
              onDealMove={handleDealMove} 
              onDealClick={setSelectedDeal} 
            />
          ) : (
            <TableBoard 
              stages={stages} 
              deals={deals} 
              onDealClick={setSelectedDeal} 
            />
          )
        )}
      </div>

      {/* Modal */}
      {selectedDeal && (
        <DealDetailModal 
          deal={selectedDeal} 
          onClose={() => setSelectedDeal(null)} 
          onDelete={() => {
            if (activePipeline) loadPipelineData(activePipeline);
          }}
        />
      )}
    </div>
  );
}
