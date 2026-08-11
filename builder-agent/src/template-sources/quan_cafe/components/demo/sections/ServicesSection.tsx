import React from 'react';
import { Coffee, Users, ShoppingBag, Camera, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  local_cafe: Coffee,
  groups: Users,
  shopping_bag: ShoppingBag,
  photo_camera: Camera,
  celebration: Sparkles,
};

export default function ServicesSection({ data }: SectionProps) {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#fff8f5]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        
        {/* Header with Slider Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#553722] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
              CHÚNG TÔI CÓ GÌ?
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#553722] mb-4 leading-tight">
              Trải nghiệm tại {data.business.name}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#50453e] opacity-90 leading-relaxed">
              Chúng tôi không chỉ phục vụ thức uống, chúng tôi kiến tạo không gian để bạn tìm thấy chính mình.
            </p>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-[#553722] hover:bg-[#553722] hover:text-white transition-all cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-[#553722] hover:bg-[#553722] hover:text-white transition-all cursor-pointer">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Coffee;
            return (
              <div
                key={service.id}
                className="group bg-white p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm hover:shadow-xl hover:bg-[#553722] hover:border-[#553722] transition-all duration-300 hover:-translate-y-2 flex flex-col items-start"
              >
                <div className="w-12 h-12 bg-[#efe0cd] text-[#553722] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-lg font-bold text-[#553722] mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-[#50453e] leading-relaxed group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
