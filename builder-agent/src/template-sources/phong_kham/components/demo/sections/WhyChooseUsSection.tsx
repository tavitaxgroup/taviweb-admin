"use client";
import { motion } from 'motion/react';
import { Cpu, Users, Heart } from 'lucide-react';

export default function WhyChooseUsSection() {
  const items = [
    {
      icon: <Cpu className="w-10 h-10 text-emerald-400" />,
      title: 'Công Nghệ Mới',
      description: 'Trang thiết bị chẩn đoán hình ảnh và xét nghiệm đạt chuẩn quốc tế.'
    },
    {
      icon: <Users className="w-10 h-10 text-emerald-400" />,
      title: 'Bác Sĩ Đầu Ngành',
      description: 'Đội ngũ y bác sĩ có trình độ chuyên môn cao, nhiều năm tu nghiệp nước ngoài.'
    },
    {
      icon: <Heart className="w-10 h-10 text-emerald-400" />,
      title: 'Thân Thiện',
      description: 'Môi trường phòng khám ấm cúng, phù hợp cho cả trẻ nhỏ và người cao tuổi.'
    }
  ];

  return (
    <section className="py-20 bg-[#004ac6] text-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Tại Sao Chọn Chúng Tôi?
            </h2>
            <p className="text-blue-100 font-sans text-base leading-relaxed">
              Chúng tôi cam kết kết hợp công nghệ hiện đại bậc nhất với sự thấu cảm, chu đáo trong từng dịch vụ chăm sóc.
            </p>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-white/10 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-display text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-blue-100/80 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
