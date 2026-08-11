import React, { useState } from 'react';
import { WebsiteOverrides, DemoService, DemoReview } from '@/types/demo';
import { Plus, Trash2, Image as ImageIcon, Loader2, Upload, Star } from 'lucide-react';

interface EditorProps {
  overrides: WebsiteOverrides;
  setOverrides: React.Dispatch<React.SetStateAction<WebsiteOverrides>>;
  uploadImage?: (file: File) => Promise<string>;
}

export function ServicesEditor({ overrides, setOverrides, uploadImage }: EditorProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const services = overrides.services || [];

  const handleAdd = () => {
    setOverrides(prev => ({
      ...prev,
      services: [...(prev.services || []), { title: '', description: '' }]
    }));
  };

  const handleRemove = (index: number) => {
    setOverrides(prev => {
      const newServices = [...(prev.services || [])];
      newServices.splice(index, 1);
      return { ...prev, services: newServices };
    });
  };

  const handleChange = (index: number, field: keyof DemoService, value: string) => {
    setOverrides(prev => {
      const newServices = [...(prev.services || [])];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, services: newServices };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file || !uploadImage) return;

    setUploadingIndex(index);
    try {
      const url = await uploadImage(file);
      setOverrides(prev => {
        const newServices = [...(prev.services || [])];
        newServices[index] = { 
          ...newServices[index], 
          image: { src: url, source: 'business', alt: newServices[index].title || 'Dịch vụ' } 
        };
        return { ...prev, services: newServices };
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {services.map((svc, idx) => (
        <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-white space-y-3 relative group">
          <button 
            onClick={() => handleRemove(idx)}
            className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Xóa dịch vụ"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-2 gap-3 pr-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tên Dịch Vụ</label>
              <input
                type="text"
                value={svc.title || svc.name || ''}
                onChange={(e) => handleChange(idx, svc.title !== undefined ? 'title' : 'name', e.target.value)}
                placeholder="VD: Trị liệu đá nóng..."
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Danh mục (Category)</label>
              <input
                type="text"
                value={svc.category || ''}
                onChange={(e) => handleChange(idx, 'category', e.target.value)}
                placeholder="VD: Therapy..."
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mô tả ngắn</label>
            <textarea
              value={svc.description || ''}
              onChange={(e) => handleChange(idx, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tên Icon (lucide-react)</label>
              <input
                type="text"
                value={svc.iconName || svc.icon || svc.iconKey || ''}
                onChange={(e) => handleChange(idx, svc.iconName !== undefined ? 'iconName' : (svc.icon !== undefined ? 'icon' : 'iconKey'), e.target.value)}
                placeholder="VD: Sparkles, Heart..."
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hoặc Ảnh Minh Họa</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={svc.image?.src || ''}
                  onChange={(e) => {
                    const url = e.target.value;
                    setOverrides(prev => {
                      const newServices = [...(prev.services || [])];
                      newServices[idx] = { 
                        ...newServices[idx], 
                        image: { src: url, source: 'business', alt: newServices[idx].title || '' } 
                      };
                      return { ...prev, services: newServices };
                    });
                  }}
                  placeholder="URL ảnh..."
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1.5 rounded font-medium transition-colors flex items-center justify-center border border-slate-300">
                  {uploadingIndex === idx ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, idx)} disabled={uploadingIndex === idx} />
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-medium hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" /> Thêm dịch vụ
      </button>
    </div>
  );
}

export function ReviewsEditor({ overrides, setOverrides }: EditorProps) {
  const reviews = overrides.reviews || [];

  const handleAdd = () => {
    setOverrides(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), { author: '', rating: 5, text: '' }]
    }));
  };

  const handleRemove = (index: number) => {
    setOverrides(prev => {
      const newReviews = [...(prev.reviews || [])];
      newReviews.splice(index, 1);
      return { ...prev, reviews: newReviews };
    });
  };

  const handleChange = (index: number, field: keyof DemoReview, value: any) => {
    setOverrides(prev => {
      const newReviews = [...(prev.reviews || [])];
      newReviews[index] = { ...newReviews[index], [field]: value };
      return { ...prev, reviews: newReviews };
    });
  };

  return (
    <div className="space-y-4">
      {reviews.map((rv, idx) => (
        <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-white space-y-3 relative group">
          <button 
            onClick={() => handleRemove(idx)}
            className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-2 gap-3 pr-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tên khách hàng</label>
              <input
                type="text"
                value={rv.author || ''}
                onChange={(e) => handleChange(idx, 'author', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vai trò / Chức danh</label>
              <input
                type="text"
                value={rv.role || ''}
                onChange={(e) => handleChange(idx, 'role', e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">Số sao (Rating) <Star className="w-3 h-3 text-amber-500 fill-current" /></label>
            <input
              type="number"
              min="1" max="5" step="0.5"
              value={rv.rating || 5}
              onChange={(e) => handleChange(idx, 'rating', parseFloat(e.target.value))}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nội dung đánh giá</label>
            <textarea
              value={rv.text || rv.quote || rv.content || ''}
              onChange={(e) => handleChange(idx, rv.text !== undefined ? 'text' : (rv.quote !== undefined ? 'quote' : 'content'), e.target.value)}
              rows={3}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 font-medium hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" /> Thêm đánh giá
      </button>
    </div>
  );
}

export function GalleryEditor({ overrides, setOverrides, uploadImage }: EditorProps) {
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const gallery = overrides.gallery_urls || [];

  const handleRemove = (index: number) => {
    setOverrides(prev => {
      const newUrls = [...(prev.gallery_urls || [])];
      newUrls.splice(index, 1);
      return { ...prev, gallery_urls: newUrls };
    });
  };

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadImage) return;

    setUploadingGallery(true);
    try {
      const url = await uploadImage(file);
      setOverrides(prev => ({
        ...prev,
        gallery_urls: [...(prev.gallery_urls || []), url]
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingGallery(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {gallery.map((url, idx) => (
          <div key={idx} className="relative group aspect-video bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
            <img src={url} alt="Gallery" className="w-full h-full object-cover" />
            <button 
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white hover:bg-red-600 rounded-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <label className="cursor-pointer aspect-video border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
          {uploadingGallery ? (
            <Loader2 className="w-6 h-6 animate-spin mb-2" />
          ) : (
            <>
              <ImageIcon className="w-6 h-6 mb-2" />
              <span className="text-xs font-medium">Thêm ảnh</span>
            </>
          )}
          <input type="file" className="sr-only" accept="image/*" onChange={handleAddFile} disabled={uploadingGallery} />
        </label>
      </div>
    </div>
  );
}

export function HighlightsEditor({ overrides, setOverrides }: EditorProps) {
  const highlights = overrides.about?.highlights || [];

  const handleAdd = () => {
    setOverrides(prev => ({
      ...prev,
      about: {
        ...(prev.about || {}),
        highlights: [...(prev.about?.highlights || []), '']
      }
    }));
  };

  const handleRemove = (index: number) => {
    setOverrides(prev => {
      const newHighlights = [...(prev.about?.highlights || [])];
      newHighlights.splice(index, 1);
      return { 
        ...prev, 
        about: {
          ...(prev.about || {}),
          highlights: newHighlights
        } 
      };
    });
  };

  const handleChange = (index: number, value: string) => {
    setOverrides(prev => {
      const newHighlights = [...(prev.about?.highlights || [])];
      newHighlights[index] = value;
      return { 
        ...prev, 
        about: {
          ...(prev.about || {}),
          highlights: newHighlights
        } 
      };
    });
  };

  return (
    <div className="space-y-3">
      {highlights.map((hl, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <textarea
            value={hl}
            onChange={(e) => handleChange(idx, e.target.value)}
            rows={2}
            placeholder="Ví dụ: Đội ngũ chuyên gia giàu kinh nghiệm..."
            className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
          />
          <button 
            onClick={() => handleRemove(idx)}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="w-full py-1.5 border border-dashed border-slate-300 rounded text-slate-500 font-medium hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-xs"
      >
        <Plus className="w-3 h-3" /> Thêm điểm nổi bật
      </button>
    </div>
  );
}
