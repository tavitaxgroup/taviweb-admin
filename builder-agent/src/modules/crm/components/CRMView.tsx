"use client";

import React, { useEffect, useState } from 'react';
import { CRMService } from '../api/crm.service';
import { CRMPipeline, CRMStage, CRMDeal } from '../types';
import KanbanBoard from './KanbanBoard';
import TableBoard from './TableBoard';
import DealDetailModal from './DealDetailModal';
import ReportDashboard from './ReportDashboard';
import PipelineSelector from './PipelineSelector';
import { useAuth } from '../contexts/AuthContext';
import CommandPalette from './CommandPalette';
import CreateDealModal from './CreateDealModal';
import CRMSettings from './CRMSettings';
import QuoteCalculator from './QuoteCalculator';
import CourseManagement from './CourseManagement';
import ClassManagement from './ClassManagement';

export default function CRMView() {
  const { user, loading: authLoading, hasPermission } = useAuth();
  
  const [viewMode, setViewMode] = useState<'kanban' | 'table' | 'report' | 'settings' | 'calculator' | 'lms_courses' | 'lms_classes'>('kanban');
  const [pipelines, setPipelines] = useState<CRMPipeline[]>([]);
  const [activePipeline, setActivePipeline] = useState<string>('');
  const [stages, setStages] = useState<CRMStage[]>([]);
  const [deals, setDeals] = useState<CRMDeal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<CRMDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [templateKey, setTemplateKey] = useState<string>('');
  
  // Filters & Views state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'all' | 'vip' | 'this_month'>('all');
  const [cmdKOpen, setCmdKOpen] = useState(false);
  const [createDealOpen, setCreateDealOpen] = useState(false);

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdKOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (user) {
      loadPipelines();
      
      // Fetch tenant template key to conditionally show modules (like LMS)
      import('@/lib/supabase').then(({ supabase }) => {
        supabase.from('tenants').select('template_key').eq('id', user.tenant_id).single().then(({data}) => {
          if (data) setTemplateKey(data.template_key);
        });
      });
    }
  }, [user, viewMode]); // Tải lại pipeline mỗi khi chuyển tab (vd: từ Builder về Kanban)

  useEffect(() => {
    if (activePipeline && user) {
      loadPipelineData(activePipeline);
    }
  }, [activePipeline, user]);

  const loadPipelines = async () => {
    if (!user?.tenant_id) return;
    try {
      let p = await CRMService.getPipelines(user.tenant_id);
      
      // Auto-create default pipeline if none exists
      if (p.length === 0) {
         const newPipeline = await CRMService.upsertPipeline(user.tenant_id, { name: 'Quy trình chuẩn', description: 'Quy trình chăm sóc khách hàng mặc định' });
         await CRMService.upsertStages(user.tenant_id, newPipeline.id, [
            { name: 'Mới (Leads)', order: 0, color: 'bg-slate-200 text-slate-700' },
            { name: 'Đang xử lý', order: 1, color: 'bg-indigo-100 text-indigo-700' },
            { name: 'Hoàn thành', order: 2, color: 'bg-emerald-100 text-emerald-700' }
         ]);
         p = await CRMService.getPipelines(user.tenant_id);
      }

      setPipelines(p);
      if (p.length > 0) {
        setActivePipeline(current => {
          // Giữ nguyên pipeline đang chọn nếu nó vẫn tồn tại, ngược lại lấy cái đầu tiên
          if (current && p.some(pipe => pipe.id === current)) {
            return current;
          }
          return p[0].id;
        });
      } else {
        // If there are no pipelines, we must stop loading immediately
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load pipelines', error);
      setLoading(false);
    }
  };

  const loadPipelineData = async (pipelineId: string) => {
    if (!user?.tenant_id) return;
    setLoading(true);
    try {
      let s = await CRMService.getStages(user.tenant_id, pipelineId);
      
      // Auto-recover stages if the pipeline somehow has no stages (e.g. from previous DB crash)
      if (s.length === 0) {
         await CRMService.upsertStages(user.tenant_id, pipelineId, [
            { name: 'Mới (Leads)', order: 0 },
            { name: 'Đang xử lý', order: 1 },
            { name: 'Hoàn thành', order: 2 }
         ]);
         s = await CRMService.getStages(user.tenant_id, pipelineId);
      }
      
      setStages(s);
      
      const stageIds = s.map(stage => stage.id);
      if (stageIds.length > 0) {
        const d = await CRMService.getDeals(user.tenant_id, pipelineId, user?.id, hasPermission('view_all_deals'), stageIds);
        setDeals(d);
      } else {
        setDeals([]);
      }
    } catch (error) {
      console.error('Failed to load pipeline data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDealMove = async (dealId: string, newStageId: string) => {
    if (!user?.tenant_id) return;
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage_id: newStageId } : d));
    try {
      await CRMService.updateDealStage(user.tenant_id, dealId, newStageId);
    } catch (error) {
      console.error('Failed to move deal', error);
      if (activePipeline) loadPipelineData(activePipeline);
    }
  };

  if (authLoading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans relative overflow-hidden">
      {/* Subtle Background Orbs for liveliness */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] rounded-full bg-purple-200/40 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[40%] rounded-full bg-blue-200/30 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Top Navigation - Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/40 px-6 py-4 flex flex-wrap gap-4 justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative z-50">
        <div className="flex items-center gap-4 whitespace-nowrap">
          {pipelines.length > 0 && viewMode !== 'report' && (
            <div>
              <PipelineSelector 
                pipelines={pipelines}
                activeId={activePipeline}
                onChange={setActivePipeline}
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 relative z-20">
          <div className="flex items-center bg-white/50 backdrop-blur-md p-1.5 rounded-xl border border-white/60 shadow-sm">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'kanban' ? 'bg-white shadow-md text-indigo-700 scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/60'
              }`}
            >
              Kanban
            </button>
            {hasPermission('view_all_deals') && (
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    viewMode === 'table' ? 'bg-white shadow-md text-indigo-700 scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/60'
                  }`}
                >
                  Bảng & Lead Mới
                </button>
            )}
            <button
              onClick={() => setViewMode('report')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'report' ? 'bg-white shadow-md text-indigo-700 scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/60'
              }`}
            >
              Báo cáo & KPI
            </button>
            <button
              onClick={() => setViewMode('calculator')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                viewMode === 'calculator' ? 'bg-white shadow-md text-emerald-600 scale-105' : 'text-slate-500 hover:text-emerald-600 hover:bg-white/60'
              }`}
              title="Tính giá dự án"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
              Tính Giá Bán
            </button>
            
            {(templateKey === 'english-center' || templateKey === 'trung_tam_tieng_anh' || templateKey === 'lms') && (
              <>
                <div className="h-4 w-px bg-slate-300 mx-1"></div>
                <button
                  onClick={() => setViewMode('lms_courses')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    viewMode === 'lms_courses' ? 'bg-white shadow-md text-indigo-700 scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/60'
                  }`}
                >
                  Khóa học
                </button>
                <button
                  onClick={() => setViewMode('lms_classes')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    viewMode === 'lms_classes' ? 'bg-white shadow-md text-indigo-700 scale-105' : 'text-slate-500 hover:text-indigo-600 hover:bg-white/60'
                  }`}
                >
                  Lớp học
                </button>
              </>
            )}
          </div>
          
          <button  
            onClick={() => setCreateDealOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Thêm Deal Mới
          </button>
          
          <button
            onClick={() => setViewMode('settings')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-slate-500 hover:text-indigo-600 border border-slate-200'}`}
            title="Cài đặt CRM"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      {/* Filter Bar (Views & Search) */}
      {viewMode !== 'report' && viewMode !== 'settings' && viewMode !== 'calculator' && viewMode !== 'lms_courses' && viewMode !== 'lms_classes' && (
        <div className="px-6 py-3 bg-white/40 border-b border-slate-200 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2">
            <select 
              value={activeView}
              onChange={(e) => setActiveView(e.target.value as any)}
              className="bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            >
              <option value="all">Tất cả Khách hàng</option>
              <option value="vip">Khách VIP (Giá trị {'>'} 50tr)</option>
              <option value="this_month">Khách Mới Tháng Này</option>
            </select>
            <div className="h-4 w-px bg-slate-300 mx-2"></div>
            <button onClick={() => setCmdKOpen(true)} className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>Tìm kiếm nhanh...</span>
              <kbd className="hidden sm:inline-block bg-slate-100 text-slate-400 px-1.5 rounded text-xs ml-2 font-mono">Ctrl K</kbd>
            </button>
          </div>
          
          <div className="flex items-center">
            <input 
              type="text"
              placeholder="Lọc trong bảng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm w-[200px]"
            />
          </div>
        </div>
      )}

      {/* Main Content Area with Split View */}
      <div className="flex-1 overflow-hidden relative flex bg-slate-50">
        {/* Left Side (Board/Table) */}
        <div className={`flex-1 overflow-hidden flex flex-col pt-6 pl-6 pb-6 transition-all duration-300 ${selectedDeal ? 'pr-4' : 'pr-6'}`}>
          {loading && viewMode !== 'report' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-sm z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent shadow-md"></div>
            </div>
          ) : (
            viewMode === 'settings' ? (
              <CRMSettings 
                pipelines={pipelines} 
                onPipelinesChange={(newPipelines) => setPipelines(newPipelines)} 
              />
            ) : viewMode === 'calculator' ? (
              <QuoteCalculator />
            ) : viewMode === 'report' ? (
              <ReportDashboard deals={deals} stages={stages} />
            ) : viewMode === 'lms_courses' ? (
              <CourseManagement />
            ) : viewMode === 'lms_classes' ? (
              <ClassManagement />
            ) : (() => {
              // Apply Filters
              let filteredDeals = deals;
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                filteredDeals = filteredDeals.filter(d => 
                  String(d.title || '').toLowerCase().includes(q) || 
                  String(d.contact?.name || '').toLowerCase().includes(q) ||
                  String(d.contact?.phone || '').includes(q)
                );
              }
              if (activeView === 'vip') {
                filteredDeals = filteredDeals.filter(d => (d.value || 0) > 50000000);
              } else if (activeView === 'this_month') {
                const now = new Date();
                filteredDeals = filteredDeals.filter(d => {
                  const dDate = new Date(d.created_at);
                  return dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
                });
              }

              return viewMode === 'kanban' ? (
                <KanbanBoard 
                  stages={stages} 
                  deals={filteredDeals} 
                  onDealMove={handleDealMove} 
                  onDealClick={setSelectedDeal} 
                />
              ) : (
                <TableBoard 
                  stages={stages} 
                  deals={filteredDeals} 
                  onDealClick={setSelectedDeal} 
                  onRefresh={() => {
                    if (activePipeline) loadPipelineData(activePipeline);
                  }}
                />
              );
            })()
          )}
        </div>

        {/* Right Side (Drawer) */}
        {selectedDeal && (
          <div className="w-[500px] flex-shrink-0 border-l border-slate-200 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)] z-40 h-full overflow-hidden animate-slide-in-right relative">
            <DealDetailModal 
              deal={selectedDeal} 
              stages={stages}
              onClose={() => setSelectedDeal(null)} 
              onRefresh={() => {
                if (activePipeline) loadPipelineData(activePipeline);
              }}
              onDelete={() => {
                if (activePipeline) loadPipelineData(activePipeline);
              }}
            />
          </div>
        )}
      </div>

      {/* Create Deal Modal */}
      {createDealOpen && (
        <CreateDealModal 
          stages={stages}
          onClose={() => setCreateDealOpen(false)}
          onSuccess={() => {
            if (activePipeline) loadPipelineData(activePipeline);
          }}
        />
      )}

      {/* Command Palette Modal */}
      {cmdKOpen && (
        <CommandPalette 
          deals={deals}
          onClose={() => setCmdKOpen(false)}
          onSelect={(deal) => {
            setSelectedDeal(deal);
            setCmdKOpen(false);
          }}
        />
      )}
    </div>
  );
}
