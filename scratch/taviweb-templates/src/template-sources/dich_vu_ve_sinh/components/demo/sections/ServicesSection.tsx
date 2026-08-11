import { Building2, Home, Building, Hammer, Armchair, HelpCircle, ChevronRight, LucideIcon } from "lucide-react";
import { ServiceItem } from "../../../types/demo";

interface ServicesSectionProps {
  services: ServiceItem[];
  phoneValue?: string;
}

const serviceIconMap: Record<string, LucideIcon> = {
  corporate_fare: Building2,
  home_work: Home,
  apartment: Building,
  construction: Hammer,
  chair: Armchair,
};

export function ServicesSection({ services, phoneValue }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="font-label text-xs font-bold text-[#16a34a] tracking-widest uppercase">
            Bảng dịch vụ
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4 leading-tight">
            Dịch Vụ Chuyên Nghiệp
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Chúng tôi cung cấp giải pháp vệ sinh toàn diện cho mọi nhu cầu, từ văn phòng doanh nghiệp đến căn hộ tư nhân cao cấp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComp = serviceIconMap[service.icon] || HelpCircle;
            return (
              <div
                key={service.id}
                className="group relative bg-white border border-slate-200/80 p-6 md:p-8 rounded-lg shadow-sm transition-all duration-200 hover:border-[#16a34a] hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center rounded-md group-hover:scale-105 transition-transform duration-200">
                    <IconComp className="w-7 h-7" />
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 group-hover:bg-[#16a34a]/10 group-hover:text-[#16a34a] font-label text-[10px] font-bold rounded uppercase tracking-wider transition-colors">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-[#16a34a] transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-sans text-sm text-slate-500 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <a
                  href={phoneValue ? `tel:${phoneValue.replace(/\s+/g, "")}` : "#contact"}
                  className="font-label text-xs font-bold text-[#16a34a] flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                >
                  Nhận tư vấn báo giá <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}

          {/* Custom Placeholder Service Card */}
          <div className="bg-[#16a34a]/5 border border-dashed border-[#16a34a]/40 p-6 md:p-8 rounded-lg flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-[#16a34a]/15 text-[#16a34a] flex items-center justify-center rounded-full mb-4">
              <span className="text-xl font-bold">...</span>
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
              Dịch vụ khác?
            </h3>
            <p className="font-sans text-sm text-slate-500 mb-6 max-w-xs">
              Hãy liên hệ với chúng tôi để nhận báo giá cho dịch vụ vệ sinh riêng biệt theo yêu cầu của bạn.
            </p>
            <a
              href="#contact"
              className="font-label text-xs font-bold bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-md transition-all shadow-sm"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
