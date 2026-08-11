import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AboutData } from '../../../types/demo';

interface AboutSectionProps {
  about: AboutData;
}

export default function AboutSection({ about }: AboutSectionProps) {
  const handleScroll = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Modern Laboratory Image with soft shadow */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              className="rounded-3xl shadow-2xl w-full h-[480px] object-cover"
              src={about.image.src}
              alt={about.image.alt}
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bde7eb] text-[#244d50] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              GIỚI THIỆU
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              {about.title}
            </h2>
            <p className="font-sans text-base text-slate-600 leading-relaxed">
              {about.description}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
            {about.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-1"
              >
                <h4 className="font-display font-extrabold text-[#004ac6] text-2xl md:text-3xl">
                  {stat.value}
                </h4>
                <div className="font-sans font-bold text-slate-800 text-sm">{stat.label}</div>
                <p className="text-xs text-slate-500 leading-normal">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Link */}
          {about.ctaLabel && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-4"
            >
              <button
                onClick={handleScroll}
                className="group inline-flex items-center gap-2 text-[#004ac6] font-bold hover:text-blue-700 transition-colors"
              >
                {about.ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
