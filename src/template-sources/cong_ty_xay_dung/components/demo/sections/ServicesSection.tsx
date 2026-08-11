import React from "react";
import { CheckCircle2, Calculator, ArrowRight } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ServicesSectionProps {
  services: DemoPageData["services"];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Let's identify the popular services and others
  const popularService = services.find(s => s.isPopular) || services[0];
  const otherServices = services.filter(s => s.id !== popularService?.id);

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
            Chuyên môn cao
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Dịch vụ của chúng tôi
          </h2>
        </div>

        {/* Dynamic Bento-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* 1. Popular/Large Service (Spans 3 Columns on lg screens) */}
          {popularService && (
            <div className="lg:col-span-3 border border-slate-200 hover:border-slate-300 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group bg-white">
              <div className="h-64 sm:h-80 relative overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={popularService.image.src} 
                  alt={popularService.image.alt}
                />
                <div className="absolute top-4 right-4 bg-slate-900 text-amber-500 text-[10px] font-extrabold px-3 py-1.5 uppercase tracking-wider rounded-sm">
                  Phổ biến nhất
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-2xl font-extrabold text-slate-900 mb-4">
                    {popularService.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-600 mb-6 leading-relaxed">
                    {popularService.description}
                  </p>
                </div>
                
                {/* Highlights Checklist */}
                {popularService.highlights && popularService.highlights.length > 0 && (
                  <ul className="space-y-3 pt-4 border-t border-slate-100">
                    {popularService.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-center text-sm font-semibold text-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 mr-2.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* 2. Secondary Service (Spans 2 Columns on lg screens) */}
          {otherServices[0] && (
            <div className="lg:col-span-2 border border-slate-200 hover:border-slate-300 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group bg-white">
              <div className="h-48 sm:h-56 relative overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={otherServices[0].image.src} 
                  alt={otherServices[0].image.alt}
                />
              </div>
              <div className="p-8 flex-1">
                <h3 className="font-sans text-xl font-bold text-slate-900 mb-4">
                  {otherServices[0].title}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {otherServices[0].description}
                </p>
              </div>
            </div>
          )}

          {/* 3. Third Service (Spans 2 Columns on lg screens) */}
          {otherServices[1] && (
            <div className="lg:col-span-2 border border-slate-200 hover:border-slate-300 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group bg-white">
              <div className="h-48 sm:h-56 relative overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={otherServices[1].image.src} 
                  alt={otherServices[1].image.alt}
                />
              </div>
              <div className="p-8 flex-1">
                <h3 className="font-sans text-xl font-bold text-slate-900 mb-4">
                  {otherServices[1].title}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {otherServices[1].description}
                </p>
              </div>
            </div>
          )}

          {/* 4. Fourth Service (Spans 2 Columns on lg screens) */}
          {otherServices[2] && (
            <div className="lg:col-span-2 border border-slate-200 hover:border-slate-300 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group bg-white">
              <div className="h-48 sm:h-56 relative overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={otherServices[2].image.src} 
                  alt={otherServices[2].image.alt}
                />
              </div>
              <div className="p-8 flex-1">
                <h3 className="font-sans text-xl font-bold text-slate-900 mb-4">
                  {otherServices[2].title}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {otherServices[2].description}
                </p>
              </div>
            </div>
          )}

          {/* 5. Custom Solid Dark Blue Calculator Block (Spans 1 Column on lg screens) */}
          <div className="lg:col-span-1 bg-slate-900 text-white rounded overflow-hidden shadow-md flex flex-col justify-between p-8 text-center group border-none">
            <div className="my-auto flex flex-col items-center">
              <div className="bg-amber-500/10 p-5 rounded-full text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-lg font-bold mb-3">
                Tư vấn dự toán
              </h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-[180px]">
                Bản kê chi tiết giúp bạn kiểm soát dòng vốn và tránh lãng phí vật tư xây dựng.
              </p>
            </div>
            <a 
              href="#contact" 
              className="mt-6 inline-flex items-center justify-center text-amber-500 font-bold text-xs uppercase tracking-wider hover:text-amber-400 group-1 cursor-pointer"
            >
              <span>Tìm hiểu thêm</span>
              <ArrowRight className="w-4.5 h-4.5 ml-1.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
