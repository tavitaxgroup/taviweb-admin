import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CRMService } from '../api/crm.service';
import { CRMPipeline, CRMStage, CRMCustomField } from '../types';
import TenantBillingView from './Settings/TenantBillingView';
import AIChatbotSettings from './Settings/AIChatbotSettings';

interface CRMSettingsProps {
  pipelines: CRMPipeline[];
  onPipelinesChange: (newPipelines: CRMPipeline[]) => void;
}

export default function CRMSettings({ pipelines, onPipelinesChange }: CRMSettingsProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pipelines' | 'fields' | 'billing' | 'ai_chatbot'>('pipelines');
  
  // States cho Pipelines
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('');
  const [stages, setStages] = useState<CRMStage[]>([]);
  const [loadingStages, setLoadingStages] = useState(false);
  
  // States cho Custom Fields
  const [customFields, setCustomFields] = useState<CRMCustomField[]>([]);
  
  useEffect(() => {
    if (pipelines.length > 0 && !selectedPipelineId) {
      setSelectedPipelineId(pipelines[0].id);
    }
  }, [pipelines]);
  
  useEffect(() => {
    if (selectedPipelineId && user?.tenant_id) {
      loadStages(selectedPipelineId);
    }
  }, [selectedPipelineId, user?.tenant_id]);
  
  useEffect(() => {
    if (activeTab === 'fields' && user?.tenant_id) {
      loadCustomFields();
    }
  }, [activeTab, user?.tenant_id]);

  const loadStages = async (pipelineId: string) => {
    if (!user?.tenant_id) return;
    setLoadingStages(true);
    try {
      const data = await CRMService.getStages(user.tenant_id, pipelineId);
      setStages(data);
    } catch (error) {
      console.error('Failed to load stages', error);
    } finally {
      setLoadingStages(false);
    }
  };
  
  const loadCustomFields = async () => {
    if (!user?.tenant_id) return;
    try {
      const data = await CRMService.getCustomFields(user.tenant_id, 'deal');
      setCustomFields(data);
    } catch (error) {
      console.error('Failed to load custom fields', error);
    }
  };

  const handleAddPipeline = async () => {
    const name = prompt('Nhập tên Phễu bán hàng mới:');
    if (!name || !name.trim() || !user?.tenant_id) return;
    
    try {
      const newPipeline = await CRMService.upsertPipeline(user.tenant_id, { name: name.trim() });
      const newPipelines = [...pipelines, newPipeline];
      onPipelinesChange(newPipelines);
      setSelectedPipelineId(newPipeline.id);
    } catch (error) {
      console.error('Failed to create pipeline', error);
      alert('Lỗi tạo phễu');
    }
  };

  const handleAddStage = () => {
    const newStage: CRMStage = {
      id: `s_new_${Date.now()}`,
      pipeline_id: selectedPipelineId,
      name: 'Trạng thái mới',
      color: '#cbd5e1',
      order: stages.length
    } as CRMStage;
    setStages([...stages, newStage]);
  };
  
  const handleSaveStages = async () => {
    if (!user?.tenant_id || !selectedPipelineId) return;
    try {
      setLoadingStages(true);
      await CRMService.upsertStages(user.tenant_id, selectedPipelineId, stages.map((s, i) => ({ ...s, order: i })));
      await loadStages(selectedPipelineId);
      alert('Đã lưu các Trạng thái thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu stages', error);
      alert('Lỗi khi lưu trạng thái');
    } finally {
      setLoadingStages(false);
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 m-6 p-6 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Cài đặt CRM</h2>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <button 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'pipelines' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('pipelines')}
          >
            Phễu & Trạng Thái
          </button>
          <button 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'fields' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('fields')}
          >
            Trường Tùy Chỉnh
          </button>
          <button 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'billing' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('billing')}
          >
            Gói & Hạn Mức
          </button>
          <button 
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === 'ai_chatbot' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('ai_chatbot')}
          >
            Trợ Lý AI
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'pipelines' && (
          <div className="flex gap-8 h-full">
            {/* Cột trái: Quản lý Pipeline */}
            <div className="w-1/3 border-r border-slate-200 pr-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700">Danh sách Phễu (Pipelines)</h3>
                <button onClick={handleAddPipeline} className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 font-semibold transition-colors">+ Thêm mới</button>
              </div>
              <ul className="space-y-2">
                {pipelines.map(p => (
                  <li 
                    key={p.id}
                    onClick={() => setSelectedPipelineId(p.id)}
                    className={`p-3 rounded-lg cursor-pointer font-medium flex justify-between items-center transition-colors border ${
                      selectedPipelineId === p.id 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{p.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedPipelineId === p.id ? 'opacity-100' : 'opacity-0'}><path d="m9 18 6-6-6-6"/></svg>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Cột phải: Quản lý Stages */}
            <div className="w-2/3 pl-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M12 7h.01"/><path d="M7 12h.01"/><path d="M17 12h.01"/><path d="M12 12h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/><path d="M12 17h.01"/></svg>
                  Các bước trong Phễu
                </h3>
                <div className="flex gap-2">
                  <button onClick={handleAddStage} className="text-sm border border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-semibold transition-colors">+ Thêm bước</button>
                  <button onClick={handleSaveStages} disabled={loadingStages} className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 font-semibold transition-colors disabled:opacity-50 flex items-center gap-2">
                    {loadingStages && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                    Lưu Thay đổi
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex gap-3 items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                    {/* Drag Handle Mock */}
                    <div className="cursor-grab text-slate-400 hover:text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                    </div>
                    
                    <input 
                      type="color" 
                      value={stage.color || '#cbd5e1'} 
                      onChange={(e) => {
                        const newStages = [...stages];
                        newStages[index].color = e.target.value;
                        setStages(newStages);
                      }}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    
                    <input 
                      type="text" 
                      value={stage.name} 
                      onChange={(e) => {
                        const newStages = [...stages];
                        newStages[index].name = e.target.value;
                        setStages(newStages);
                      }}
                      className="flex-1 font-semibold text-slate-800 bg-transparent outline-none focus:border-b-2 focus:border-indigo-500 px-2 py-1"
                      placeholder="Tên giai đoạn..."
                    />
                    
                    <button 
                      onClick={() => {
                        if (confirm('Xóa giai đoạn này? Các deals trong đây có thể bị ảnh hưởng.')) {
                          setStages(stages.filter(s => s.id !== stage.id));
                        }
                      }}
                      className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                ))}
                
                {stages.length === 0 && !loadingStages && (
                  <div className="p-8 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                    Chưa có trạng thái nào. Hãy thêm bước mới.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'fields' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Trường Tùy Chỉnh (Custom Fields)</h3>
                <p className="text-sm text-slate-500">Thêm các ô điền dữ liệu phụ cho Khách hàng (VD: Nhu cầu, Ghi chú, Phân loại).</p>
              </div>
              <button 
                onClick={() => {
                  const name = prompt('Tên trường mới:');
                  if (!name || !user?.tenant_id) return;
                  CRMService.upsertCustomField(user.tenant_id, {
                    name, type: 'text', entity_type: 'deal', order_index: customFields.length
                  }).then(() => loadCustomFields());
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-bold shadow-md shadow-indigo-200 transition-colors"
              >
                + Thêm Trường Mới
              </button>
            </div>
            
            <table className="w-full text-left bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold">Tên trường (Label)</th>
                  <th className="p-4 font-semibold">Loại dữ liệu</th>
                  <th className="p-4 font-semibold">Đối tượng</th>
                  <th className="p-4 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customFields.map(field => (
                  <tr key={field.id} className="hover:bg-slate-50">
                    <td className="p-4 font-semibold text-slate-800">{field.name}</td>
                    <td className="p-4 text-slate-600">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">{field.type}</span>
                    </td>
                    <td className="p-4 text-slate-600 capitalize">{field.entity_type}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => {
                          if (confirm('Chắc chắn xóa trường này? Mọi dữ liệu đã nhập ở các deal sẽ bị mất hiển thị.')) {
                            if (user?.tenant_id) {
                              CRMService.deleteCustomField(user.tenant_id, field.id).then(() => loadCustomFields());
                            }
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {customFields.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">Chưa có custom field nào được tạo.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="max-w-5xl mx-auto">
            <TenantBillingView />
          </div>
        )}

        {activeTab === 'ai_chatbot' && (
          <div className="max-w-5xl mx-auto">
            <AIChatbotSettings />
          </div>
        )}
      </div>
    </div>
  );
}
