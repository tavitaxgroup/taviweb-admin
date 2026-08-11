import { ServiceInfo } from '../../../types/demo';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceInfo[];
}

// Map icon strings safely to Lucide icons with fallback to Stethoscope
function resolveIcon(iconName: string) {
  const IconComponent = (Icons as any)[iconName] || Icons.Stethoscope;
  return <IconComponent className="h-6 w-6 text-teal-750" />;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-sans">
            Dịch Vụ Chuyên Nghiệp
          </h2>
          <p className="mt-4 text-base text-gray-600 font-sans">
            Giải pháp chăm sóc răng miệng toàn diện, chất lượng cao dành cho mọi thành viên trong gia đình bạn.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id || `service-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl bg-white p-8 shadow-sm border border-gray-100/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-md cursor-default"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-750 group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
                {resolveIcon(service.iconName)}
              </div>

              {/* Service Title */}
              <h3 className="text-lg font-bold text-gray-900 font-sans group-hover:text-teal-850 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-gray-500 font-sans">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
