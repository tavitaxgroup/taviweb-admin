import React, { useState, useEffect } from 'react';
import { CRMCourse } from '../types';
import { LMSService } from '../api/lms.service';
import { useAuth } from '../contexts/AuthContext';

export default function CourseManagement() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CRMCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CRMCourse>>({ name: '', description: '', price: 0, status: 'active' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.tenant_id) loadCourses();
  }, [user]);

  const loadCourses = async () => {
    if (!user?.tenant_id) return;
    try {
      setLoading(true);
      const data = await LMSService.getCourses(user.tenant_id);
      setCourses(data);
    } catch (error: any) {
      console.error('Lỗi khi tải khoá học:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.tenant_id || !formData.name) return;
    try {
      await LMSService.upsertCourse(user.tenant_id, {
        id: editingId || undefined,
        ...formData
      });
      setIsModalOpen(false);
      loadCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (course: CRMCourse) => {
    setFormData({ name: course.name, description: course.description, price: course.price, status: course.status });
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ name: '', description: '', price: 0, status: 'active' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col animate-fade-in mx-6 my-6">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý Khóa học</h2>
          <p className="text-sm text-slate-500">Thiết lập các khóa học và học phí của trung tâm.</p>
        </div>
        <button onClick={openNew} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          + Thêm Khóa Học Mới
        </button>
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
        {loading ? (
          <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group relative bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{course.name}</h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${course.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{course.description || 'Chưa có mô tả'}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="font-bold text-indigo-700">{formatCurrency(course.price)}</span>
                  <button onClick={() => openEdit(course)} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                Chưa có khóa học nào. Hãy tạo khóa học đầu tiên!
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingId ? 'Sửa Khóa Học' : 'Tạo Khóa Học Mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tên khóa học *</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="VD: IELTS Intensive" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-20" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Mục tiêu đầu ra..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Học phí (VNĐ)</label>
                <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
                <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                  <option value="active">Đang mở (Active)</option>
                  <option value="draft">Bản nháp (Draft)</option>
                  <option value="archived">Lưu trữ (Archived)</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={!formData.name} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors">
                {editingId ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
