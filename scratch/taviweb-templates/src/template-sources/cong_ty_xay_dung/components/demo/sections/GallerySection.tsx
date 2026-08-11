import React, { useState } from "react";
import { DemoPageData } from "../../../types/demo";

interface GallerySectionProps {
  gallery: DemoPageData["gallery"];
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  // Dynamically compile categories present in data, always adding "Tất cả"
  const categories = ["Tất cả", ...Array.from(new Set(gallery.map(item => item.category)))];

  // Filter items based on active click selection
  const filteredGallery = activeCategory === "Tất cả" 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
              Hồ sơ năng lực
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Công trình tiêu biểu
            </h2>
          </div>
          
          {/* Dynamic Category Selector Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                    activeCategory === cat
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Project Cards Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((project) => (
              <div 
                key={project.id} 
                className="relative group overflow-hidden bg-slate-900 rounded shadow-sm aspect-[3/4]"
              >
                {/* Project Render Image */}
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-70" 
                  src={project.image.src} 
                  alt={project.image.alt}
                />
                
                {/* Semi-transparent Overlay showing details on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                    {project.location}
                  </span>
                  <h3 className="text-white text-xl font-extrabold tracking-tight">
                    {project.title}
                  </h3>
                  <span className="text-slate-300 text-xs mt-2 border-t border-slate-700/60 pt-2 block">
                    Danh mục: {project.category}
                  </span>
                </div>

                {/* Always-visible visual indicator overlay for touchscreens / initial load */}
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-sm max-w-[calc(100%-2rem)] border border-slate-800 lg:hidden">
                  <h4 className="text-white text-xs font-bold truncate">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded text-slate-400">
            Hiện chưa có công trình mẫu trong danh mục này.
          </div>
        )}
      </div>
    </section>
  );
}
