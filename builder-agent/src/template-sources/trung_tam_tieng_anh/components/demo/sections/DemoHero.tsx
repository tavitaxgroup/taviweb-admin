"use client";
import React from 'react';
import { motion } from 'motion/react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  data: HeroData;
}

export const DemoHero: React.FC<DemoHeroProps> = ({ data }) => {
  return (
    <section className="relative min-h-[720px] md:min-h-[800px] flex items-center overflow-hidden">
      {/* Background Image & Ambient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/70 md:bg-gradient-to-r md:from-slate-950/85 md:to-transparent z-10" />
        <img
          src={data.image.src}
          alt={data.image.alt}
          className="w-full h-full object-cover object-center transform scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20 text-white">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white drop-shadow-sm"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl font-normal text-slate-100/90 leading-relaxed mb-10 max-w-xl"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={data.primaryAction.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              {data.primaryAction.label}
            </a>
            <a
              href={data.secondaryAction.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 text-base font-bold rounded-xl shadow-lg hover:shadow-amber-500/10 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              {data.secondaryAction.label}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
