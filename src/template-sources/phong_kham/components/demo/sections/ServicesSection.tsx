import { motion } from 'motion/react';
import { 
  FileText, 
  Brain, 
  FlaskConical, 
  Users, 
  Clock, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { ServiceItem } from '../../../types/demo';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clinical_notes':
        return <Stethoscope className="w-8 h-8" />;
      case 'psychiatry':
        return <Brain className="w-8 h-8" />;
      case 'biotech':
        return <FlaskConical className="w-8 h-8" />;
      case 'family_restroom':
        return <Users className="w-8 h-8" />;
      case 'update':
        return <Clock className="w-8 h-8" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  const handleScrollToContact = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 15 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-blue-100 text-[#004ac6] rounded-full text-xs font-bold tracking-wider"
          >
            CHUYÊN KHOA & DỊCH VỤ
          </motion.div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            Dịch Vụ Chăm Sóc Sức Khỏe
          </h2>
          <p className="font-sans text-slate-600 max-w-2xl mx-auto text-base">
            Chúng tôi cung cấp các gói dịch vụ y tế đa dạng, đáp ứng mọi nhu cầu kiểm tra và điều trị của gia đình bạn.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {services.map((service, index) => {
            // first two services take col-span-3, others take col-span-2
            const isLarge = index < 2;
            const gridClass = isLarge ? 'md:col-span-3' : 'md:col-span-2';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={handleScrollToContact}
                className={`${gridClass} bg-white p-8 rounded-2xl shadow-xs border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  index % 3 === 0 
                    ? 'bg-blue-100 text-[#004ac6] group-hover:bg-[#004ac6] group-hover:text-white' 
                    : index % 3 === 1 
                      ? 'bg-emerald-100 text-[#006329] group-hover:bg-[#006329] group-hover:text-white' 
                      : 'bg-cyan-100 text-cyan-800 group-hover:bg-cyan-800 group-hover:text-white'
                }`}>
                  {getIcon(service.icon)}
                </div>

                <h3 className="font-display text-xl font-bold text-slate-800 mb-3 group-hover:text-[#004ac6] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {isLarge && (
                  <div className="inline-flex items-center gap-2 text-[#004ac6] font-bold text-sm">
                    Đăng ký tư vấn
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
