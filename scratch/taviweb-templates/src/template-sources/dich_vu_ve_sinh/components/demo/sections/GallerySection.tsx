import { ArrowRight } from "lucide-react";
import { GalleryItem } from "../../../types/demo";

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="max-w-xl">
            <span className="font-label text-xs font-bold text-[#16a34a] tracking-widest uppercase">
              Dự án thực tế
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">
              Dự Án Đã Thực Hiện
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed">
              Hình ảnh thực tế từ các công trình văn phòng, nhà xưởng, biệt thự và khu công nghiệp cao cấp mà chúng tôi đã bàn giao hoàn thiện tốt đẹp.
            </p>
          </div>
          
          <button className="font-label text-sm font-semibold text-[#16a34a] flex items-center gap-1.5 hover:gap-2 border-b-2 border-[#16a34a] pb-0.5 transition-all">
            Xem tất cả thư viện <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Bento-Grid Layout as represented in the design spec */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[550px]">
          {gallery[0] && (
            <div className="col-span-2 row-span-2 rounded-lg overflow-hidden border border-slate-100 shadow-sm relative group cursor-pointer h-64 md:h-auto">
              <img
                src={gallery[0].image.src}
                alt={gallery[0].image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-display font-bold text-sm md:text-base">{gallery[0].image.alt}</span>
              </div>
            </div>
          )}

          {gallery[1] && (
            <div className="rounded-lg overflow-hidden border border-slate-100 shadow-sm relative group cursor-pointer h-48 md:h-auto">
              <img
                src={gallery[1].image.src}
                alt={gallery[1].image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-display font-semibold text-xs">{gallery[1].image.alt}</span>
              </div>
            </div>
          )}

          {gallery[2] && (
            <div className="rounded-lg overflow-hidden border border-slate-100 shadow-sm relative group cursor-pointer h-48 md:h-auto">
              <img
                src={gallery[2].image.src}
                alt={gallery[2].image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-display font-semibold text-xs">{gallery[2].image.alt}</span>
              </div>
            </div>
          )}

          {gallery[3] && (
            <div className="col-span-2 rounded-lg overflow-hidden border border-slate-100 shadow-sm relative group cursor-pointer h-52 md:h-auto">
              <img
                src={gallery[3].image.src}
                alt={gallery[3].image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-display font-bold text-sm">{gallery[3].image.alt}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
