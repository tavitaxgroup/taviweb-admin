import * as Icons from 'lucide-react';
import { ServiceItem } from '../../../types/demo';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#ffffff] border-t border-brand-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-20 gap-8">
          <div className="max-w-xl">
            <span className="inline-block font-sans text-xs font-semibold tracking-wider text-brand-secondary uppercase mb-4">
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-primary">
              Giải pháp toàn diện cho mọi không gian sống.
            </h2>
          </div>
          <div className="hidden md:block w-36 h-px bg-brand-secondary/30 mb-4"></div>
        </div>

        {/* 5-Column Symmetrical Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-brand-secondary/15 border border-brand-secondary/15">
          {services.map((service, idx) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Compass;

            return (
              <div
                key={idx}
                className="bg-[#ffffff] p-8 sm:p-10 flex flex-col justify-between hover:bg-brand-primary group transition-all duration-500 h-full min-h-[300px] cursor-pointer"
              >
                {/* Icon wrapper */}
                <div className="text-brand-secondary group-hover:text-white transition-colors duration-500 mb-12">
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>

                {/* Content wrapper */}
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-brand-primary group-hover:text-white transition-colors duration-500 mb-4">
                    {service.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-primary/70 group-hover:text-white/85 transition-colors duration-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
