import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { BookingService, BookingServiceItem } from '../api/booking.service';
import toast from 'react-hot-toast';
import { getBookingConfig } from '../utils/templateConfig';

export default function ServiceManagement({ template }: { template: string }) {
  const { user } = useAuth();
  const config = getBookingConfig(template);

  const [services, setServices] = useState<BookingServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.tenant_id, template]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    setLoading(true);
    try {
      const svcs = await BookingService.getServices(user.tenant_id);
      setServices(svcs);
    } catch (error) {
      console.error('Failed to load services', error);
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !user?.tenant_id) return;
    
    setSubmitting(true);
    const price = parseInt(formData.price || '0', 10);
    const duration = parseInt(formData.duration || '60', 10);
    
    try {
      await BookingService.createService(user.tenant_id, {
        name: formData.name,
        price: isNaN(price) ? 0 : price,
        duration_minutes: isNaN(duration) ? 60 : duration,
      });
      setIsModalOpen(false);
      setFormData({ name: '', price: '', duration: '' });
      loadData();
    } catch (err) {
      toast.error('Có lỗi xảy ra khi thêm dịch vụ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full animate-in fade-in duration-500 relative">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl shadow-inner border flex items-center justify-center ${config.color}`}>
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Quản lý Dịch vụ</h2>
            <p className="text-sm text-slate-500 font-medium">{config.serviceDescription}</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Thêm {config.serviceLabel} mới
        </button>
      </div>

      <div className="px-6 py-4 flex items-center border-b border-slate-100">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Tìm kiếm dịch vụ..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
           <div className="p-8 text-center text-slate-500 font-medium">Đang tải dữ liệu...</div>
        ) : services.length === 0 ? (
           <div className="p-8 text-center text-slate-500 font-medium">Chưa có dịch vụ nào.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold border-b border-slate-200">Tên Dịch vụ</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Thời lượng ước tính</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Đơn giá (VNĐ)</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map(svc => (
                <tr key={svc.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{svc.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{svc.duration_minutes} Phút</td>
                  <td className="px-6 py-4 font-bold text-emerald-600 bg-emerald-50/30">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(svc.price)}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                 <div className={`p-1.5 rounded-lg border ${config.color}`}>
                   {config.smallIcon}
                 </div>
                 Thêm {config.serviceLabel} mới
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                 <Trash2 className="w-5 h-5 hidden" />
                 <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tên {config.serviceLabel} <span className="text-red-500">*</span></label>
                <input required autoFocus type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" placeholder={`VD: ${config.servicePlaceholder}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Đơn giá (VNĐ)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" placeholder={`VD: 100000`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Thời gian thực hiện (Phút)</label>
                <input type="number" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" placeholder={`VD: 60`} />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Hủy</button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50">
                  {submitting ? 'Đang lưu...' : 'Lưu lại'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
