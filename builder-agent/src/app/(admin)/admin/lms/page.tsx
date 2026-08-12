import { BookOpen, Plus, Edit, Trash2, Users } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export const dynamic = 'force-dynamic';

export default async function LMSPage() {
  let courses: any[] = [];
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const { data } = await supabase
        .from('courses')
        .select(`
          *,
          enrollments (count)
        `)
        .eq('tenant_id', decoded.tenant_id)
        .order('created_at', { ascending: false });
        
      if (data) {
        courses = data;
      }
    }
  } catch (e) {
    console.error('Error loading courses:', e);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            Quản lý Khóa học (LMS)
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Tạo và quản lý các khóa học, bài giảng cho trung tâm.</p>
        </div>
        <Link 
          href="/admin/lms/courses/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200"
        >
          <Plus className="w-5 h-5" />
          Khóa học mới
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">Khóa học</th>
                <th className="p-4">Học phí</th>
                <th className="p-4">Học viên</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right pr-6">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                          {course.thumbnail_url ? (
                            <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{course.title}</p>
                          <p className="text-xs text-slate-500">{course.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      {course.price > 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price) : 'Miễn phí'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">{course.enrollments?.[0]?.count || 0}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        course.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {course.status === 'published' ? 'Đang mở' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/lms/courses/${course.id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Sửa khóa học & Nội dung"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa khóa học"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium text-slate-500">Chưa có khóa học nào.</p>
                    <p className="text-sm mt-1">Bấm "Khóa học mới" để tạo bài giảng đầu tiên.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
