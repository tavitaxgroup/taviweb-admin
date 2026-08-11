"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function DemoHero({ data }: SectionProps) {
  const { hero } = data;
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = hero.images || (hero.image ? [hero.image] : []);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[600px] md:h-[650px] flex items-center overflow-hidden bg-slate-950">
      {/* Background Image with Rich Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.alt || `Lawyer Slide ${idx + 1}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.75] transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/45 via-blue-900/20 to-transparent" style={{ zIndex: 2 }}></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/40 to-transparent" style={{ zIndex: 2 }}></div>
      </div>

      {/* Hero Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center">
        <div className="max-w-3xl animate-fade-in">
          {/* Subtle gold line accent */}
          <div className="h-[2px] w-12 bg-amber-600 mb-6 rounded"></div>

          {/* Title */}
          <h1 
            className="font-headline-md font-extrabold text-white text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7)' }}
          >
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p 
            className="font-sans font-normal text-gray-200 text-base sm:text-lg md:text-xl mb-10 leading-relaxed max-w-2xl opacity-95"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            {hero.subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={hero.primaryAction.href}
              className="inline-flex justify-center items-center bg-amber-700 hover:bg-amber-800 text-white font-sans font-semibold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98]"
            >
              {hero.primaryAction.label}
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </a>
            {hero.secondaryAction && (
              <a
                href={hero.secondaryAction.href}
                className="inline-flex justify-center items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white font-sans font-semibold text-base px-8 py-4 rounded-lg hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                {hero.secondaryAction.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
