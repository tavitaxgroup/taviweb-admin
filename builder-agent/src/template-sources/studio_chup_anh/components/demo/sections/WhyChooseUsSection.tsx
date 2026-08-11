import React from 'react';
import { Sparkles, Heart, Compass, ShieldCheck } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface WhyChooseUsSectionProps {
  data: DemoPageData;
}

export default function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  const items = data.whyChooseUs.items;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fef0f4]/40 border-y border-[#e1c292]/10" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#834767]">
            {data.whyChooseUs.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#201a1c] tracking-tight">
            Giá Trị Khác Biệt Tại {data.business.name}
          </h2>
          <p className="font-sans text-[#6c5962] text-sm leading-relaxed max-w-xl mx-auto font-light">
            Chúng tôi cam kết đồng hành để vẽ nên bức tranh hạnh phúc hoàn hảo nhất của cuộc đời bạn.
          </p>
          <div className="w-16 h-[2px] bg-[#e1c292] mx-auto mt-4" />
        </div>

        {/* 3 Pillars layout with description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, index) => {
            // Select appropriate icon
            let icon = <Compass className="w-6 h-6 text-[#834767]" />;
            if (index === 1) icon = <Heart className="w-6 h-6 text-[#834767]" />;
            if (index === 2) icon = <ShieldCheck className="w-6 h-6 text-[#834767]" />;

            return (
              <div 
                key={index} 
                className="bg-white p-10 rounded-sm border border-[#e1c292]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-5"
                id={`why-item-${index}`}
              >
                <div className="p-4 bg-[#fef0f4] rounded-full">
                  {icon}
                </div>
                
                <h3 className="font-serif text-xl font-medium text-[#201a1c] tracking-wide">
                  {item.title}
                </h3>
                
                <p className="font-sans text-[#6c5962] text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
