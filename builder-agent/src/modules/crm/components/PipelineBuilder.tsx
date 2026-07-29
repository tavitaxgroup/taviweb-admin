import React, { useState, useEffect } from 'react';
import { Plus, GripVertical, Settings2, Trash2, Check, X, Palette, Columns, Save, AlertTriangle } from 'lucide-react';
import { CRMService } from '../api/crm.service';
import { CRMPipeline, CRMStage } from '../types';
import toast from 'react-hot-toast';
import PipelineSelector from './PipelineSelector';
import { useAuth } from '../contexts/AuthContext';

interface ExtendedStage extends CRMStage {
  color: string;
}

interface ExtendedPipeline extends CRMPipeline {
  stages: ExtendedStage[];
}

const COLORS = [
  'bg-slate-200 text-slate-800',
  'bg-blue-200 text-blue-800',
  'bg-indigo-200 text-indigo-800',
  'bg-purple-200 text-purple-800',
  'bg-pink-200 text-pink-800',
  'bg-rose-200 text-rose-800',
  'bg-orange-200 text-orange-800',
  'bg-amber-200 text-amber-800',
  'bg-emerald-200 text-emerald-800',
  'bg-cyan-200 text-cyan-800',
  'bg-red-200 text-red-800',
];

export default function PipelineBuilder() {
  const { user } = useAuth();
  const [pipelines, setPipelines] = useState<ExtendedPipeline[]>([]);
  const [activePipelineId, setActivePipelineId] = useState<string>('');
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [stageNameInput, setStageNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user?.tenant_id) {
      loadData();
    }
  }, [user?.tenant_id]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    setIsLoading(true);
    try {
      const pList = await CRMService.getPipelines(user.tenant_id);
      const extendedList: ExtendedPipeline[] = [];
      
      for (const p of pList) {
        const sList = await CRMService.getStages(user.tenant_id, p.id);
        extendedList.push({
          ...p,
          stages: sList.map(s => ({ ...s, color: (s as any).color || COLORS[0] }))
        });
      }

      setPipelines(extendedList);
      if (extendedList.length > 0 && !activePipelineId) {
        setActivePipelineId(extendedList[0].id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const activePipeline = pipelines.find(p => p.id === activePipelineId);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || !activePipeline) return;
    if (draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newStages = [...activePipeline.stages];
    const [draggedItem] = newStages.splice(draggedIndex, 1);
    newStages.splice(targetIndex, 0, draggedItem);

    setPipelines(prev => prev.map(p => p.id === activePipelineId ? { ...p, stages: newStages } : p));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleAddStage = () => {
    if (!activePipeline) return;
    const newStage: ExtendedStage = {
      id: `s_new_${Date.now()}`,
      tenant_id: (user as any)?.tenant_id || '', // or fetch it somehow
      pipeline_id: activePipelineId,
      name: 'Bước mới',
      color: COLORS[0],
      order: activePipeline.stages.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setPipelines(prev => prev.map(p => {
      if (p.id === activePipelineId) {
        return { ...p, stages: [...p.stages, newStage] };
      }
      return p;
    }));
  };

  const handleDeleteStage = (stageId: string) => {
    setPipelines(prev => prev.map(p => {
      if (p.id === activePipelineId) {
        return { ...p, stages: p.stages.filter(s => s.id !== stageId) };
      }
      return p;
    }));
  };

  const handleUpdateStageColor = (stageId: string, color: string) => {
    setPipelines(prev => prev.map(p => {
      if (p.id === activePipelineId) {
        return { 
          ...p, 
          stages: p.stages.map(s => s.id === stageId ? { ...s, color } : s) 
        };
      }
      return p;
    }));
  };

  const startEditStage = (stage: ExtendedStage) => {
    setEditingStageId(stage.id);
    setStageNameInput(stage.name);
  };

  const saveEditStage = () => {
    if (!editingStageId) return;
    setPipelines(prev => prev.map(p => {
      if (p.id === activePipelineId) {
        return { 
          ...p, 
          stages: p.stages.map(s => s.id === editingStageId ? { ...s, name: stageNameInput } : s) 
        };
      }
      return p;
    }));
    setEditingStageId(null);
  };

  const handleAddPipeline = () => {
    const newPipelineId = `p_new_${Date.now()}`;
    const newPipeline: ExtendedPipeline = {
      id: newPipelineId,
      name: 'Pipeline mới',
      created_at: new Date().toISOString(),
      stages: [
        { id: `s_new_${Date.now()}_1`, tenant_id: (user as any)?.tenant_id || '', pipeline_id: newPipelineId, name: 'Tiếp nhận', color: COLORS[0], order: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: `s_new_${Date.now()}_2`, tenant_id: (user as any)?.tenant_id || '', pipeline_id: newPipelineId, name: 'Xử lý', color: COLORS[1], order: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: `s_new_${Date.now()}_3`, tenant_id: (user as any)?.tenant_id || '', pipeline_id: newPipelineId, name: 'Hoàn thành', color: COLORS[8], order: 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ]
    };
    setPipelines([...pipelines, newPipeline]);
    setActivePipelineId(newPipelineId);
  };

  const confirmDeletePipeline = () => {
    if (pipelines.length <= 1) {
      toast.error("Phải có ít nhất 1 quy trình trong hệ thống!");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const executeDeletePipeline = async () => {
    if (!user?.tenant_id) return;
    setShowDeleteConfirm(false);
    if (!activePipelineId.startsWith('p_new_')) {
      try {
        await CRMService.deletePipeline(user.tenant_id, activePipelineId);
      } catch (e) {
        console.error(e);
        toast.error("Lỗi xóa Pipeline. Bạn có quyền admin không?");
        return;
      }
    }
    const newPipelines = pipelines.filter(p => p.id !== activePipelineId);
    setPipelines(newPipelines);
    setActivePipelineId(newPipelines[0].id);
    toast.success("Đã xóa quy trình!");
  };

  const handleSave = async () => {
    if (!activePipeline || !user?.tenant_id) return;
    setIsSaving(true);
    try {
      // 1. Lưu Pipeline trước (nếu là pipeline mới thì insert)
      let finalPipelineId = activePipelineId;
      if (activePipelineId.startsWith('p_new_')) {
        const savedPipeline = await CRMService.upsertPipeline(user.tenant_id, { name: activePipeline.name });
        finalPipelineId = savedPipeline.id;
        
        // Cập nhật lại state với ID thật
        setPipelines(prev => prev.map(p => p.id === activePipelineId ? { ...p, id: finalPipelineId } : p));
        setActivePipelineId(finalPipelineId);
      } else {
        await CRMService.upsertPipeline(user.tenant_id, { id: activePipelineId, name: activePipeline.name });
      }

      // 2. Cập nhật thứ tự stages
      const stagesToSave = activePipeline.stages.map((s, idx) => ({ ...s, order: idx }));
      await CRMService.upsertStages(user.tenant_id, finalPipelineId, stagesToSave);
      
      toast.success("Đã lưu quy trình thành công!");
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lưu! Hãy kiểm tra kết nối Database.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="h-full flex items-center justify-center text-slate-500 font-bold">Đang tải dữ liệu quy trình...</div>;
  }

  if (!activePipeline) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <div>
              <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                 <Settings2 className="w-6 h-6 text-indigo-600" /> Tùy chỉnh Quy trình & Bảng dữ liệu
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Cấu hình các bước (Stages) và các luồng công việc (Pipelines) theo nhu cầu doanh nghiệp.</p>
           </div>
           
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center group/selector relative z-50">
                 <PipelineSelector 
                   pipelines={pipelines}
                   activeId={activePipelineId}
                   onChange={setActivePipelineId}
                   className="w-[280px]"
                 />
                 <button onClick={confirmDeletePipeline} title="Xóa quy trình này" className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 bg-white border border-slate-200 rounded-full shadow-md text-red-400 hover:text-red-600 transition-all opacity-0 group-hover/selector:opacity-100 hover:scale-110 z-10">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
              
              <button onClick={handleAddPipeline} title="Tạo quy trình mới" className="bg-slate-100 text-slate-600 hover:bg-slate-200 p-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center border border-transparent hover:border-slate-300">
                 <Plus className="w-5 h-5" />
              </button>

              <button disabled={isSaving} onClick={handleSave} className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap ml-2">
                 <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} /> {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
           </div>
        </div>

        <div className="flex flex-col gap-8 mt-2">
           {/* Stage Builder */}
           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2"><Columns className="w-5 h-5 text-indigo-500"/> Thiết lập Quy trình</h3>
                 <button onClick={handleAddStage} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                   <Plus className="w-4 h-4" /> Thêm bước
                 </button>
              </div>
              
              <div className="p-5 space-y-4 bg-slate-50/50 min-h-[300px] rounded-b-3xl pb-24">
                 
                 {/* Sửa tên quy trình */}
                 <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tên Quy Trình</label>
                   <input 
                     type="text" 
                     value={activePipeline.name}
                     onChange={(e) => setPipelines(prev => prev.map(p => p.id === activePipelineId ? { ...p, name: e.target.value } : p))}
                     className="w-full font-bold text-slate-800 border-b-2 border-transparent hover:border-slate-200 focus:border-indigo-500 outline-none transition-colors px-1 py-1"
                     placeholder="Nhập tên quy trình..."
                   />
                 </div>

                 <div className="h-px bg-slate-200 my-4" />

                 {activePipeline.stages.map((stage, index) => (
                    <div 
                       key={stage.id} 
                       draggable
                       onDragStart={(e) => handleDragStart(e, index)}
                       onDragOver={(e) => handleDragOver(e, index)}
                       onDragLeave={(e) => handleDragLeave(e, index)}
                       onDrop={(e) => handleDrop(e, index)}
                       onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                       className={`bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm group hover:border-indigo-300 transition-all relative hover:z-50 cursor-grab active:cursor-grabbing 
                          ${draggedIndex === index ? 'opacity-40 scale-95 ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/30' : ''}
                          ${dragOverIndex === index && draggedIndex !== index ? 'border-t-4 border-t-indigo-500 mt-6 shadow-lg transform -translate-y-1' : ''}
                       `}
                    >
                       <GripVertical className="w-6 h-6 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />

                       {/* Color Picker Box */}
                       <div className="relative group/color z-20">
                          <div className={`w-10 h-10 rounded-xl cursor-pointer ${stage.color} border border-black/10 flex items-center justify-center shadow-inner hover:brightness-95 transition-all`}>
                             <Palette className="w-5 h-5 opacity-60" />
                          </div>
                          
                          <div className="absolute top-full left-0 pt-2 hidden group-hover/color:block z-30">
                             <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-3 grid grid-cols-4 gap-2 w-48">
                                {COLORS.map(c => (
                                   <button 
                                      key={c} 
                                      onClick={() => handleUpdateStageColor(stage.id, c)}
                                      className={`w-8 h-8 rounded-lg ${c} border border-black/10 hover:scale-110 transition-transform ${stage.color === c ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                                   />
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="flex-1 overflow-hidden">
                          {editingStageId === stage.id ? (
                             <div className="flex items-center gap-2">
                                <input 
                                   type="text" 
                                   autoFocus
                                   value={stageNameInput}
                                   onChange={e => setStageNameInput(e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && saveEditStage()}
                                   className="flex-1 font-bold text-slate-800 border-b-2 border-indigo-500 px-2 py-1 outline-none bg-indigo-50/50 w-full"
                                />
                                <button onClick={saveEditStage} className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg"><Check className="w-5 h-5"/></button>
                                <button onClick={() => setEditingStageId(null)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg"><X className="w-5 h-5"/></button>
                             </div>
                          ) : (
                             <div className="flex items-center justify-between">
                                <div 
                                   className="font-bold text-slate-800 text-lg cursor-pointer hover:text-indigo-600 transition-colors truncate"
                                   onClick={() => startEditStage(stage)}
                                >
                                   {stage.name}
                                </div>
                                <button onClick={() => handleDeleteStage(stage.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                                   <Trash2 className="w-5 h-5" />
                                </button>
                             </div>
                          )}
                          <p className="text-xs text-slate-400 font-medium mt-1">Stage Order: {index + 1}</p>
                       </div>
                    </div>
                 ))}
                 {activePipeline.stages.length === 0 && (
                    <div className="text-center py-10 text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-2xl">
                       Chưa có bước nào trong quy trình này.
                    </div>
                 )}
              </div>
           </div>

           {/* Preview KanBan */}
           <div className="bg-slate-100 rounded-3xl border border-slate-200 p-6 flex flex-col shadow-inner overflow-hidden sticky top-6">
              <h3 className="font-bold text-slate-500 flex items-center gap-2 mb-6"><Settings2 className="w-5 h-5"/> Xem trước Kanban (Preview)</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                 {activePipeline.stages.map(stage => (
                    <div key={stage.id} className="w-64 shrink-0 flex flex-col gap-3 opacity-90 pointer-events-none">
                       <div className={`px-4 py-3 rounded-xl font-bold text-sm ${stage.color} flex justify-between items-center shadow-sm`}>
                          <span className="truncate">{stage.name}</span>
                          <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs shrink-0">0</span>
                       </div>
                       <div className="bg-white/80 rounded-xl h-32 border-2 border-dashed border-slate-300 flex items-center justify-center">
                          <span className="text-xs text-slate-400 font-medium">Kéo thả deal vào đây</span>
                       </div>
                    </div>
                 ))}
                 {activePipeline.stages.length === 0 && (
                    <div className="flex-1 h-32 flex items-center justify-center text-slate-400 font-medium text-sm">
                       Thêm bước bên trái để xem trước.
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-2">Xóa quy trình?</h3>
              <p className="text-slate-500 font-medium text-sm">
                Bạn có chắc chắn muốn xóa quy trình <span className="text-slate-800 font-bold">"{activePipeline?.name}"</span> không?
                Thao tác này sẽ xóa vĩnh viễn trên cơ sở dữ liệu.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={executeDeletePipeline}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
