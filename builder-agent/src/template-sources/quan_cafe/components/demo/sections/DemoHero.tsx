import React from 'react';
import { MapPin, PhoneCall } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function DemoHero({ data }: SectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#fff8f5]">
      {/* Background with Dark Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f5] via-[#fff8f5]/40 to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5]/10 via-[#fff8f5]/80 to-[#fff8f5] z-10 md:hidden"></div>
        <img
          className="w-full h-full object-cover select-none"
          src={data.hero.backgroundImage.src}
          alt={data.hero.backgroundImage.alt}
          referrerPolicy="no-referrer"
        />
        {/* Soft shadow layer to ensure readable content on all screen sizes */}
        <div className="absolute inset-0 bg-black/35 z-0 md:bg-black/20"></div>
      </div>

      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-32">
        <div className="max-w-3xl text-white md:text-[#1e1b19]">
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight text-white md:text-[#553722] drop-shadow-sm">
            {data.hero.title}
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/95 md:text-[#50453e] mb-10 md:mb-12 leading-relaxed max-w-xl font-medium">
            {data.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href={data.hero.primaryAction.href}
              className="bg-[#553722] hover:bg-[#5f402a] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl text-sm font-bold tracking-wide shadow-xl shadow-[#553722]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-white/90" />
              <span>{data.hero.primaryAction.label}</span>
            </a>

            {data.business.phone && (
              <a
                href={data.hero.secondaryAction.href}
                className="bg-white/90 backdrop-blur-md border border-[#553722]/20 text-[#553722] hover:bg-[#efe0cd] px-8 py-4 sm:px-10 sm:py-5 rounded-2xl text-sm font-bold tracking-wide hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{data.hero.secondaryAction.label}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
