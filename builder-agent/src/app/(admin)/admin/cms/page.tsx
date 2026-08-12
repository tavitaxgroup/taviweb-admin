import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export const dynamic = 'force-dynamic';

export default async function CMSPage() {
  let posts: any[] = [];
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('tenant_id', decoded.tenant_id)
        .order('created_at', { ascending: false });
        
      if (data) {
        posts = data;
      }
    }
  } catch (e) {
    console.error('Error loading posts:', e);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            Quản lý Bài viết (CMS)
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Tạo và quản lý các bài viết trên website của bạn.</p>
        </div>
        <Link 
          href="/admin/cms/editor/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200"
        >
          <Plus className="w-5 h-5" />
          Bài viết mới
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 pl-6">Tiêu đề</th>
                <th className="p-4">Đường dẫn (Slug)</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Ngày tạo</th>
                <th className="p-4 text-right pr-6">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-medium text-slate-900">{post.title}</td>
                    <td className="p-4 text-slate-500">{post.slug}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        post.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">
                      {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/cms/editor/${post.id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Sửa bài viết"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa bài viết"
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
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium text-slate-500">Chưa có bài viết nào.</p>
                    <p className="text-sm mt-1">Hãy tạo bài viết đầu tiên cho website của bạn.</p>
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
