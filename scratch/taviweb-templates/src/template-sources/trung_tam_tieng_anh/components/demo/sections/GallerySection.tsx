import React from 'react';
import { GalleryItem } from '../../../types/demo';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight mb-4">
            Khoảnh Khắc Tại English Center
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            Môi trường học tập hiện đại, truyền cảm hứng và đầy sáng tạo.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {/* Main big item (spans 2 columns, 2 rows) */}
          {gallery[0] && (
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl group border border-white shadow-sm">
              <img
                src={gallery[0].src}
                alt={gallery[0].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {gallery[0].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-12 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-semibold">{gallery[0].caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Second item (spans 2 columns, 1 row) */}
          {gallery[1] && (
            <div className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-2xl group border border-white shadow-sm">
              <img
                src={gallery[1].src}
                alt={gallery[1].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {gallery[1].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-12 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-semibold">{gallery[1].caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Third item (spans 1 column, 1 row) */}
          {gallery[2] && (
            <div className="relative overflow-hidden rounded-2xl group border border-white shadow-sm">
              <img
                src={gallery[2].src}
                alt={gallery[2].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {gallery[2].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-semibold">{gallery[2].caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Fourth item (spans 1 column, 1 row) */}
          {gallery[3] && (
            <div className="relative overflow-hidden rounded-2xl group border border-white shadow-sm">
              <img
                src={gallery[3].src}
                alt={gallery[3].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {gallery[3].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-semibold">{gallery[3].caption}</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
