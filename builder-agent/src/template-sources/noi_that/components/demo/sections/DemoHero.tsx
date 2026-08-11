"use client";
import React from 'react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  data: HeroData;
}

function normalizeHeroTitle(title: string) {
  return title
    .replace(/Kiế\s+n/g, 'Kiến')
    .replace(/Số\s+ng/g, 'Sống')
    .replace(/\s+/g, ' ')
    .trim();
}

function getTitleLines(title: string) {
  if (title === 'Kiến Tạo Không Gian Sống Tinh Tế') {
    return ['Kiến Tạo Không Gian', 'Sống Tinh Tế'];
  }

  if (title.includes(' Không Gian ')) {
    return title.replace(' Không Gian ', ' Không Gian\n').split('\n');
  }

  return [title];
}

export default function DemoHero({ data }: DemoHeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = data.images || (data.image ? [data.image] : []);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const title = normalizeHeroTitle(data.title);
  const titleLines = getTitleLines(title);
  const primaryLabel = data.primaryActionLabel?.trim() || 'Nhận tư vấn thiết kế';

  return (
    <section className="relative h-[600px] md:h-[650px] flex items-center overflow-hidden bg-brand-primary">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.src}
            alt={slide.alt || `Interior Slide ${idx + 1}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100 animate-[pulse_10s_infinite_alternate]" : "opacity-0"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/25" style={{ zIndex: 2 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" style={{ zIndex: 2 }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1
            className="text-[clamp(3.1rem,6vw,5.25rem)] font-bold text-white leading-[1.08] tracking-normal mb-6 drop-shadow-md [overflow-wrap:normal] [word-break:keep-all] [text-wrap:normal] [hyphens:none]"
            style={{
              fontFamily: 'Cambria, "Times New Roman", Georgia, serif',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            {titleLines.map((line) => (
              <span className="block whitespace-nowrap" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p 
            className="font-sans text-base sm:text-lg text-white leading-relaxed mb-10 max-w-2xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            {data.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-block px-10 py-5 bg-white font-sans text-xs font-semibold uppercase tracking-widest text-center transition-all duration-300 hover:bg-[#f6e5c8] hover:scale-[1.02] active:scale-95"
              style={{ color: '#0a1422' }}
            >
              <span className="text-[#0a1422]">{primaryLabel}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-12 hidden md:block">
        <div className="flex items-center gap-4 text-white/62 font-sans text-[10px] tracking-[0.3em] uppercase">
          <span>Scroll to explore</span>
          <div className="w-12 h-px bg-white/35" />
        </div>
      </div>
    </section>
  );
}
