"use client";
import React from 'react';
import { HeroInfo } from '../../../types/demo';
import { motion } from 'motion/react';
import { Star, MapPin, CalendarCheck } from 'lucide-react';

interface DemoHeroProps {
  hero: HeroInfo;
}

export default function DemoHero({ hero }: DemoHeroProps) {
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24 px-6 lg:px-8">
      {/* Decorative blurred backdrops */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-100/30 blur-2xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Google Rating Badge */}
            {hero.badge && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/60 px-3.5 py-1 text-xs font-semibold text-teal-850 mb-6 border border-teal-200/50">
                <Star className="h-3.5 w-3.5 fill-teal-600 text-teal-650" />
                <span>{hero.badge}</span>
              </div>
            )}

            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-sans leading-[1.15]">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-relaxed text-gray-600 font-sans max-w-xl">
              {hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-4 text-base font-semibold text-white shadow-md hover:bg-teal-800 active:scale-95 transition-all font-sans cursor-pointer"
              >
                <CalendarCheck className="h-5 w-5" />
                {hero.primaryAction.label}
              </button>
              
              {hero.secondaryAction && (
                <a
                  href={hero.secondaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-6 py-4 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95 transition-all font-sans"
                >
                  <MapPin className="h-5 w-5 text-teal-600" />
                  {hero.secondaryAction.label}
                </a>
              )}
            </div>
          </motion.div>

          {/* Hero Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl border-4 border-white">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            
            {/* Elegant background block accent */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-teal-800/10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

