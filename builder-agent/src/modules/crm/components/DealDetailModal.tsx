import React, { useEffect, useState } from 'react';
import { CRMDeal, CRMActivity, CRMCustomField, CRMStage } from '../types';
import { CRMService } from '../api/crm.service';
import QuoteGenerator from './QuoteGenerator';
import { useAuth } from '../contexts/AuthContext';

interface DealDetailModalProps {
  deal: CRMDeal | null;
  stages?: CRMStage[];
  onClose: () => void;
  onDelete?: (dealId: string) => void;
  onRefresh?: () => void; // Trigger refresh to get updated deal value
}

export default function DealDetailModal({ deal, stages = [], onClose, onDelete, onRefresh }: DealDetailModalProps) {
  const { user } = useAuth();
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [newNote, setNewNote] = useState('');
  const [activityType, setActivityType] = useState<'note' | 'reminder'>('note');
  const [reminderDate, setReminderDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuoteGen, setShowQuoteGen] = useState(false);
  const [customFields, setCustomFields] = useState<CRMCustomField[]>([]);
  const [editingCustomField, setEditingCustomField] = useState<string | null>(null);
  const [customFieldValue, setCustomFieldValue] = useState<string>('');
  
  // Title & Value Edit State
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  
  const [editingValue, setEditingValue] = useState(false);
  const [dealValueNum, setDealValueNum] = useState(0);
  
  // Contact & Stage Edit State
  const [editingContactField, setEditingContactField] = useState<string | null>(null);
  const [contactFieldValue, setContactFieldValue] = useState('');
  const [isChangingStage, setIsChangingStage] = useState(false);
  
  // AI Summary State
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    if (deal) {
      loadActivities();
      loadCustomFields();
    }
  }, [deal]);

  const loadCustomFields = async () => {
    if (!user?.tenant_id) return;
    try {
      const fields = await CRMService.getCustomFields(user.tenant_id, 'deal');
      setCustomFields(fields);
    } catch (error) {
      console.error('Failed to load custom fields', error);
    }
  };

  const fetchAiSummary = async () => {
    if (!deal) return;
    setLoadingAi(true);
    try {
      const res = await fetch(`/api/admin/crm/deals/${deal.id}/ai-summary`);
      if (res.ok) {
        const data = await res.json();
        setAiSummary(data);
      }
    } catch (error) {
      console.error('Failed to fetch AI summary', error);
    } finally {
      setLoadingAi(false);
    }
  };

  const loadActivities = async () => {
    if (!deal || !user?.tenant_id) return;
    try {
      const acts = await CRMService.getActivities(user.tenant_id, deal.id);
      setActivities(acts);
    } catch (error) {
      console.error('Failed to load activities', error);
    }
  };

  const handleAddActivity = async () => {
    if (!newNote.trim() || !deal || !user?.tenant_id) return;
    if (activityType === 'reminder' && !reminderDate) {
       alert("Vui lòng chọn ngày nhắc lịch!");
       return;
    }
    setLoading(true);
    try {
      let content = newNote.trim();
      if (activityType === 'reminder') {
        const d = new Date(reminderDate);
        content = `⏰ NHẮC LỊCH: \${d.toLocaleString('vi-VN')} - \${content}`;
      }
      
      await CRMService.createActivity(user.tenant_id, {
        deal_id: deal.id,
        type: activityType === 'reminder' ? 'note' : activityType,
        content: content
      });
      setNewNote('');
      setActivityType('note');
      setReminderDate('');
      loadActivities();
    } catch (error) {
      console.error('Failed to add activity', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async () => {
    if (!deal || !user?.tenant_id) return;
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa khách hàng này khỏi CRM?');
    if (confirmDelete) {
      try {
        await CRMService.deleteDeal(user.tenant_id, deal.id);
        if (onDelete) {
          onDelete(deal.id);
        }
        onClose();
      } catch (error) {
        console.error('Failed to delete deal', error);
        alert('Có lỗi xảy ra khi xóa khách hàng');
      }
    }
  };

  if (!deal) return null;

  return (
    <>
      <div className="h-full w-full flex flex-col bg-white overflow-hidden">
        {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
            <div>
              {editingTitle ? (
                <input 
                  autoFocus
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  onBlur={async () => {
                    if (titleValue.trim() && titleValue !== deal.title && user?.tenant_id) {
                      await CRMService.updateDeal(user.tenant_id, deal.id, { title: titleValue.trim() });
                      deal.title = titleValue.trim();
                      if (onRefresh) onRefresh();
                    }
                    setEditingTitle(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                  className="text-xl font-extrabold text-slate-800 bg-white border border-indigo-300 rounded px-2 py-0.5 outline-none focus:ring-2 focus:ring-indigo-500 w-[300px]"
                />
              ) : (
                <h2 
                  className="text-xl font-extrabold text-slate-800 cursor-pointer hover:bg-slate-200/50 rounded px-2 py-0.5 -ml-2 transition-colors inline-flex items-center gap-2 group"
                  onClick={() => { setTitleValue(deal.title); setEditingTitle(true); }}
                >
                  {deal.title}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 opacity-0 group-hover:opacity-100"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </h2>
              )}
              
              <div>
                {editingValue ? (
                  <input 
                    autoFocus
                    type="number"
                    value={dealValueNum}
                    onChange={(e) => setDealValueNum(Number(e.target.value))}
                    onBlur={async () => {
                      if (dealValueNum !== deal.value && user?.tenant_id) {
                        await CRMService.updateDeal(user.tenant_id, deal.id, { value: dealValueNum });
                        deal.value = dealValueNum;
                        if (onRefresh) onRefresh();
                      }
                      setEditingValue(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    className="text-sm font-semibold text-emerald-600 bg-white border border-emerald-300 rounded px-2 py-0.5 outline-none focus:ring-2 focus:ring-emerald-500 w-[150px] mt-1"
                  />
                ) : (
                  <div 
                    className="text-sm font-semibold text-emerald-600 mt-1 cursor-pointer hover:bg-emerald-50 rounded px-2 py-0.5 -ml-2 transition-colors inline-flex items-center gap-2 group"
                    onClick={() => { setDealValueNum(deal.value || 0); setEditingValue(true); }}
                  >
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 opacity-0 group-hover:opacity-100"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowQuoteGen(true)}
                className="text-xs px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold rounded-lg transition-colors shadow-sm"
              >
                📝 Lập Báo Giá
              </button>
              <button 
                onClick={handleDeleteDeal}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg transition-colors border border-red-100 shadow-sm"
              >
                🗑️ Xóa
              </button>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 bg-white shadow-sm border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          
          {/* Contact Info */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Thông tin Liên hệ
              </span>
              <span className="text-xs font-normal text-slate-400">Click để sửa</span>
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              {[
                { key: 'name', label: 'Tên liên hệ', value: deal.contact?.name },
                { key: 'phone', label: 'Số điện thoại', value: deal.contact?.phone },
                { key: 'website', label: 'Website', value: deal.contact?.website },
                { key: 'facebook_url', label: 'Facebook', value: deal.contact?.facebook_url },
              ].map(field => (
                <div key={field.key} className="group">
                  <span className="text-slate-400 block text-xs mb-1 font-semibold uppercase tracking-wider">{field.label}</span>
                  {editingContactField === field.key ? (
                    <input
                      autoFocus
                      value={contactFieldValue}
                      onChange={(e) => setContactFieldValue(e.target.value)}
                      onBlur={async () => {
                        if (contactFieldValue !== field.value && user?.tenant_id && deal.contact_id) {
                          await CRMService.updateContact(user.tenant_id, deal.contact_id, { [field.key]: contactFieldValue.trim() });
                          if (deal.contact) {
                            (deal.contact as any)[field.key] = contactFieldValue.trim();
                          }
                          if (onRefresh) onRefresh();
                        }
                        setEditingContactField(null);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                      className="bg-white border border-indigo-300 rounded px-2 py-0.5 outline-none focus:ring-2 focus:ring-indigo-500 w-full font-bold text-slate-800"
                    />
                  ) : (
                    <div 
                      className={`font-bold ${field.key === 'website' || field.key === 'facebook_url' ? 'text-blue-600 hover:underline' : 'text-slate-800'} cursor-pointer hover:bg-slate-100 rounded px-2 py-0.5 -ml-2 transition-colors flex items-center gap-2`}
                      onClick={(e) => { e.preventDefault(); setContactFieldValue(field.value || ''); setEditingContactField(field.key as keyof typeof deal.contact); }}
                    >
                      <span className="truncate">{field.value || '-'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 opacity-0 group-hover:opacity-100 flex-shrink-0"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Stage Box */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><path d="M12 8l0 4l2 2"/></svg>
              Giai đoạn (Stage)
            </h3>
            {isChangingStage ? (
              <select 
                autoFocus
                className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-indigo-500 text-sm font-bold text-slate-800"
                value={deal.stage_id}
                onChange={async (e) => {
                  if (e.target.value !== deal.stage_id && user?.tenant_id) {
                    await CRMService.updateDealStage(user.tenant_id, deal.id, e.target.value);
                    deal.stage_id = e.target.value;
                    if (onRefresh) onRefresh();
                  }
                  setIsChangingStage(false);
                }}
                onBlur={() => setIsChangingStage(false)}
              >
                {stages.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            ) : (
              <div 
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                onClick={() => setIsChangingStage(true)}
              >
                {stages.find(s => s.id === deal.stage_id)?.name || 'Unknown Stage'}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {(customFields.length > 0 || (deal.custom_data && Object.keys(deal.custom_data).length > 0)) && (
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm relative overflow-hidden shrink-0">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <h3 className="text-sm font-bold text-amber-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Dữ liệu Tùy chỉnh (Custom Fields)
              </h3>
              <div className="flex flex-col gap-y-4 text-sm">
                {/* Defined Fields */}
                {customFields.map((field) => {
                  const currentValue = deal.custom_data?.[field.name] || '';
                  return (
                    <div key={field.id} className="group relative">
                      <span className="text-amber-700/70 block text-xs mb-1 font-semibold uppercase tracking-wider">{field.label}</span>
                      
                      {editingCustomField === field.name ? (
                        <div className="flex items-center gap-2">
                          <input 
                            autoFocus
                            type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                            value={customFieldValue}
                            onChange={e => setCustomFieldValue(e.target.value)}
                            onBlur={async () => {
                              if (!user?.tenant_id || !deal) return;
                              const newData = { ...(deal.custom_data || {}), [field.name]: customFieldValue };
                              try {
                                await CRMService.updateDeal(user.tenant_id, deal.id, { custom_data: newData });
                                deal.custom_data = newData;
                                if (onRefresh) onRefresh();
                              } catch (e) {
                                console.error('Failed to save custom field', e);
                              }
                              setEditingCustomField(null);
                            }}
                            className="bg-white border border-amber-300 rounded px-2 py-1 w-full text-sm font-bold text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      ) : (
                        <div 
                          className="font-bold text-amber-900 break-words cursor-pointer hover:bg-amber-100/50 p-1 -ml-1 rounded transition-colors flex items-center gap-2 max-w-full"
                          onClick={() => {
                            setCustomFieldValue(String(currentValue));
                            setEditingCustomField(field.name);
                          }}
                        >
                          <span className="truncate whitespace-normal overflow-hidden max-w-full">{currentValue ? String(currentValue) : <span className="text-amber-700/40 italic">Chưa cập nhật</span>}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Fallback for fields that are not defined in schema but exist in data */}
                {deal.custom_data && Object.keys(deal.custom_data).filter(k => !customFields.some(cf => cf.name === k)).map((key) => {
                  const currentValue = deal.custom_data![key];
                  return (
                    <div key={key} className="group relative">
                      <span className="text-amber-700/70 block text-xs mb-1 font-semibold uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                      
                      {editingCustomField === key ? (
                        <div className="flex items-center gap-2">
                          <input 
                            autoFocus
                            type="text"
                            value={customFieldValue}
                            onChange={e => setCustomFieldValue(e.target.value)}
                            onBlur={async () => {
                              if (!user?.tenant_id || !deal) return;
                              const newData = { ...(deal.custom_data || {}), [key]: customFieldValue };
                              try {
                                await CRMService.updateDeal(user.tenant_id, deal.id, { custom_data: newData });
                                deal.custom_data = newData;
                                if (onRefresh) onRefresh();
                              } catch (e) {
                                console.error('Failed to save custom field', e);
                              }
                              setEditingCustomField(null);
                            }}
                            className="bg-white border border-amber-300 rounded px-2 py-1 w-full text-sm font-bold text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      ) : (
                        <div 
                          className="font-bold text-amber-900 break-words cursor-pointer hover:bg-amber-100/50 p-1 -ml-1 rounded transition-colors flex items-center gap-2 max-w-full"
                          onClick={() => {
                            setCustomFieldValue(String(currentValue));
                            setEditingCustomField(key);
                          }}
                        >
                          <span className="truncate whitespace-normal overflow-hidden max-w-full">{String(currentValue)}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Summary Widget */}
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5 rounded-xl border border-violet-100 shadow-sm relative overflow-hidden shrink-0">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-fuchsia-200/50 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2">
                <span className="text-xl">✨</span> AI Deal Intelligence
              </h3>
              {!aiSummary && !loadingAi && (
                <button 
                  onClick={fetchAiSummary}
                  className="text-xs bg-white text-violet-700 px-3 py-1.5 rounded-lg border border-violet-200 shadow-sm font-bold hover:bg-violet-50 transition-colors flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                  Phân tích Deal
                </button>
              )}
            </div>

            {loadingAi && (
              <div className="flex flex-col items-center justify-center py-6 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs font-medium text-violet-600 animate-pulse">AI đang phân tích lịch sử khách hàng...</span>
              </div>
            )}

            {aiSummary && !loadingAi && (
              <div className="relative z-10">
                <div className="mb-4 text-sm text-slate-800 leading-relaxed bg-white/60 p-4 rounded-lg border border-white/80 break-words whitespace-pre-wrap">
                  <span dangerouslySetInnerHTML={{ __html: aiSummary.summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
                
                {aiSummary.next_steps && aiSummary.next_steps.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider mb-2">Đề xuất hành động:</h4>
                    <ul className="space-y-2">
                      {aiSummary.next_steps.map((step: string, i: number) => (
                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2 bg-white/40 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-500 shrink-0 mt-0.5"><path d="m9 18 6-6-6-6"/></svg>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center border-t border-violet-100/50 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-violet-600">Độ tự tin:</span>
                    <div className="w-24 h-1.5 bg-violet-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500" style={{ width: `${aiSummary.confidence_score}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-fuchsia-700">{aiSummary.confidence_score}%</span>
                  </div>
                  <button onClick={fetchAiSummary} className="text-xs text-violet-500 hover:text-violet-700 font-medium underline">Phân tích lại</button>
                </div>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="shrink-0">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Nhật ký chăm sóc & Nhắc lịch
            </h3>
            
            {/* Add note */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex gap-4 mb-3 border-b border-slate-200 pb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="actType" 
                    checked={activityType === 'note'} 
                    onChange={() => setActivityType('note')} 
                    className="accent-indigo-600"
                  />
                  Ghi chú
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="actType" 
                    checked={activityType === 'reminder'} 
                    onChange={() => setActivityType('reminder')} 
                    className="accent-emerald-600"
                  />
                  Nhắc lịch (Hẹn gọi lại)
                </label>
              </div>

              {activityType === 'reminder' && (
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Thời gian hẹn</label>
                  <input 
                    type="datetime-local" 
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full sm:w-1/2 text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none" 
                  />
                </div>
              )}

              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder={activityType === 'note' ? "Khách nói gì? Khách cần gì?..." : "Nội dung cần làm (VD: Gọi lại báo giá chi tiết)..."}
                className="w-full text-sm rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner mb-3"
                rows={3}
              />
              <div className="flex justify-end">
                <button 
                  onClick={handleAddActivity}
                  disabled={loading || !newNote.trim()}
                  className={`px-5 py-2 text-white text-sm font-bold rounded-lg shadow-sm disabled:opacity-50 transition-all ${
                    activityType === 'note' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {loading ? 'Đang lưu...' : activityType === 'note' ? 'Lưu ghi chú' : 'Tạo nhắc lịch'}
                </button>
              </div>
            </div>

            {/* List activities */}
            <div className="flex flex-col gap-4">
              {activities.length === 0 ? (
                <div className="text-sm text-slate-400 font-medium text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  Khách hàng này chưa có tương tác nào. Hãy liên hệ ngay nhé!
                </div>
              ) : (
                activities.map(act => {
                  const isReminder = act.content.startsWith('⏰ NHẮC LỊCH:');
                  return (
                    <div key={act.id} className={`text-sm border-l-4 rounded-r-lg p-3 ${isReminder ? 'border-emerald-500 bg-emerald-50' : 'border-indigo-400 bg-slate-50'}`}>
                      <div className="text-slate-500 text-xs mb-2 flex justify-between font-semibold">
                        <span className="flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${isReminder ? 'bg-emerald-500' : 'bg-indigo-500'}`}></span>
                          {act.user?.name || 'Nhân viên'}
                        </span>
                        <span>{new Date(act.created_at).toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">{act.content}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {showQuoteGen && (
        <QuoteGenerator 
          deal={deal} 
          onClose={() => setShowQuoteGen(false)} 
          onQuoteCreated={() => {
            setShowQuoteGen(false);
            loadActivities();
            if (onRefresh) onRefresh();
          }} 
        />
      )}
    </>
  );
}
