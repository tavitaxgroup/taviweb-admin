'use client';

import { Edit, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function PostActions({ postId, tenantSlug, postSlug }: { postId: string, tenantSlug: string, postSlug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
    
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) throw error;
      toast.success('Đã xóa bài viết!');
      router.refresh();
    } catch (err: any) {
      toast.error('Lỗi khi xóa: ' + err.message);
    }
  };

  return (
    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <a 
        href={`/${tenantSlug}/blog/${postSlug}`}
        target="_blank"
        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        title="Xem bài viết"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
      <Link 
        href={`/admin/cms/editor/${postId}`}
        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        title="Sửa bài viết"
      >
        <Edit className="w-4 h-4" />
      </Link>
      <button 
        onClick={handleDelete}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Xóa bài viết"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
