import React from "react";
import * as Icons from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ServicesSectionProps {
  data: DemoPageData;
}

// Simple and robust Lucide icon mapper
function renderServiceIcon(iconName: string) {
  const norm = iconName.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (norm.includes("dumbbell") || norm.includes("gym") || norm.includes("fitness")) {
    return <Icons.Dumbbell className="h-8 w-8 text-[#A3E635]" />;
  }
  if (norm.includes("user") || norm.includes("personal") || norm.includes("pt")) {
    return <Icons.UserCheck className="h-8 w-8 text-[#A3E635]" />;
  }
  if (norm.includes("group") || norm.includes("class") || norm.includes("users")) {
    return <Icons.Users className="h-8 w-8 text-[#A3E635]" />;
  }
  if (norm.includes("clipboard") || norm.includes("advice") || norm.includes("plan") || norm.includes("assignment")) {
    return <Icons.ClipboardCheck className="h-8 w-8 text-[#A3E635]" />;
  }
  if (norm.includes("heart") || norm.includes("yoga") || norm.includes("cardio") || norm.includes("self")) {
    return <Icons.Heart className="h-8 w-8 text-[#A3E635]" />;
  }
  
  // Default fallback icon
  return <Icons.Dumbbell className="h-8 w-8 text-[#A3E635]" />;
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="py-20 bg-[#111827] text-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6" id="services-header">
          <div className="max-w-xl">
            <span className="text-[#A3E635] font-archivo font-bold uppercase tracking-wider text-sm block mb-2">
              Dịch vụ của chúng tôi
            </span>
            <h2 className="font-anton text-4xl md:text-5xl uppercase leading-tight" id="services-title">
              GIẢI PHÁP TẬP LUYỆN TOÀN DIỆN
            </h2>
          </div>
          <p className="font-archivo text-[#7d8497] max-w-sm text-sm md:text-base leading-relaxed" id="services-subtitle">
            Lựa chọn phương pháp phù hợp nhất với mục tiêu cá nhân của bạn để đạt hiệu quả tối đa.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="services-grid">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="group bg-[#141b2b] p-6 border-b-4 border-transparent hover:border-[#A3E635] transition-all duration-200 cursor-pointer flex flex-col justify-between"
              style={{ borderRadius: "0px" }}
              id={`service-card-${service.id}`}
            >
              <div>
                <div className="mb-6 inline-block" id={`service-icon-${service.id}`}>
                  {renderServiceIcon(service.icon)}
                </div>
                <h3 className="font-anton text-xl uppercase mb-3 text-white group-hover:text-[#A3E635] transition-colors">
                  {service.title}
                </h3>
                <p className="font-archivo text-[#7d8497] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
