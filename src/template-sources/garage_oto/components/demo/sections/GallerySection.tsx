import React from 'react';
import { GalleryItem } from '../../../types/demo';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-white max-w-7xl mx-auto px-4 md:px-12 scroll-mt-20">
      <div className="text-center mb-12">
        <span className="font-mono text-xs font-bold text-[#fd761a] tracking-widest uppercase">
          THƯ VIỆN ẢNH
        </span>
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#0a1422] tracking-tight mt-2">
          Không Gian Làm Việc Tại Xưởng
        </h2>
        <p className="text-[#44474c] max-w-2xl mx-auto text-base md:text-lg mt-3 leading-relaxed">
          Hình ảnh thực tế về cơ sở vật chất khang trang, sạch sẽ và các trang thiết bị kỹ thuật hiện đại của chúng tôi.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {gallery.map((item, index) => {
          // Determine bento grid placement based on position or metadata
          let gridClass = 'rounded-2xl overflow-hidden relative group aspect-square border border-[#c5c6cc]/15 shadow-sm';
          
          if (index === 0) {
            // First item: Large 2x2 block
            gridClass = 'col-span-2 row-span-2 rounded-2xl overflow-hidden relative group aspect-square md:aspect-auto border border-[#c5c6cc]/15 shadow-sm min-h-[300px] md:min-h-[440px]';
          } else if (index === 3) {
            // Fourth item: Wide 2x1 footer block
            gridClass = 'col-span-2 rounded-2xl overflow-hidden relative group aspect-[2/1] md:aspect-auto border border-[#c5c6cc]/15 shadow-sm min-h-[140px] md:min-h-[210px]';
          }

          return (
            <div key={index} className={gridClass}>
              <img 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                src={item.image.src}
                alt={item.image.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              {/* Fade-in caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-sans font-bold text-sm md:text-base tracking-tight">
                  {item.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
