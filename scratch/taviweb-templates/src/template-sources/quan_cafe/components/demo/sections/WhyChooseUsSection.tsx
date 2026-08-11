import React from 'react';
import { Leaf, Compass, HeartHandshake, HelpCircle } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

const valueIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  eco: Leaf,
  architecture: Compass,
  volunteer_activism: HeartHandshake,
};

export default function WhyChooseUsSection({ data }: SectionProps) {
  const whyChooseUs = data.whyChooseUs;

  if (!whyChooseUs) return null;

  return (
    <section id="whychooseus" className="py-20 md:py-32 bg-[#fff8f5] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#553722]/10 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant/10">
              <img
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-102"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXr9OXJluDAnQzv8UziXUC1sx-Y4WPXqxHSVuskfPq7ntEFLdzZ267VlEni5bpY6pn3jzklpvbzdVoLAvgYXIbTNcHVqPGE_Ky9M3JpluD01KgmTp3eOZoJtaO-E_lNLmMPt4oazU3thZ6JFoZjf_jLZPkrFTcgLRIJC2Vj4hfxAdEvM6Y9FjVnGAB90mfsSeyn0lepbDJi0qsMXIolGzNaaxRitMh-prxdhxccArnoYePAMpkzgAx"
                alt="Tuyển lựa hạt cà phê mộc mạc"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Copy Right */}
          <div className="lg:col-span-7">
            <span className="text-[#553722] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 sm:mb-6 block">
              {whyChooseUs.badge}
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#553722] mb-10 leading-tight">
              {whyChooseUs.title}
            </h2>
            
            <div className="space-y-10">
              {whyChooseUs.items.map((item) => {
                const IconComponent = valueIconMap[item.icon] || HelpCircle;
                return (
                  <div key={item.id} className="flex gap-6 sm:gap-8 group">
                    <div className="w-14 h-14 shrink-0 bg-[#ffdcc6] flex items-center justify-center rounded-2xl group-hover:bg-[#553722] group-hover:text-white text-[#553722] transition-all duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold text-[#553722] mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-[#50453e] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
