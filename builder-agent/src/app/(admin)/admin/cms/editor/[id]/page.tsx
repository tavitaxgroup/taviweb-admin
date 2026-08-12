'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import TiptapEditor from '@/components/cms/TiptapEditor';

export default function CMSEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === 'new';
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!isNew) {
      loadPost();
    }
  }, [params.id]);

  const loadPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (data) {
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setContent(data.content || '');
        setThumbnailUrl(data.thumbnail_url || '');
        setStatus(data.status || 'draft');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isNew) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title || !slug) {
      alert('Vui lòng nhập Tiêu đề và Slug hợp lệ!');
      return;
    }
    
    setIsSaving(true);
    try {
      // Decode JWT for tenant_id (In real app, we should do this via API, but for MVP client-side is fine if RLS allows)
      const token = document.cookie.split('; ').find(row => row.startsWith('crm_token='))?.split('=')[1];
      if (!token) throw new Error('Not authenticated');
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const postData = {
        title,
        slug,
        content,
        thumbnail_url: thumbnailUrl,
        status,
        tenant_id: payload.tenant_id
      };
      
      if (isNew) {
        const { error } = await supabase.from('posts').insert([postData]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('posts').update(postData).eq('id', params.id);
        if (error) throw error;
      }
      
      router.push('/admin/cms');
      router.refresh();
    } catch (e: any) {
      console.error(e);
      alert('Lỗi khi lưu bài viết: ' + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/cms" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">
            {isNew ? 'Viết bài mới' : 'Chỉnh sửa bài viết'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 font-medium text-slate-700"
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu bài viết
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Tiêu đề bài viết</label>
            <input 
              type="text" 
              value={title}
              onChange={handleTitleChange}
              placeholder="Nhập tiêu đề..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-lg font-medium placeholder:text-slate-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nội dung (Word-like Editor)</label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2">Đường dẫn (Slug)</label>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm font-mono text-slate-600"
            />
            <p className="text-xs text-slate-400 mt-2">Đường dẫn hiển thị trên thanh địa chỉ URL.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2">Ảnh bìa (Thumbnail)</label>
            {thumbnailUrl ? (
              <div className="relative mb-3 rounded-lg overflow-hidden border border-slate-200">
                <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-auto object-cover" />
                <button onClick={() => setThumbnailUrl('')} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md text-xs font-bold shadow">Xóa ảnh</button>
              </div>
            ) : (
              <div className="h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center mb-3">
                <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                <span className="text-sm text-slate-400">Chưa có ảnh bìa</span>
              </div>
            )}
            <input 
              type="text" 
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Dán URL hình ảnh vào đây..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
