import React from "react";
import { ServiceItem } from "../../../types/demo";

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  if (!services || services.length === 0) return null;

  // Let's divide services into standard (first 3) and special bento (remaining)
  const topServices = services.slice(0, 3);
  const bottomServices = services.slice(3);

  return (
    <section id="services" className="py-20 px-5 md:px-16 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs md:text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            DỊCH VỤ TRỊ LIỆU
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-on-background mb-4">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Top Row: 3 Columns */}
          {topServices.map((service) => (
            <div
              key={service.id}
              className="group p-3 rounded-3xl bg-surface-container-low hover:bg-surface-container transition-all duration-500 soft-shadow flex flex-col h-full border border-white/50"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                  src={service.image.src}
                  alt={service.image.alt}
                  loading="lazy"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <span className="inline-block self-start px-3 py-1 rounded-full bg-tertiary/15 text-tertiary font-sans text-xs font-semibold mb-3">
                  {service.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-medium text-on-background mb-2">
                  {service.name}
                </h3>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom Row: Bento style */}
          {bottomServices.length > 0 && (
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Bento Card 4: Text Focus (col-span-1) */}
              {bottomServices[0] && (
                <div className="group p-6 rounded-3xl bg-surface-container-low hover:bg-surface-container transition-all duration-500 soft-shadow flex flex-col justify-center border border-white/50">
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-tertiary/15 text-tertiary font-sans text-xs font-semibold mb-4">
                    {bottomServices[0].category}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-on-background mb-3">
                    {bottomServices[0].name}
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                    {bottomServices[0].description}
                  </p>
                </div>
              )}

              {/* Bento Card 5: Landscape side-by-side (col-span-2) */}
              {bottomServices[1] && (
                <div className="group md:col-span-2 p-4 rounded-3xl bg-surface-container-low hover:bg-surface-container transition-all duration-500 soft-shadow flex flex-col md:flex-row gap-6 items-center border border-white/50">
                  <div className="md:w-1/2 p-4 flex flex-col justify-center">
                    <span className="inline-block self-start px-3 py-1 rounded-full bg-tertiary/15 text-tertiary font-sans text-xs font-semibold mb-4">
                      {bottomServices[1].category}
                    </span>
                    <h3 className="font-display text-2xl font-medium text-on-background mb-3">
                      {bottomServices[1].name}
                    </h3>
                    <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                      {bottomServices[1].description}
                    </p>
                  </div>
                  <div className="md:w-1/2 w-full h-48 md:h-full min-h-[160px] rounded-2xl overflow-hidden shadow-sm relative">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                      src={bottomServices[1].image.src}
                      alt={bottomServices[1].image.alt}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
