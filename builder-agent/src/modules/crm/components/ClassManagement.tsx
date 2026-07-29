import React, { useState, useEffect } from 'react';
import { CRMClass, CRMCourse } from '../types';
import { LMSService } from '../api/lms.service';
import { useAuth } from '../contexts/AuthContext';

export default function ClassManagement() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<CRMClass[]>([]);
  const [courses, setCourses] = useState<CRMCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CRMClass>>({ name: '', course_id: '', schedule_desc: '', google_meet_link: '', status: 'upcoming' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.tenant_id) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    try {
      setLoading(true);
      const [clsData, crsData] = await Promise.all([
        LMSService.getClasses(user.tenant_id),
        LMSService.getCourses(user.tenant_id)
      ]);
      setClasses(clsData);
      setCourses(crsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.tenant_id || !formData.name || !formData.course_id) return;
    try {
      await LMSService.upsertClass(user.tenant_id, {
        id: editingId || undefined,
        ...formData
      });
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const openEdit = (cls: CRMClass) => {
    setFormData({ 
      name: cls.name, 
      course_id: cls.course_id, 
      schedule_desc: cls.schedule_desc, 
      google_meet_link: cls.google_meet_link,
      status: cls.status,
      start_date: cls.start_date,
      end_date: cls.end_date
    });
    setEditingId(cls.id);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setFormData({ name: '', course_id: courses[0]?.id || '', schedule_desc: '', google_meet_link: '', status: 'upcoming' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col animate-fade-in mx-6 my-6">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý Lớp học</h2>
          <p className="text-sm text-slate-500">Sắp xếp lịch học, phân công giáo viên và quản lý link Google Meet.</p>
        </div>
        <button onClick={openNew} disabled={courses.length === 0} className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors">
          + Mở Lớp Mới
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
              <th className="p-4 pl-6">Tên lớp</th>
              <th className="p-4">Khóa học</th>
              <th className="p-4">Lịch học</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right pr-6">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              <tr><td colSpan={5} className="p-12 text-center"><div className="inline-block animate-spin h-6 w-6 border-4 border-indigo-600 border-t-transparent rounded-full"></div></td></tr>
            ) : classes.length === 0 ? (
              <tr><td colSpan={5} className="p-12 text-center text-slate-500">Chưa có lớp học nào được mở.</td></tr>
            ) : (
              classes.map(cls => (
                <tr key={cls.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-slate-800">{cls.name}</div>
                    {cls.google_meet_link && (
                      <a href={cls.google_meet_link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>
                        Meet Link
                      </a>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {cls.course?.name || '---'}
                  </td>
                  <td className="p-4 text-slate-600">
                    {cls.schedule_desc || 'Chưa xếp lịch'}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                      cls.status === 'ongoing' ? 'bg-indigo-100 text-indigo-700' :
                      cls.status === 'upcoming' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {cls.status === 'ongoing' ? 'Đang diễn ra' : cls.status === 'upcoming' ? 'Sắp khai giảng' : 'Đã kết thúc'}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button onClick={() => openEdit(cls)} className="text-indigo-600 font-semibold hover:text-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingId ? 'Sửa Lớp Học' : 'Mở Lớp Học Mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tên lớp *</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="VD: IELTS-K99" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Thuộc khóa học *</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.course_id} onChange={e => setFormData({ ...formData, course_id: e.target.value })}>
                    <option value="" disabled>-- Chọn khóa học --</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Lịch học</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.schedule_desc} onChange={e => setFormData({ ...formData, schedule_desc: e.target.value })} placeholder="VD: Tối 2-4-6 (19:00 - 21:00)" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Link Google Meet / Zoom</label>
                  <input type="url" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.google_meet_link} onChange={e => setFormData({ ...formData, google_meet_link: e.target.value })} placeholder="https://meet.google.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Ngày khai giảng</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.start_date || ''} onChange={e => setFormData({ ...formData, start_date: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                    <option value="upcoming">Sắp khai giảng</option>
                    <option value="ongoing">Đang diễn ra</option>
                    <option value="completed">Đã kết thúc</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={!formData.name || !formData.course_id} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors">
                {editingId ? 'Cập nhật' : 'Mở lớp'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
