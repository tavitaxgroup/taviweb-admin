import { motion } from 'motion/react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  hero: HeroData;
}

export default function DemoHero({ hero }: DemoHeroProps) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden bg-[#FAFAFA]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.backgroundImage} 
          alt={hero.italicSubtitle}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Elegant Gradient Overlay - from lighter/warm on left to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent md:block hidden" />
        {/* On mobile, full warm overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/80 md:hidden block" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex justify-start">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-6xl font-extrabold text-[#121315] leading-[1.1] tracking-tighter mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
              id="hero-title"
            >
              {hero.title}
              <span className="italic block mt-2 text-[#855316] font-normal tracking-tighter">
                {hero.italicSubtitle}
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 mb-10 max-w-lg font-normal leading-relaxed"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            id="hero-description"
          >
            {hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => handleScroll('contact')}
              className="bg-[#855316] text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#121315] hover:shadow-md transition-all duration-300 text-center"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {hero.primaryCtaText}
            </button>
            <button 
              onClick={() => handleScroll('services')}
              className="border border-[#855316] text-[#855316] px-8 py-4 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#855316]/5 transition-all duration-300 text-center"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {hero.secondaryCtaText}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
