import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Calendar, FileText, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts: any[] = [];
  
  try {
    // Chỉ lấy các bài viết đã xuất bản
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    if (data) posts = data;
  } catch (e) {
    console.error('Lỗi khi tải bài viết:', e);
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Blog & Tin tức
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Cập nhật những kiến thức, tin tức mới nhất từ chuyên gia.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  {post.thumbnail_url ? (
                    <img 
                      src={post.thumbnail_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <FileText className="w-12 h-12" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
                    Đọc tiếp <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Chưa có bài viết nào</h2>
            <p className="text-slate-500">Các bài viết mới sẽ sớm được cập nhật tại đây.</p>
          </div>
        )}
      </div>
    </div>
  );
}
