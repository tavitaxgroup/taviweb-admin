import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ServiceItem } from "../../../types/demo";

interface ServicesProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesProps) {
  return (
    <section 
      className="py-24 bg-[#fcf9f4] overflow-hidden" 
      id="services-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1c19] mb-6">
            Trải Nghiệm Tại L'ÉCHELLE
          </h2>
          <p className="font-sans text-sm md:text-base text-[#574240]">
            Chúng tôi mang đến sự tinh tế trong từng khoảnh khắc, từ bữa tối lãng mạn đến những sự kiện riêng tư đẳng cấp.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#f0ede9] border border-[#dec0bd]/20 shadow-md flex flex-col justify-end"
              id={`service-card-${index}`}
            >
              {/* Fullbleed Image */}
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={service.title}
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
              </div>

              {/* Service details overlay */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                <h3 className="text-white font-serif text-xl md:text-2xl font-semibold mb-2">
                  {service.title}
                </h3>
                
                {/* Expandable description on hover */}
                <p className="text-white/70 font-sans text-xs md:text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                  {service.description}
                </p>

                <a 
                  href={service.href} 
                  className="text-[#f2cf8a] hover:text-white font-semibold text-xs md:text-sm uppercase flex items-center gap-2 group/link tracking-wider drop-shadow-sm"
                >
                  Tìm hiểu thêm 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
