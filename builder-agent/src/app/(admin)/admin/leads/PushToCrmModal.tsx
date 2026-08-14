import React, { useState, useEffect } from 'react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';

interface PushToCrmModalProps {
  leads: any[];
  onClose: () => void;
  onConfirm: (pipelineId: string, stageId: string, assigneeId?: string) => void;
}

export default function PushToCrmModal({ leads, onClose, onConfirm }: PushToCrmModalProps) {
  const { user } = useAuth();
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('');
  const [selectedStageId, setSelectedStageId] = useState<string>('');
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>(user?.id || '');
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user?.tenant_id) return;
      try {
        const { CRMService } = await import('@/modules/crm/api/crm.service');
        const p = await CRMService.getPipelines(user.tenant_id);
        const u = await CRMService.getUsers(user.tenant_id);
        
        setPipelines(p);
        setUsers(u);
        
        if (p.length > 0) {
          setSelectedPipelineId(p[0].id);
        }
      } catch (error) {
        console.error("Failed to load data for Push CRM modal", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user?.tenant_id]);

  useEffect(() => {
    async function loadStages() {
      if (!selectedPipelineId || !user?.tenant_id) {
        setStages([]);
        setSelectedStageId('');
        return;
      }
      try {
        const { CRMService } = await import('@/modules/crm/api/crm.service');
        const s = await CRMService.getStages(user.tenant_id, selectedPipelineId);
        setStages(s);
        if (s.length > 0) {
          setSelectedStageId(s[0].id);
        } else {
          setSelectedStageId('');
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadStages();
  }, [selectedPipelineId, user?.tenant_id]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full animate-in zoom-in-95 duration-200">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Đẩy sang CRM</h2>
        <p className="text-slate-500 text-sm mb-6">
          Chọn quy trình và nhân viên phụ trách cho 
          <span className="font-bold text-slate-800">
            {leads.length === 1 ? ` Lead: ${leads[0].name}` : ` ${leads.length} Leads`}
          </span>
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Quy trình (Pipeline)</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm"
              value={selectedPipelineId}
              onChange={(e) => setSelectedPipelineId(e.target.value)}
            >
              {pipelines.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Giai đoạn (Stage)</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm"
              value={selectedStageId}
              onChange={(e) => setSelectedStageId(e.target.value)}
              disabled={stages.length === 0}
            >
              {stages.length === 0 && <option value="">Không có giai đoạn nào</option>}
              {stages.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {user?.role === 'admin' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Người phụ trách (Assignee)</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-sm"
                value={selectedAssigneeId}
                onChange={(e) => setSelectedAssigneeId(e.target.value)}
              >
                <option value="">-- Chọn ngẫu nhiên --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role_data?.name || u.role})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={() => onConfirm(selectedPipelineId, selectedStageId, selectedAssigneeId)}
            disabled={!selectedPipelineId || !selectedStageId}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            Đẩy sang CRM
          </button>
        </div>
      </div>
    </div>
  );
}
