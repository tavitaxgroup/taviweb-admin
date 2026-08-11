import React from "react";
import { GalleryItem } from "../../../types/demo";
import { ArrowRight } from "lucide-react";

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export function GallerySection({ gallery }: GallerySectionProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-20 px-5 md:px-16 overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header split row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="font-sans text-xs md:text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
              KHÔNG GIAN ZEN
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-on-background mb-3">
              Không Gian Thư Giãn
            </h2>
            <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
              Kiến trúc tối giản kết hợp cùng các yếu tố tự nhiên tạo nên một hành trình cảm xúc trọn vẹn.
            </p>
          </div>
          <a
            href="#gallery"
            className="text-primary font-sans text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all duration-300 group py-1 border-b border-transparent hover:border-primary/20"
          >
            Xem tất cả hình ảnh{" "}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Asymmetrical Grid of images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {gallery.map((item, index) => {
            // Support custom col/row span, falling back gracefully
            const colSpan = item.colSpan === 2 ? "col-span-2" : "col-span-1";
            const rowSpan = item.rowSpan === 2 ? "row-span-2" : "row-span-1";

            return (
              <div
                key={item.id || index}
                className={`${colSpan} ${rowSpan} rounded-[28px] overflow-hidden soft-shadow group border border-white/40 relative`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover select-none transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
