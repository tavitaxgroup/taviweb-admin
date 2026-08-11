import { motion } from 'motion/react';
import { Scissors } from 'lucide-react';
import { ServiceItem } from '../../../types/demo';

interface ServicesSectionProps {
  services: ServiceItem[];
  onBookClick: () => void;
}

export default function ServicesSection({ services, onBookClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#f7f3f2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Title Block */}
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold text-[#855316] uppercase tracking-[0.2em] mb-4 block"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Menu dịch vụ
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#121315] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Trải nghiệm chăm sóc tóc chuyên nghiệp
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Services List (Left Column) */}
          <div className="lg:col-span-7 space-y-8">
            {services.map((item, idx) => (
              <motion.div 
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="flex items-end justify-between mb-2">
                  <h3 
                    className="text-lg md:text-xl font-bold text-[#121315] group-hover:text-[#855316] transition-colors duration-300"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {item.name}
                  </h3>
                  <div className="border-b border-dotted border-gray-400 grow mx-3 mb-1.5" />
                  <span 
                    className="text-sm md:text-base font-bold text-[#121315] whitespace-nowrap uppercase tracking-wider"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                  >
                    {item.price}
                  </span>
                </div>
                <p 
                  className="text-sm text-gray-500 italic font-normal"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Featured Dynamic Booking Callout Box (Right Column) */}
          <div className="lg:col-span-5 h-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#ffdcbd] p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden rounded-sm min-h-[320px] shadow-sm"
            >
              <div className="relative z-10">
                <h4 
                  className="text-2xl font-bold text-[#121315] mb-4"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Sẵn sàng cho một diện mạo mới?
                </h4>
                <p 
                  className="text-sm md:text-base text-gray-700 mb-10 font-normal leading-relaxed"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                >
                  Đừng bỏ lỡ cơ hội được tư vấn miễn phí bởi các chuyên gia tạo mẫu tóc hàng đầu tại salon của chúng tôi. Hãy đặt lịch hôm nay!
                </p>
                <button 
                  onClick={onBookClick}
                  className="bg-[#121315] text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#855316] transition-all duration-300 active:scale-95 shadow-sm"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                >
                  Đặt lịch làm tóc
                </button>
              </div>

              {/* Watermark Icon in background */}
              <div className="absolute -right-12 -bottom-12 text-[#121315]/5 select-none pointer-events-none">
                <Scissors size={220} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
