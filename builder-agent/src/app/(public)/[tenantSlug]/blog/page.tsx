import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogListPage({ params }: { params: { tenantSlug: string } }) {
  const resolvedParams = await params;
  
  // 1. Lấy thông tin Tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name, theme_config')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) {
    notFound();
  }

  // 2. Lấy danh sách bài viết public
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, thumbnail_url, created_at, content')
    .eq('tenant_id', tenant.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Render HTML stripped preview
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header đơn giản */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Tin tức & Kiến thức
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất và chia sẻ kiến thức chuyên môn từ {tenant.name}.
          </p>
        </div>
      </div>

      {/* Grid bài viết */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {(!posts || posts.length === 0) ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Chưa có bài viết nào</h3>
            <p className="text-slate-500 mt-2">Nội dung đang được chúng tôi cập nhật. Vui lòng quay lại sau!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/${resolvedParams.tenantSlug}/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                  {post.thumbnail_url ? (
                    <img 
                      src={post.thumbnail_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center">
                      <span className="text-indigo-200 font-bold text-xl">{tenant.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                    Mới nhất
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Quản trị viên
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {post.content ? stripHtml(post.content) : 'Nhấn vào để xem chi tiết bài viết...'}
                  </p>
                  
                  <div className="flex items-center font-bold text-indigo-600 text-sm group-hover:translate-x-1 transition-transform">
                    Đọc tiếp <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
