"use client";
import { ArrowRight } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function DemoHero({ data }: SectionProps) {
  const { hero } = data;

  return (
    <section className="relative h-[800px] flex items-center overflow-hidden bg-slate-950">
      {/* Background Image with Rich Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.image.src}
          alt={hero.image.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/45 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      {/* Hero Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center">
        <div className="max-w-3xl animate-fade-in">
          {/* Subtle gold line accent */}
          <div className="h-[2px] w-12 bg-amber-600 mb-6 rounded"></div>

          {/* Title */}
          <h1 className="font-headline-md font-extrabold text-white text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-shadow-sm">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="font-sans font-normal text-gray-200 text-base sm:text-lg md:text-xl mb-10 leading-relaxed max-w-2xl opacity-95">
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
