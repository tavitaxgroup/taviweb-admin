import React from "react";
import * as LucideIcons from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ServicesSectionProps {
  data: DemoPageData;
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  // Gracefully handle missing or empty services list
  if (!data.services || data.services.length === 0) {
    return null;
  }

  return (
    <section id="services-section" className="py-24 bg-brand-bg-low px-6 md:px-12 border-y border-brand-outline/20">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-primary mb-4">
            Dịch vụ
          </h2>
          <div className="w-20 h-1 bg-brand-accent-light mx-auto rounded-full"></div>
        </div>

        {/* Dynamic Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.services.map((service, index) => {
            // Dynamic Lucide icon resolution
            let IconComponent = LucideIcons.Sparkles;
            if (service.icon) {
              const mappedName = service.icon as keyof typeof LucideIcons;
              if (LucideIcons[mappedName]) {
                IconComponent = LucideIcons[mappedName] as any;
              } else if (service.icon === "User") {
                IconComponent = LucideIcons.User;
              } else if (service.icon === "Flower") {
                IconComponent = LucideIcons.Flower;
              } else if (service.icon === "Sparkles") {
                IconComponent = LucideIcons.Sparkles;
              } else if (service.icon === "Activity") {
                IconComponent = LucideIcons.Activity;
              } else if (service.icon === "Flame") {
                IconComponent = LucideIcons.Flame;
              }
            }

            return (
              <div
                key={service.id || index}
                className="group bg-white p-8 rounded-2xl border border-brand-outline/20 hover:border-brand-accent-light/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-brand-bg-low flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-brand-primary">
                    <IconComponent size={30} className="stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-brand-primary mb-4 leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm font-sans text-brand-secondary/80 leading-relaxed mt-auto">
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
