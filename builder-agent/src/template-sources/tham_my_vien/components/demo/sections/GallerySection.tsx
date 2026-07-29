import React from "react";
import { DemoPageData } from "../../../types/demo";
import { getFallbackImage } from "../../../lib/demo/fallbackRules";

interface GallerySectionProps {
  data: DemoPageData;
}

export default function GallerySection({ data }: GallerySectionProps) {
  // Gracefully fall back to standard premium images if none are supplied
  const items = data.gallery && data.gallery.length > 0 
    ? data.gallery 
    : [
        { image: getFallbackImage(0), aspect: "md:col-span-2 md:row-span-2" },
        { image: getFallbackImage(1), aspect: "md:col-span-1" },
        { image: getFallbackImage(2), aspect: "md:col-span-1" },
        { image: getFallbackImage(0), aspect: "md:col-span-2" }
      ];

  return (
    <section id="gallery-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-primary mb-4">
          Không gian & Tiện nghi
        </h2>
        <p className="font-sans text-brand-secondary/80 text-base max-w-xl mx-auto">
          Nơi trải nghiệm thẩm mỹ trở thành một kỳ nghỉ dưỡng tinh thần trong lành.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
        {items.map((item, index) => {
          const colSpan = item.aspect || "md:col-span-1";
          return (
            <div
              key={index}
              className={`${colSpan} rounded-2xl overflow-hidden group relative bg-brand-bg-container premium-shadow`}
            >
              <img
                src={item.image.src}
                alt={item.image.alt || `Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
