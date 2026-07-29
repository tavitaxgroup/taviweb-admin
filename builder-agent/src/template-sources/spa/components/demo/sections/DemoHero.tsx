import React from "react";
import { HeroData } from "../../../types/demo";

interface DemoHeroProps {
  hero: HeroData;
}

export function DemoHero({ hero }: DemoHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-5 md:px-16 py-20">
      {/* Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt={hero.bgImage.alt}
          className="w-full h-full object-cover select-none object-center"
          src={hero.bgImage.src}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-2 animate-fade-in">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mb-6 leading-tight md:leading-[1.1] tracking-tight text-white drop-shadow-sm">
          {hero.title}
        </h1>
        
        <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          {hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={hero.primaryAction.href}
            className="w-full sm:w-auto bg-primary text-white text-center px-10 py-4 rounded-full font-sans text-sm font-semibold tracking-wide shadow-xl hover:scale-105 hover:bg-primary-container active:scale-100 transition-all duration-300"
          >
            {hero.primaryAction.label}
          </a>
          
          {hero.secondaryAction && (
            <a
              href={hero.secondaryAction.href}
              target="_blank"
              rel="noreferrer"
            className="w-full sm:w-auto bg-white/20 backdrop-blur-md border border-white/60 text-white text-center px-10 py-4 rounded-full font-sans text-sm font-semibold tracking-wide shadow-lg hover:bg-white hover:text-primary hover:border-white hover:scale-105 active:scale-100 transition-all duration-300"
            >
              {hero.secondaryAction.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
