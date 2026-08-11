import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "motion/react";
import { DemoPageData } from "../../../types/demo";

interface DemoHeroProps {
  hero: DemoPageData["hero"];
}

export function DemoHero({ hero }: DemoHeroProps) {
  return (
    <header className="relative pt-20 overflow-hidden min-h-[85vh] flex items-center bg-slate-950 text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 grayscale-[20%]" 
          style={{ backgroundImage: `url('${hero.image.src}')` }}
        />
        {/* Soft, professional gradient overlay to ensure text is fully legible and looks premium */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 md:px-12 max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Visual Indicator Block */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-1 bg-amber-500 mb-8" 
            />

            {/* Dynamic Hero Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight max-w-4xl"
            >
              {hero.title}
            </motion.h1>

            {/* Dynamic Hero Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
            >
              {hero.description}
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href={hero.primaryAction.href}
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded transition-all duration-200 text-center uppercase tracking-wide shadow-lg hover:shadow-amber-500/20"
              >
                {hero.primaryAction.href.startsWith("tel:") && <Phone className="w-5 h-5 mr-2" />}
                <span>{hero.primaryAction.label}</span>
              </a>

              <a 
                href={hero.secondaryAction.href}
                className="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded transition-all duration-200 text-center uppercase tracking-wide"
              >
                <span>{hero.secondaryAction.label}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
