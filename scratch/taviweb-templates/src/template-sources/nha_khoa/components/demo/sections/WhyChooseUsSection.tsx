import { motion } from 'motion/react';
import * as Lucide from 'lucide-react';

interface WhyChooseUsSectionProps {
  features?: string[];
}

export default function WhyChooseUsSection({ features }: WhyChooseUsSectionProps) {
  const points = features && features.length > 0
    ? features.map((feat, index) => {
        const parts = feat.split(/[:\-]/);
        const title = parts[0]?.trim() || "Ưu điểm";
        const desc = parts.slice(1).join("-")?.trim() || "Dịch vụ nha khoa chuyên nghiệp chuẩn y khoa.";
        const iconNames = ["MessageSquare", "ShieldAlert", "CheckCircle"];
        const iconName = iconNames[index % iconNames.length];
        
        return {
          title,
          desc,
          iconName
        };
      })
    : [
        {
          title: "Tư vấn rõ ràng",
          desc: "Mọi thắc mắc về lộ trình điều trị, chi phí hay chính sách bảo hành đều được tư vấn chi tiết, minh bạch ngay từ đầu.",
          iconName: "MessageSquare"
        },
        {
          title: "Không gian sạch",
          desc: "Phòng điều trị vô trùng khép kín nghiêm ngặt, sử dụng dụng cụ riêng biệt cho từng khách hàng để chống lây nhiễm chéo.",
          iconName: "ShieldAlert"
        },
        {
          title: "Dễ đặt lịch",
          desc: "Hệ thống tổng đài và đặt hẹn trực tuyến sẵn sàng 24/7, giúp bạn chủ động sắp xếp thời gian khám nhanh gọn, không chờ đợi.",
          iconName: "CheckCircle"
        }
      ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {points.map((point, index) => {
            const IconComponent = (Lucide as any)[point.iconName] || Lucide.CheckCircle;
            return (
              <motion.div
                key={`choose-${index}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 shadow-sm mb-6">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-sans mb-3">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-550 font-sans">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
