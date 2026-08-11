import React from 'react';
import { DemoPageData } from '../../../types/demo';

interface AboutSectionProps {
  data: DemoPageData;
}

const ABOUT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop';

export default function AboutSection({ data }: AboutSectionProps) {
  const rawAboutImageSrc = data.about.image?.src || '';
  const aboutImageSrc =
    rawAboutImageSrc.includes('photo-1544078751-58feb2d77498')
      ? ABOUT_FALLBACK_IMAGE
      : rawAboutImageSrc || ABOUT_FALLBACK_IMAGE;
  const aboutImageAlt =
    data.about.image?.alt || 'Không gian chuẩn bị chụp ảnh cưới lãng mạn';

  return (
    <section className="py-24 bg-[#fff8f8]" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text content side */}
          <div className="space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#834767]">
              {data.about.badge}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-[#201a1c]">
              {data.about.title}
            </h2>
            <div className="w-12 h-[2px] bg-[#e1c292]" />
            <p className="font-sans text-[#6c5962] text-base md:text-lg leading-relaxed font-light">
              {data.about.description}
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact-cta" 
                className="inline-flex items-center text-[#834767] font-sans text-sm uppercase tracking-widest font-bold border-b-2 border-[#834767] pb-1 hover:text-[#201a1c] hover:border-[#201a1c] transition-all"
              >
                Khám phá dịch vụ &rarr;
              </a>
            </div>
          </div>

          {/* Image side with soft frame decoration */}
          <div className="relative">
            {/* Elegant tinted outline border frame */}
            <div className="absolute -inset-4 border border-[#e1c292]/40 rounded-lg -z-10 translate-x-3 translate-y-3 hidden sm:block" />
            
            <div className="overflow-hidden rounded-lg shadow-xl shadow-[#834767]/5 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={aboutImageSrc}
                alt={aboutImageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(event) => {
                  const image = event.currentTarget;
                  image.onerror = null;
                  image.src = ABOUT_FALLBACK_IMAGE;
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
