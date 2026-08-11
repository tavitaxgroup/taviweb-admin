import React from 'react';
import { HeroInfo } from '../../../types/demo';
import { motion } from 'motion/react';
import { Star, MapPin, CalendarCheck } from 'lucide-react';

interface DemoHeroProps {
  hero: HeroInfo;
}

export default function DemoHero({ hero }: DemoHeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = hero.images || (hero.image ? [hero.image] : []);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[600px] md:h-[650px] flex items-center overflow-hidden bg-teal-950">
      {/* Background Image with Rich Dark Teal Overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.alt || `Dental Slide ${idx + 1}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-[0.75] transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/60 via-teal-900/25 to-transparent" style={{ zIndex: 2 }}></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-teal-950/15 to-transparent" style={{ zIndex: 2 }}></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Google Rating Badge */}
          {hero.badge && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-900/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-100 mb-6 border border-teal-500/30 shadow-md">
              <Star className="h-3.5 w-3.5 fill-teal-450 text-teal-450" />
              <span>{hero.badge}</span>
            </div>
          )}

          {/* Main Heading */}
          <h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans leading-[1.15]"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.85)' }}
          >
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p 
            className="mt-6 text-lg leading-relaxed text-white font-sans max-w-xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
          >
            {hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handleScrollToContact}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-teal-950/30 hover:bg-teal-700 active:scale-95 transition-all font-sans cursor-pointer"
            >
              <CalendarCheck className="h-5 w-5" />
              {hero.primaryAction.label}
            </button>
            
            {hero.secondaryAction && (
              <a
                href={hero.secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 text-base font-semibold text-white shadow-md hover:bg-white/20 active:scale-95 transition-all font-sans"
              >
                <MapPin className="h-5 w-5 text-teal-300" />
                {hero.secondaryAction.label}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
