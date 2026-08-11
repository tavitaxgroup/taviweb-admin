import React from "react";
import { motion } from "motion/react";
import { AboutData } from "../../../types/demo";

interface AboutProps {
  about: AboutData;
}

export default function AboutSection({ about }: AboutProps) {
  return (
    <section 
      className="py-24 bg-[#fcf9f4] relative overflow-hidden" 
      id="about-section"
    >
      {/* Decorative blurred soft ambient highlights */}
      <div className="absolute -right-20 top-40 w-96 h-96 bg-[#5f030a]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-40 w-96 h-96 bg-[#7c580f]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Experience Badge */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-square bg-[#e5e2dd] overflow-hidden border border-[#dec0bd]/20"
              >
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Portrait of master chef plating meticulously"
                  src={about.image}
                />
              </motion.div>
              
              {about.experienceYears && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 bg-[#5f030a] p-8 hidden md:block text-white shadow-xl"
                  id="experience-badge"
                >
                  <span className="text-4xl md:text-5xl font-serif font-bold block leading-none mb-1">
                    {about.experienceYears}+
                  </span>
                  <p className="text-xs font-semibold tracking-widest text-white/75 uppercase">
                    Năm kinh nghiệm
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Description Text and Stats */}
          <div className="w-full lg:w-1/2">
            {about.badge && (
              <span className="text-[#7c580f] font-semibold text-xs md:text-sm tracking-widest uppercase mb-4 block">
                {about.badge}
              </span>
            )}
            
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1c19] mb-8 leading-tight">
              {about.title}
            </h2>

            <div className="space-y-6 font-sans text-sm md:text-base text-[#574240] leading-relaxed">
              {about.content.split("\n\n").map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {about.stats && about.stats.length > 0 && (
              <div className="mt-12 flex gap-12 border-t border-[#dec0bd]/20 pt-8">
                {about.stats.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    <div>
                      <span className="text-[#7c580f] font-serif text-2xl md:text-3xl font-bold block">
                        {stat.value}
                      </span>
                      <p className="text-xs font-semibold tracking-widest text-[#574240] uppercase mt-1">
                        {stat.label}
                      </p>
                    </div>
                    {idx < about.stats!.length - 1 && (
                      <div className="w-px bg-[#dec0bd] h-12"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
