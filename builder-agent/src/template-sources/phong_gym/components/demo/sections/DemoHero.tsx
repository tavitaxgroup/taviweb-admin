import React from "react";
import { Clock } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface DemoHeroProps {
  data: DemoPageData;
}

export default function DemoHero({ data }: DemoHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black" id="hero-section">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={data.hero.image.src}
          alt={data.hero.image.alt}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          id="hero-bg-img"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-16">
        <div className="max-w-3xl">
          <h1
            className="font-archivo text-5xl md:text-7xl !text-white uppercase leading-[0.95] mb-6 tracking-normal font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            id="hero-title"
          >
            {data.hero.title.includes(" - ") ? (
              <>
                {data.hero.title.split(" - ")[0]}
                <span className="block !text-[#A3E635] mt-2">
                  {data.hero.title.split(" - ")[1]}
                </span>
              </>
            ) : (
              data.hero.title
            )}
          </h1>

          <p className="font-archivo text-lg md:text-xl !text-[#dce2f7] mb-10 max-w-xl leading-relaxed" id="hero-subtitle">
            {data.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href={data.hero.primaryAction.href}
              className="inline-flex items-center justify-center bg-[#A3E635] !text-black font-archivo font-bold text-lg uppercase px-8 py-4 text-center hover:bg-[#8fd128] transition-all transform hover:scale-[1.02] active:scale-95 duration-100 border-b-4 border-r-4 border-[#334f00]"
              style={{ borderRadius: "0px" }}
              id="hero-primary-cta"
            >
              {data.hero.primaryAction.label}
            </a>

            {data.hero.secondaryAction && (
              <a
                href={data.hero.secondaryAction.href}
                className="inline-flex items-center justify-center border-2 border-[#A3E635] bg-black/45 !text-[#A3E635] font-archivo font-bold text-lg uppercase px-8 py-4 text-center hover:bg-[#A3E635] hover:!text-black transition-colors"
                style={{ borderRadius: "0px" }}
                id="hero-secondary-cta"
              >
                {data.hero.secondaryAction.label}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Floating 24/7 Hours Card (Bottom-Right) */}
      {data.business.workingHours && (
        <div className="absolute bottom-10 right-10 hidden lg:block z-20" id="hero-hours-badge">
          <div className="bg-[#A3E635] p-5 flex items-center gap-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black/10 p-2 rounded-full">
              <Clock className="h-8 w-8 text-black" />
            </div>
            <div>
              <p className="font-archivo font-bold !text-black uppercase leading-none mb-1 text-sm tracking-wide">
                {data.business.workingHours}
              </p>
              <p className="font-archivo text-xs text-black/80">Tập luyện bất kể thời gian</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
