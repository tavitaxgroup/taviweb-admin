import React, { useState, useEffect } from 'react';
import { Save, Clock } from 'lucide-react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { BookingService } from '../api/booking.service';

export default function BookingSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    opening_time: '08:00',
    closing_time: '21:00'
  });

  useEffect(() => {
    if (user?.tenant_id) {
      loadSettings();
    }
  }, [user?.tenant_id]);

  const loadSettings = async () => {
    if (!user?.tenant_id) return;
    try {
      const data = await BookingService.getSettings(user.tenant_id);
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.tenant_id) return;
    
    setSaving(true);
    try {
      await BookingService.updateSettings(user.tenant_id, settings);
      alert('Đã lưu cấu hình thành công!');
    } catch (error) {
      alert('Lỗi khi lưu cấu hình.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Đang tải cài đặt...</div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto mt-8">
      <div className="bg-slate-50 border-b border-slate-200 px-8 py-6 flex items-center gap-4">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl shadow-inner border border-indigo-200">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Giờ hoạt động</h2>
          <p className="text-sm text-slate-500 font-medium">Tùy chỉnh khung giờ hiển thị trên lịch đặt hẹn</p>
        </div>
      </div>
      
      <form onSubmit={handleSave} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Giờ mở cửa <span className="text-red-500">*</span></label>
            <input 
              type="time" 
              required
              value={settings.opening_time} 
              onChange={e => setSettings({...settings, opening_time: e.target.value})} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" 
            />
            <p className="text-xs text-slate-400">Thời gian bắt đầu nhận khách trong ngày.</p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Giờ đóng cửa <span className="text-red-500">*</span></label>
            <input 
              type="time" 
              required
              value={settings.closing_time} 
              onChange={e => setSettings({...settings, closing_time: e.target.value})} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" 
            />
            <p className="text-xs text-slate-400">Thời gian kết thúc nhận khách trong ngày.</p>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-6 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
          </button>
        </div>
      </form>
    </div>
  );
}
