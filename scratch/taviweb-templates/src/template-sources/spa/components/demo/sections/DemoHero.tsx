import React from "react";
import { HeroData } from "../../../types/demo";

interface DemoHeroProps {
  hero: HeroData;
}

export function DemoHero({ hero }: DemoHeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = hero.images || (hero.bgImage ? [hero.bgImage] : []);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[600px] md:min-h-[650px] flex items-center justify-center overflow-hidden px-5 md:px-16 py-14">
      {/* Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            alt={slide.alt || `Spa Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover select-none object-center transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            src={slide.src}
            loading={idx === 0 ? "eager" : "lazy"}
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" style={{ zIndex: 2 }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-2 animate-fade-in">
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mb-6 leading-tight md:leading-[1.1] tracking-tight text-white"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.7)' }}
        >
          {hero.title}
        </h1>
        
        <p 
          className="font-sans text-base sm:text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
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
