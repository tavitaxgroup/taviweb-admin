'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Sparkles, X, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import TiptapEditor from '@/components/cms/TiptapEditor';
import { useAuth } from '@/modules/crm/contexts/AuthContext';

export default function CMSEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const resolvedParams = React.use(params);
  const isNew = resolvedParams.id === 'new';
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState('draft');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // AI States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('Chuyên nghiệp, hữu ích');
  const [aiKeywords, setAiKeywords] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setThumbnailUrl(data.url);
      } else {
        alert('Lỗi tải ảnh lên: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối khi tải ảnh.');
    } finally {
      setIsUploadingThumbnail(false);
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    }
  };
  
  useEffect(() => {
    if (!isNew) {
      loadPost();
    }
  }, [resolvedParams.id]);

  const loadPost = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', resolvedParams.id)
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
      if (!user || !user.tenant_id) throw new Error('Not authenticated');
      
      const postData = {
        title,
        slug,
        content,
        thumbnail_url: thumbnailUrl,
        status,
        tenant_id: user.tenant_id
      };
      
      if (isNew) {
        const { error } = await supabase.from('posts').insert([postData]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('posts').update(postData).eq('id', resolvedParams.id);
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

  const handleGenerateAI = async () => {
    if (!aiTopic) {
      alert('Vui lòng nhập chủ đề!');
      return;
    }
    
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/admin/cms/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: aiTopic,
          tone: aiTone,
          keywords: aiKeywords
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate content');
      
      setTitle(data.title);
      if (isNew) {
        setSlug(generateSlug(data.title));
      }
      setContent(data.contentHtml);
      setIsAiModalOpen(false);
    } catch (e: any) {
      console.error(e);
      alert('Lỗi khi tạo bài viết AI: ' + e.message);
    } finally {
      setIsGeneratingAi(false);
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
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Viết bằng AI
          </button>

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
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm"
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
            <div className="flex gap-2">
              <input 
                type="text" 
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Dán URL hình ảnh vào đây..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-sm"
              />
              <input 
                type="file" 
                accept="image/*" 
                ref={thumbnailInputRef} 
                onChange={handleThumbnailUpload} 
                className="hidden" 
              />
              <button 
                onClick={() => thumbnailInputRef.current?.click()}
                disabled={isUploadingThumbnail}
                className="flex-shrink-0 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                title="Tải ảnh từ máy tính"
              >
                {isUploadingThumbnail ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                <Sparkles className="w-6 h-6 text-violet-600" />
                Trợ lý AI viết bài
              </h3>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Chủ đề bài viết <span className="text-red-500">*</span></label>
                <textarea 
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ví dụ: 5 lợi ích của việc bọc răng sứ thẩm mỹ"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-violet-500 text-sm resize-none h-24"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Giọng văn</label>
                  <select 
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-violet-500 text-sm"
                  >
                    <option value="Chuyên nghiệp, hữu ích">Chuyên nghiệp, hữu ích</option>
                    <option value="Gần gũi, chia sẻ">Gần gũi, chia sẻ</option>
                    <option value="Hài hước, thú vị">Hài hước, thú vị</option>
                    <option value="Chuẩn SEO, thuyết phục">Chuẩn SEO, thuyết phục</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Từ khóa (Cách nhau dấu phẩy)</label>
                  <input 
                    type="text" 
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                    placeholder="bọc răng sứ, nha khoa..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-violet-500 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button 
                onClick={handleGenerateAI}
                disabled={isGeneratingAi || !aiTopic}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-200"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang viết...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Bắt đầu viết
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
