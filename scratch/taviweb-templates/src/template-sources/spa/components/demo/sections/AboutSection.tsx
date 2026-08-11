import React from "react";
import { AboutData } from "../../../types/demo";

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-5 md:px-16 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in">
          <span className="font-sans text-xs md:text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            VỀ CHÚNG TÔI
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-on-background mb-6 leading-tight tracking-tight">
            {about.title}
          </h2>
          <div className="w-16 h-0.5 bg-primary/40 mb-8"></div>
          
          <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            {about.description}
          </p>
        </div>

        {/* Image Area */}
        {about.image && (
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500"></div>
            <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-square overflow-hidden rounded-3xl soft-shadow border border-white/65">
              <img
                src={about.image.src}
                alt={about.image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
