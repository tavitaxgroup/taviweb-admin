import React from 'react';
import { CheckCircle } from 'lucide-react';
import { AboutData } from '../../../types/demo';

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white max-w-7xl mx-auto px-4 md:px-12 scroll-mt-20">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image with dynamic floating badge */}
        <div className="md:col-span-6 relative order-last md:order-first">
          <div className="aspect-square sm:aspect-[4/3] md:aspect-square bg-[#f0edee] rounded-2xl overflow-hidden shadow-xl border border-[#c5c6cc]/20 relative group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src={data.image.src}
              alt={data.image.alt}
              referrerPolicy="no-referrer"
            />
            {/* Overlay to deepen contrast on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Floating badge for corporate weight */}
          {data.badge && (
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-[#0a1422] p-6 rounded-xl text-white hidden sm:block border-4 border-[#fbf9fa] shadow-2xl max-w-xs transition-all hover:scale-[1.02]">
              <p className="font-mono text-xs text-[#fd761a] font-semibold tracking-wider">
                {data.badge.label}
              </p>
              <p className="font-sans font-bold text-lg text-white mt-1 leading-snug">
                {data.badge.value}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Copy & Checklist */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold text-[#fd761a] tracking-widest uppercase">
              {data.label}
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#0a1422] tracking-tight leading-tight mt-2">
              {data.title}
            </h2>
          </div>

          <div className="space-y-4 text-[#44474c] text-base md:text-lg leading-relaxed font-normal">
            <p>{data.description1}</p>
            <p>{data.description2}</p>
          </div>

          {/* Core Checkpoints */}
          <ul className="space-y-3 pt-2">
            {data.points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#fd761a] flex-shrink-0 mt-0.5" />
                <span className="font-sans font-bold text-[#0a1422] text-base">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
