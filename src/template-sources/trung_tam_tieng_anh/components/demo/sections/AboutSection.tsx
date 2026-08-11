import React from 'react';
import * as Lucide from 'lucide-react';
import { AboutData } from '../../../types/demo';

interface AboutSectionProps {
  data: AboutData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="lo-trinh" className="py-20 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl -rotate-2 scale-[1.02]" />
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-xl border border-white">
              <img
                src={data.image.src}
                alt={data.image.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              {data.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10">
              {data.description}
            </p>

            {/* Features list */}
            {data.features && data.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {data.features.map((feat, idx) => {
                  // Resolve Icon from Lucide
                  const IconComponent = (Lucide as any)[feat.icon || 'CheckCircle'] || Lucide.CheckCircle;
                  return (
                    <div key={idx} className="flex flex-col items-start p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4">
                        <IconComponent size={20} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{feat.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
