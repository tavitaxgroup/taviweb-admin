import React from 'react';
import { Camera, Shirt, Sparkles, BookOpen, Palette, CheckCircle, Heart, PenTool, HelpCircle } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface ServicesSectionProps {
  data: DemoPageData;
}

// Icon mapper helper
function getServiceIcon(iconName: string) {
  const props = { className: "w-5 h-5 text-[#834767]" };
  switch (iconName) {
    case 'Camera':
      return <Camera {...props} />;
    case 'Shirt':
      return <Shirt {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'BookOpen':
      return <BookOpen {...props} />;
    case 'Palette':
      return <Palette {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="py-24 bg-[#fff8f8] border-t border-[#e1c292]/10" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#834767]/70">
            {data.about.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#201a1c] tracking-tight">
            Dịch Vụ Nghệ Thuật Tại {data.business.name}
          </h2>
          <div className="w-16 h-[2px] bg-[#e1c292] mx-auto mt-4" />
        </div>

        {/* 5-column services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {data.services.map((service) => (
            <div 
              key={service.id}
              className="bg-[#fef0f4]/80 p-8 rounded-sm border border-[#e1c292]/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start space-y-4"
              id={`service-card-${service.id}`}
            >
              {/* Icon Container */}
              <div className="p-3 bg-white rounded-full shadow-sm">
                {getServiceIcon(service.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-medium text-[#201a1c]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[#6c5962] text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Pills: Why Choose Us highlights */}
        {data.whyChooseUs.items && data.whyChooseUs.items.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 flex-wrap" id="brand-pillars">
            {data.whyChooseUs.items.map((pillar, i) => {
              // Custom icons for each pillar
              let pillarIcon = <CheckCircle className="w-4 h-4 text-[#834767]" />;
              if (i === 1) pillarIcon = <Heart className="w-4 h-4 text-[#834767]" />;
              if (i === 2) pillarIcon = <PenTool className="w-4 h-4 text-[#834767]" />;

              return (
                <div 
                  key={i}
                  className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#e1c292]/30 shadow-sm text-xs font-sans font-semibold uppercase tracking-wider text-[#6c5962] hover:border-[#834767]/30 transition-colors"
                >
                  {pillarIcon}
                  <span>{pillar.title}</span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
