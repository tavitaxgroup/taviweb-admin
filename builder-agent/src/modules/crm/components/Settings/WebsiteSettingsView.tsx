"use client";

import { useState, useEffect, useRef } from 'react';
import { WebsiteOverrides } from '@/types/demo';
import { Save, Image as ImageIcon, Loader2, Upload, MessageCircle, Phone, Mail, MapPin, Grid, Star, LayoutTemplate, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { ServicesEditor, ReviewsEditor, GalleryEditor, HighlightsEditor } from './WebsiteArrayEditors';

export function WebsiteSettingsView() {
  const [overrides, setOverrides] = useState<WebsiteOverrides>({});
  const [slug, setSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetchOverrides();
  }, []);

  // Post message to iframe whenever overrides change
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_OVERRIDES', payload: overrides }, '*');
    }
  }, [overrides]);

  const fetchOverrides = async () => {
    try {
      const res = await fetch('/api/admin/settings/website');
      if (res.ok) {
        const data = await res.json();
        const { _slug, ...restOverrides } = data;
        setSlug(_slug);
        setOverrides(restOverrides);
      }
    } catch (error) {
      console.error('Failed to fetch website settings', error);
      toast.error('Không thể tải dữ liệu website');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overrides),
      });

      if (res.ok) {
        toast.success('Đã lưu cài đặt website thành công!');
      } else {
        toast.error('Lưu cài đặt thất bại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lưu');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section: keyof WebsiteOverrides, field: string, value: string) => {
    setOverrides(prev => ({
      ...prev,
      [section]: {
        ...((prev[section] as any) || {}),
        [field]: value
      }
    }));
  };

  const handleImageChange = (section: keyof WebsiteOverrides, value: string) => {
    setOverrides(prev => ({
      ...prev,
      [section]: {
        ...((prev[section] as any) || {}),
        image: { src: value, source: 'business', alt: 'Custom Image' }
      }
    }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/api/admin/settings/website/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Lỗi tải ảnh');
    }

    const { url } = await res.json();
    return url;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: keyof WebsiteOverrides) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(section as string);
    try {
      const url = await uploadImage(file);
      handleImageChange(section, url);
      toast.success('Tải ảnh lên thành công');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Lỗi hệ thống khi tải ảnh');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12 h-[calc(100vh-100px)]"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  return (
    <div className="flex h-[calc(100vh-120px)] -mx-6 -my-6 bg-slate-50 transition-all duration-300 overflow-hidden">
      
      {/* Left Column: Form Editor (40%) */}
      <div className={`${showSidebar ? 'w-[40%] min-w-[400px]' : 'w-0 opacity-0 overflow-hidden'} transition-all duration-300 border-r border-slate-200 bg-white flex flex-col h-full relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg font-bold text-slate-800">Tùy Chỉnh Giao Diện</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-70 text-sm"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Đang lưu...' : 'Lưu'}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-24">
          
          {/* Hero Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ImageIcon className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-semibold text-slate-800">Banner Chính (Hero)</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tiêu đề chính (Title)</label>
                <input
                  type="text"
                  value={overrides.hero?.title || ''}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  placeholder="Tiêu đề chính..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Mô tả (Subtitle)</label>
                <textarea
                  value={overrides.hero?.subtitle || ''}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                  placeholder="Mô tả dưới tiêu đề..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tiêu đề phụ / Badge (Eyebrow)</label>
                <input
                  type="text"
                  value={overrides.hero?.eyebrow || overrides.hero?.badge || ''}
                  onChange={(e) => handleChange('hero', 'eyebrow', e.target.value)}
                  placeholder="Dòng chữ nhỏ trên tiêu đề..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Hình ảnh Banner</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={overrides.hero?.image?.src || ''}
                    onChange={(e) => handleImageChange('hero', e.target.value)}
                    placeholder="URL ảnh..."
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center border border-slate-300">
                    {uploading === 'hero' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero')} disabled={uploading === 'hero'} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ImageIcon className="w-5 h-5 text-purple-500" />
              <h3 className="text-base font-semibold text-slate-800">Giới Thiệu (About)</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tiêu đề</label>
                <input
                  type="text"
                  value={overrides.about?.title || ''}
                  onChange={(e) => handleChange('about', 'title', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nội dung</label>
                <textarea
                  value={overrides.about?.body || overrides.about?.description || ''}
                  onChange={(e) => handleChange('about', 'body', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Hình ảnh Giới thiệu</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={overrides.about?.image?.src || ''}
                    onChange={(e) => handleImageChange('about', e.target.value)}
                    placeholder="URL ảnh..."
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center border border-slate-300">
                    {uploading === 'about' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileUpload(e, 'about')} disabled={uploading === 'about'} />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">Các điểm nổi bật (Highlights)</label>
                <HighlightsEditor overrides={overrides} setOverrides={setOverrides} uploadImage={uploadImage} />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <LayoutTemplate className="w-5 h-5 text-sky-500" />
              <h3 className="text-base font-semibold text-slate-800">Dịch Vụ (Services)</h3>
            </div>
            <ServicesEditor overrides={overrides} setOverrides={setOverrides} uploadImage={uploadImage} />
          </section>

          {/* Gallery Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Grid className="w-5 h-5 text-pink-500" />
              <h3 className="text-base font-semibold text-slate-800">Thư Viện Ảnh (Gallery)</h3>
            </div>
            <GalleryEditor overrides={overrides} setOverrides={setOverrides} uploadImage={uploadImage} />
          </section>

          {/* Reviews Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-semibold text-slate-800">Đánh Giá (Reviews)</h3>
            </div>
            <ReviewsEditor overrides={overrides} setOverrides={setOverrides} uploadImage={uploadImage} />
          </section>

          {/* Contact Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Phone className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-semibold text-slate-800">Liên Hệ (Contact)</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Số điện thoại</label>
                <input
                  type="text"
                  value={overrides.contact?.phone || ''}
                  onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
                <input
                  type="text"
                  value={overrides.contact?.email || ''}
                  onChange={(e) => handleChange('contact', 'email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Địa chỉ</label>
                <textarea
                  value={overrides.contact?.address || ''}
                  onChange={(e) => handleChange('contact', 'address', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Zalo / MessageCircle URL</label>
                <input
                  type="text"
                  value={overrides.contact?.MessageCircle || ''}
                  onChange={(e) => handleChange('contact', 'MessageCircle', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="text-amber-500 font-bold text-lg leading-none">★</span>
              <h3 className="text-base font-semibold text-slate-800">Chỉ số Uy Tín (Trust)</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Điểm đánh giá (Rating)</label>
                <input
                  type="number"
                  step="0.1"
                  max="5"
                  value={overrides.trust?.rating || ''}
                  onChange={(e) => handleChange('trust', 'rating', e.target.value)}
                  placeholder="VD: 4.9"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Số lượt đánh giá</label>
                <input
                  type="number"
                  value={overrides.trust?.reviewCount || ''}
                  onChange={(e) => handleChange('trust', 'reviewCount', e.target.value)}
                  placeholder="VD: 250"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Right Column: Live Preview Iframe (60%) */}
      <div className="flex-1 bg-slate-100 flex flex-col relative transition-all duration-300">
        <div className="absolute top-0 inset-x-0 h-10 bg-slate-800 flex items-center justify-between px-4 rounded-t-lg mx-4 mt-4 shadow-sm text-slate-300 text-xs font-medium z-20">
          <div className="flex items-center">
            <div className="flex gap-1.5 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            Live Preview: /{slug}
          </div>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-1.5 hover:bg-slate-700 rounded text-slate-300 transition-colors"
            title={showSidebar ? "Ẩn sidebar" : "Hiện sidebar"}
          >
            {showSidebar ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex-1 p-4 pt-14 pb-4">
          <div className="w-full h-full bg-white rounded-b-lg shadow-xl overflow-hidden border border-slate-200">
            {slug ? (
              <iframe
                ref={iframeRef}
                src={`/${slug}?preview=true`}
                className="w-full h-full border-0"
                title="Website Preview"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 flex-col gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                Đang tải Preview...
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
