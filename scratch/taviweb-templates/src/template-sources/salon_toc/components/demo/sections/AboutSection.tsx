import React, { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AboutData } from '../../../types/demo';

interface AboutSectionProps {
  about: AboutData;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const handleScrollToServices = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Visual Column with Offset Decorative Peach Block */}
        <div className="md:col-span-6 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-gray-100 relative overflow-hidden group rounded-sm z-10 shadow-sm"
          >
            <img 
              src={about.image} 
              alt={about.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Decorative Offset Backdrop - warm Peach color #ffdcbd */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#ffdcbd] -z-10 hidden md:block rounded-sm" />
        </div>

        {/* Story / Text Column */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span 
              className="text-xs font-bold text-[#855316] uppercase tracking-[0.2em] mb-4 block"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {about.subtitle}
            </span>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#121315] mb-6 tracking-tight leading-snug"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {about.title}
            </h2>
            <p 
              className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed font-normal"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {about.description}
            </p>
            <a 
              href="#services"
              onClick={handleScrollToServices}
              className="text-xs font-bold text-[#121315] uppercase tracking-widest border-b-2 border-[#855316] pb-1 hover:text-[#855316] transition-all duration-300 inline-block"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              Khám phá dịch vụ
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
