import { AboutInfo } from '../../../types/demo';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface AboutSectionProps {
  about: AboutInfo;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-50 shadow-lg border border-gray-100">
              <img
                src={about.image.src}
                alt={about.image.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Soft backdrop overlay decorative element */}
            <div className="absolute -top-4 -left-4 -z-10 h-full w-full rounded-3xl bg-teal-50" />
          </motion.div>

          {/* Text Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {about.badge && (
              <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase font-sans">
                {about.badge}
              </span>
            )}
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-sans">
              {about.title}
            </h2>
            {about.subtitle && (
              <p className="mt-3 text-lg font-medium text-teal-850/80 font-sans">
                {about.subtitle}
              </p>
            )}
            
            <p className="mt-6 text-base leading-relaxed text-gray-650 font-sans">
              {about.description}
            </p>

            {/* Checklist items */}
            {about.features && about.features.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {about.features.map((feature, idx) => (
                  <div key={`feat-${idx}`} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 font-sans">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
