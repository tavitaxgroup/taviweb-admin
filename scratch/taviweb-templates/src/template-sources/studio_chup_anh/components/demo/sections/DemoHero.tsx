import React from 'react';
import { DemoPageData } from '../../../types/demo';

interface DemoHeroProps {
  data: DemoPageData;
}

const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop';

function normalizeHeroTitle(title?: string) {
  return (title || 'Lưu Giữ Khoảnh Khắc Vĩnh Cửu')
    .replace(/Khắ\s+c/g, 'Khắc')
    .replace(/\s+/g, ' ')
    .trim();
}

function getHeroTitleLines(title: string) {
  if (title === 'Lưu Giữ Khoảnh Khắc Vĩnh Cửu') {
    return ['Lưu Giữ', 'Khoảnh Khắc', 'Vĩnh Cửu'];
  }

  if (title.includes(' Khoảnh Khắc ')) {
    return title.replace(' Khoảnh Khắc ', '\nKhoảnh Khắc\n').split('\n');
  }

  return [title];
}

export default function DemoHero({ data }: DemoHeroProps) {
  const heroImageSrc = data.hero.image?.src || HERO_FALLBACK_IMAGE;
  const primaryActionHref = data.hero.primaryAction?.href || '#contact-cta';
  const primaryActionLabel =
    data.hero.primaryAction?.label?.trim() || 'ĐẶT LỊCH TƯ VẤN';
  const heroTitle = normalizeHeroTitle(data.hero.title);
  const heroTitleLines = getHeroTitleLines(heroTitle);

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('${heroImageSrc}')` }}
      id="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#201a1c]/60 via-[#201a1c]/45 to-[#fff8f8]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-12 mb-16">
        <h1
          className="text-[clamp(2.85rem,6.2vw,5rem)] font-bold tracking-normal text-white mb-6 drop-shadow-sm leading-[1.05] [overflow-wrap:normal] [word-break:keep-all] [text-wrap:normal] [hyphens:none]"
          id="hero-title"
          style={{
            fontFamily: 'Cambria, "Times New Roman", Georgia, serif',
            fontKerning: 'normal',
            textRendering: 'geometricPrecision',
          }}
        >
          {heroTitleLines.map((line) => (
            <span className="block whitespace-nowrap" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p
          className="font-sans text-base md:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md"
          id="hero-subtitle"
        >
          {data.hero.subtitle}
        </p>

        <div className="flex justify-center">
          <a
            href={primaryActionHref}
            className="inline-flex min-w-[220px] items-center justify-center bg-[#834767] hover:bg-[#6f3858] text-white font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-sm shadow-2xl ring-1 ring-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-white/20"
            id="hero-cta-btn"
          >
            <span className="text-white">{primaryActionLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
