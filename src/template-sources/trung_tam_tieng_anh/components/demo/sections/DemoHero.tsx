import React from 'react';
import { motion } from 'motion/react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  data: HeroData;
}

export const DemoHero: React.FC<DemoHeroProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = data.images || (data.image ? [data.image] : []);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[600px] md:min-h-[650px] flex items-center overflow-hidden">
      {/* Background Image & Ambient overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.alt || `English Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            referrerPolicy="no-referrer"
            loading={idx === 0 ? "eager" : "lazy"}
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/35 md:bg-gradient-to-r md:from-slate-950/50 md:to-transparent z-10" style={{ zIndex: 2 }} />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20 text-white">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7)' }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl font-normal text-slate-100/95 leading-relaxed mb-10 max-w-xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
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
