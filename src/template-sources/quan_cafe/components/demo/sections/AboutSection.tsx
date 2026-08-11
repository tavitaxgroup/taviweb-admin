import React from 'react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function AboutSection({ data }: SectionProps) {
  return (
    <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#553722]/10 rounded-full blur-2xl opacity-40"></div>
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-xl border border-outline-variant/10">
              <img
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                src={data.about.image.src}
                alt={data.about.image.alt}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Copy Right */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#553722] font-bold tracking-widest uppercase text-xs sm:text-sm block">
              {data.about.badge}
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#553722] leading-tight">
              {data.about.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#50453e] leading-relaxed opacity-95">
              {data.about.description}
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="px-5 py-3 bg-[#fbf2ee] rounded-xl border border-[#efe0cd] text-xs font-semibold text-[#553722]">
                ☕️ Cà phê nguyên chất
              </div>
              <div className="px-5 py-3 bg-[#fbf2ee] rounded-xl border border-[#efe0cd] text-xs font-semibold text-[#553722]">
                🌿 Không gian thư giãn
              </div>
              <div className="px-5 py-3 bg-[#fbf2ee] rounded-xl border border-[#efe0cd] text-xs font-semibold text-[#553722]">
                🍰 Bánh tươi nướng lò
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
