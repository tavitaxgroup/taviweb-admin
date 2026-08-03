import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { BookingService, BookingResource } from '../api/booking.service';
import toast from 'react-hot-toast';
import { getBookingConfig } from '../utils/templateConfig';

export default function ResourceManagement({ template }: { template: string }) {
  const { user } = useAuth();
  
  const config = getBookingConfig(template);

  const [resources, setResources] = useState<BookingResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user?.tenant_id, template]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    setLoading(true);
    try {
      const res = await BookingService.getResources(user.tenant_id);
      setResources(res);
    } catch (error) {
      console.error('Failed to load resources', error);
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !user?.tenant_id) return;
    
    setSubmitting(true);
    try {
      await BookingService.createResource(user.tenant_id, {
        name: formData.name,
        type: 'resource',
        role_or_capacity: formData.role,
        status: 'active'
      });
      setIsModalOpen(false);
      setFormData({ name: '', role: '' });
      loadData();
    } catch (err) {
      toast.error('Có lỗi xảy ra khi thêm tài nguyên');
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
            <h2 className="text-xl font-extrabold text-slate-800">Quản lý Tài nguyên</h2>
            <p className="text-sm text-slate-500 font-medium">{config.resourceDescription}</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Thêm {config.resourceLabel} mới
        </button>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder={`Tìm kiếm ${config.resourceLabel}...`} className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64" />
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Lọc theo loại
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
           <div className="p-8 text-center text-slate-500 font-medium">Đang tải dữ liệu...</div>
        ) : resources.length === 0 ? (
           <div className="p-8 text-center text-slate-500 font-medium">Chưa có tài nguyên nào.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold border-b border-slate-200">Tên Tài Nguyên</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Loại / Sức chứa</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200">Trạng thái</th>
                <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resources.map(res => (
                <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{res.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{res.role_or_capacity || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-sm font-bold ${res.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${res.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      {res.status === 'active' ? 'Hoạt động' : 'Tạm nghỉ'}
                    </span>
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
                 Thêm {config.resourceLabel} mới
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                 <Trash2 className="w-5 h-5 hidden" />
                 <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tên {config.resourceLabel} <span className="text-red-500">*</span></label>
                <input required autoFocus type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" placeholder={`VD: ${config.resourcePlaceholder}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Vị trí / Sức chứa</label>
                <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm" placeholder={`VD: ${config.resourceRolePlaceholder}`} />
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
