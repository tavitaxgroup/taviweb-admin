import React, { useState } from 'react';
import { CRMService } from '../api/crm.service';
import { useAuth } from '../contexts/AuthContext';
import { CRMStage } from '../types';

interface CreateDealModalProps {
  stages: CRMStage[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateDealModal({ stages, onClose, onSuccess }: CreateDealModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage_id: stages[0]?.id || '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.tenant_id) return;
    
    try {
      setLoading(true);
      await CRMService.createDealAndContact(
        user.tenant_id,
        {
          name: formData.contact_name,
          phone: formData.contact_phone,
          email: formData.contact_email
        },
        {
          title: formData.title,
          value: Number(formData.value) || 0,
          stage_id: formData.stage_id
        }
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create deal', error);
      alert('Có lỗi xảy ra khi tạo deal mới');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Tạo Khách Hàng / Deal Mới</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tên Deal (Cơ hội) *</label>
              <input 
                required
                autoFocus
                placeholder="VD: Thiết kế website công ty ABC"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Giá trị dự kiến (VNĐ)</label>
                <input 
                  type="number"
                  placeholder="VD: 50000000"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.value}
                  onChange={e => setFormData({...formData, value: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Giai đoạn</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={formData.stage_id}
                  onChange={e => setFormData({...formData, stage_id: e.target.value})}
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Thông tin Khách hàng
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tên khách hàng *</label>
                  <input 
                    required
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.contact_name}
                    onChange={e => setFormData({...formData, contact_name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Số điện thoại</label>
                    <input 
                      placeholder="VD: 0987654321"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.contact_phone}
                      onChange={e => setFormData({...formData, contact_phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                    <input 
                      type="email"
                      placeholder="VD: email@example.com"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.contact_email}
                      onChange={e => setFormData({...formData, contact_email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              )}
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
