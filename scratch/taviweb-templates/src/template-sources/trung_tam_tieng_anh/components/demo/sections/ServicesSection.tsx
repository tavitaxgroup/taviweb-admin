import React from 'react';
import * as Lucide from 'lucide-react';
import { ServiceItem } from '../../../types/demo';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="khoa-hoc" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight mb-4">
            Chương Trình Đào Tạo
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            Giải pháp giáo dục tối ưu cho mọi lứa tuổi và lộ trình học tập cá nhân hóa.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((svc) => {
            // Resolve Icon from Lucide
            const IconComponent = (Lucide as any)[svc.icon] || Lucide.GraduationCap;
            
            return (
              <div
                key={svc.id}
                className="group p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center mb-6 transition-colors">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
