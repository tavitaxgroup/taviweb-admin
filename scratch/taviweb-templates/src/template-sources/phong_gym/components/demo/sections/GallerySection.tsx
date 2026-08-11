import React, { useState } from "react";
import { X } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface GallerySectionProps {
  data: DemoPageData;
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Safeguard: If gallery is empty, don't crash
  if (!data.gallery || data.gallery.length === 0) {
    return null;
  }

  // Define bento grid layout classes for up to 4 items
  const bentoClasses = [
    "md:col-span-2 md:row-span-2 h-[320px] md:h-[504px]", // Item 1 (Wide & tall)
    "h-[240px]",                                        // Item 2 (Standard square-ish)
    "h-[240px]",                                        // Item 3 (Standard square-ish)
    "md:col-span-2 h-[240px]"                           // Item 4 (Wide)
  ];

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-anton text-4xl md:text-5xl uppercase mb-12 text-center text-black" id="gallery-title">
          KHÔNG GIAN <span className="text-[#446900]">{data.business.name.replace(/GYM|FITNESS/gi, "").trim()}</span>
        </h2>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="gallery-bento-grid">
          {data.gallery.slice(0, 4).map((item, idx) => {
            const layoutClass = bentoClasses[idx] || "h-[240px]";
            return (
              <div
                key={item.id}
                onClick={() => setSelectedImg(item.image.src)}
                className={`${layoutClass} relative group border-2 border-black overflow-hidden bg-zinc-900 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}
                style={{ borderRadius: "0px" }}
                id={`gallery-item-${item.id}`}
              >
                {/* Image */}
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-200" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal Box */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
          id="gallery-modal"
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 text-white hover:text-[#A3E635] p-2 bg-black/50 hover:bg-black/80"
            aria-label="Close modal"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImg}
            alt="Expanded gallery view"
            className="max-w-full max-h-[85vh] object-contain border-2 border-white"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
}
