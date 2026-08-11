import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface GallerySectionProps {
  data: DemoPageData;
}

const FALLBACK_GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=900&auto=format&fit=crop',
];

function getGalleryImage(data: DemoPageData, index: number) {
  const item = data.gallery?.[index];
  const src = item?.image?.src?.trim();

  return {
    ...item,
    category: item?.category || 'Ảnh cưới',
    image: {
      src: src && /^https?:\/\//.test(src) ? src : FALLBACK_GALLERY_IMAGES[index],
      alt: item?.image?.alt || 'Bộ ảnh cưới được chụp theo phong cách lãng mạn',
    },
  };
}

function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string,
) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = fallbackSrc;
}

export default function GallerySection({ data }: GallerySectionProps) {
  // We need up to 5 images to recreate the design accurately
  const images = [0, 1, 2, 3, 4].map((index) => getGalleryImage(data, index));

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#834767]">
              PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#201a1c] tracking-tight max-w-xl">
              Cảm hứng từ những câu chuyện tình yêu thực thụ
            </h2>
          </div>
          
          <div>
            <a 
              href="#contact-cta" 
              className="inline-flex items-center gap-1 text-sm font-sans uppercase tracking-widest font-semibold text-[#834767] hover:text-[#201a1c] border-b border-[#834767] pb-1 hover:border-[#201a1c] transition-all group"
            >
              Xem tất cả bộ ảnh
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Custom Editorial Grid Layout representing Stitch UI exactly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="editorial-gallery-grid">
          
          {/* Column Group Left (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Image 0 (Bridal Gown / Vertical Portrait) */}
            {images[2] && (
              <div className="overflow-hidden rounded-sm group relative aspect-[3/4] shadow-md shadow-[#834767]/5 border border-[#e1c292]/10">
                <img 
                  src={images[2].image.src} 
                  alt={images[2].image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => handleImageError(event, FALLBACK_GALLERY_IMAGES[2])}
                />
                <div className="absolute inset-0 bg-[#201a1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-wider text-white bg-[#834767] px-3 py-1 rounded-sm">
                    {images[2].category}
                  </span>
                </div>
              </div>
            )}

            {/* Image 4 (Cake table / Bottom Left) */}
            {images[3] && (
              <div className="overflow-hidden rounded-sm group relative aspect-[4/3] shadow-md shadow-[#834767]/5 border border-[#e1c292]/10">
                <img 
                  src={images[3].image.src} 
                  alt={images[3].image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => handleImageError(event, FALLBACK_GALLERY_IMAGES[3])}
                />
                <div className="absolute inset-0 bg-[#201a1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-wider text-white bg-[#834767] px-3 py-1 rounded-sm">
                    {images[3].category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Column Group Center (Spans 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Image 0 (Wide outdoor Reception) */}
            {images[0] && (
              <div className="overflow-hidden rounded-sm group relative aspect-[16/10] shadow-md shadow-[#834767]/5 border border-[#e1c292]/10">
                <img 
                  src={images[0].image.src} 
                  alt={images[0].image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => handleImageError(event, FALLBACK_GALLERY_IMAGES[0])}
                />
                <div className="absolute inset-0 bg-[#201a1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-wider text-white bg-[#834767] px-3 py-1 rounded-sm">
                    {images[0].category}
                  </span>
                </div>
              </div>
            )}

            {/* Image 1 (Rings detail card) */}
            {images[1] && (
              <div className="overflow-hidden rounded-sm group relative aspect-[4/3] shadow-md shadow-[#834767]/5 border border-[#e1c292]/10">
                <img 
                  src={images[1].image.src} 
                  alt={images[1].image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => handleImageError(event, FALLBACK_GALLERY_IMAGES[1])}
                />
                <div className="absolute inset-0 bg-[#201a1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-wider text-white bg-[#834767] px-3 py-1 rounded-sm">
                    {images[1].category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Column Group Right (Spans 3 cols - Vertical portrait chair) */}
          <div className="md:col-span-3 flex flex-col justify-stretch">
            {images[4] && (
              <div className="overflow-hidden rounded-sm group relative h-full min-h-[400px] shadow-md shadow-[#834767]/5 border border-[#e1c292]/10">
                <img 
                  src={images[4].image.src} 
                  alt={images[4].image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => handleImageError(event, FALLBACK_GALLERY_IMAGES[4])}
                />
                <div className="absolute inset-0 bg-[#201a1c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="font-sans text-xs uppercase tracking-wider text-white bg-[#834767] px-3 py-1 rounded-sm">
                    {images[4].category}
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
