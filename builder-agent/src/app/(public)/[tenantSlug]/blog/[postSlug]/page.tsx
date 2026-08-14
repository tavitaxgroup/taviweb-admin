import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

type Props = {
  params: { tenantSlug: string; postSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) return { title: 'Not Found' };

  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('tenant_id', tenant.id)
    .eq('slug', resolvedParams.postSlug)
    .eq('status', 'published')
    .single();

  if (!post) return { title: 'Not Found' };

  // Generate description from content
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

  return {
    title: `${post.title} | ${tenant.name}`,
    description: post.content ? stripHtml(post.content) : '',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) notFound();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('slug', resolvedParams.postSlug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Article Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <Link 
            href={`/${resolvedParams.tenantSlug}/blog`}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách bài viết
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                {tenant.name.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-slate-700">Đăng bởi <span className="font-bold">Quản trị viên</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>

      {/* Article Thumbnail */}
      {post.thumbnail_url && (
        <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-12">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
            <img 
              src={post.thumbnail_url} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 mt-12">
        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </article>
        
        {/* Footer tags / info */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900">Chia sẻ bài viết này</h3>
            <div className="flex gap-2">
              {['Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                <button key={platform} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors shadow-sm">
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
