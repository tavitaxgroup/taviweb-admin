import React from 'react';
import { Calendar, Wrench, Zap, Disc, ClipboardCheck, ArrowRight, Shield } from 'lucide-react';
import { ServiceItem } from '../../../types/demo';

interface ServicesSectionProps {
  services: ServiceItem[];
}

// Maps specific key string to corresponding Lucide icon
function getServiceIcon(iconKey: string) {
  switch (iconKey) {
    case 'calendar_today':
      return <Calendar className="w-8 h-8 text-[#fd761a]" />;
    case 'settings_suggest':
      return <Wrench className="w-8 h-8 text-[#fd761a]" />;
    case 'bolt':
      return <Zap className="w-8 h-8 text-[#fd761a]" />;
    case 'tire_repair':
      return <Disc className="w-8 h-8 text-[#fd761a]" />;
    case 'fact_check':
      return <ClipboardCheck className="w-8 h-8 text-[#fd761a]" />;
    default:
      return <Shield className="w-8 h-8 text-[#fd761a]" />;
  }
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#f6f3f4] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-xs font-bold text-[#fd761a] tracking-widest uppercase">
            HẠNG MỤC DỊCH VỤ
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#0a1422] tracking-tight mt-2">
            Dịch Vụ Chuyên Nghiệp
          </h2>
          <p className="text-[#44474c] max-w-2xl mx-auto text-base md:text-lg mt-3 leading-relaxed">
            Chúng tôi cung cấp giải pháp toàn diện cho xế yêu của bạn, đảm bảo xe luôn vận hành êm ái, bền bỉ và tuyệt đối an toàn.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-8 rounded-2xl border border-[#c5c6cc]/20 hover:border-[#fd761a] transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-[#fd761a]/5 w-fit rounded-xl mb-6">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="font-sans font-bold text-xl text-[#0a1422] tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-[#44474c] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              
              <a 
                href={service.href || '#contact'}
                className="font-mono text-xs font-bold text-[#0a1422] hover:text-[#fd761a] flex items-center gap-1.5 group-hover:gap-3 transition-all uppercase tracking-wider"
              >
                Chi tiết 
                <ArrowRight className="w-4 h-4 transition-transform duration-300" />
              </a>
            </div>
          ))}

          {/* Integrated Dynamic CTA Card */}
          <div className="bg-[#0a1422] p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden group">
            {/* Ambient subtle light overlay */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#fd761a]/10 blur-3xl pointer-events-none group-hover:bg-[#fd761a]/20 transition-all duration-500" />
            
            <p className="text-[#fd761a] font-mono text-xs font-bold tracking-widest mb-2">
              BẠN CẦN TƯ VẤN THÊM?
            </p>
            <h3 className="text-white font-sans font-extrabold text-xl md:text-2xl tracking-tight mb-6 leading-snug">
              Kỹ thuật viên của chúng tôi luôn sẵn sàng hỗ trợ trực tuyến
            </h3>
            
            <a 
              href="#contact"
              className="bg-[#fd761a] hover:bg-[#fd761a]/90 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#fd761a]/15 w-full sm:w-auto"
            >
              Đặt Lịch Kiểm Tra Xe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
