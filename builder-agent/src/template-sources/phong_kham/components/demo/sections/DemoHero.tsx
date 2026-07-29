"use client";
import { motion } from 'motion/react';
import { Calendar, Info, ShieldCheck, Award } from 'lucide-react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  hero: HeroData;
}

export default function DemoHero({ hero }: DemoHeroProps) {
  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          alt={hero.image.alt}
          className="w-full h-full object-cover"
          src={hero.image.src}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-[#f8f9ff]"></div>
      </div>

      {/* Floating UI Elements (Desktop Only) */}
      <div className="absolute top-20 left-10 md:left-24 z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white/70 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-xl border border-white/30"
        >
          <div className="w-10 h-10 bg-[#006329] rounded-full flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">ISO Certified</div>
            <div className="text-[11px] text-slate-500">Global Standards</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-44 right-10 md:right-32 z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="bg-white/70 backdrop-blur-md px-5 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-xl border border-white/30"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#004ac6]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">Top Rated Clinic</div>
            <div className="text-[11px] text-slate-500">2023 Achievement</div>
          </div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center pt-20 pb-32">
        {hero.badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4.5 py-1.5 bg-blue-100/90 backdrop-blur-sm text-[#004ac6] rounded-full text-xs font-bold mb-8 shadow-md border border-blue-200"
          >
            <ShieldCheck className="w-4 h-4" />
            {hero.badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[38px] md:text-[62px] lg:text-[70px] text-white leading-[1.1] font-extrabold mb-6 tracking-tight"
        >
          {hero.title.split(' ').slice(0, -3).join(' ')} <br />
          <span className="text-[#dbe1ff]">{hero.title.split(' ').slice(-3).join(' ')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mt-10"
        >
          <button
            onClick={() => handleScroll(hero.primaryAction.href)}
            className="bg-[#004ac6] text-white px-9 py-4 rounded-xl font-bold text-base shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            {hero.primaryAction.label}
          </button>
          <button
            onClick={() => handleScroll(hero.secondaryAction.href)}
            className="backdrop-blur-md bg-white/10 text-white px-9 py-4 rounded-xl font-bold text-base border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Info className="w-5 h-5" />
            {hero.secondaryAction.label}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

