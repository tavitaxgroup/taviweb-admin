import { supabase } from '@/lib/supabase/client';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any = null;
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('status', 'published')
      .single();
      
    if (data) {
      post = data;
    }
  } catch (e) {
    console.error('Lỗi khi tải bài viết:', e);
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Không tìm thấy bài viết!</h1>
        <p className="text-slate-500 mb-8">Bài viết có thể đã bị xóa hoặc đường dẫn không chính xác.</p>
        <Link href="/blog" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 pt-20 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {post.thumbnail_url && (
          <div className="w-full aspect-[21/9] relative overflow-hidden bg-slate-100">
            <img 
              src={post.thumbnail_url} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        
        <div className="p-8 md:p-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Tất cả bài viết
          </Link>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-12 border-b border-slate-100 pb-8">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString('vi-VN')}
          </div>
          
          {/* Nội dung bài viết */}
          <div 
            className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
