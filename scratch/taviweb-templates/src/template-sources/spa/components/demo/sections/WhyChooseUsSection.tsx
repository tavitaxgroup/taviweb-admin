import React from "react";
import * as Lucide from "lucide-react";

interface WhyChooseUsSectionProps {
  features?: string[];
}

export function WhyChooseUsSection({ features }: WhyChooseUsSectionProps) {
  const values = features && features.length > 0
    ? features.map((feat, idx) => {
        const parts = feat.split(/[:\-]/);
        const title = parts[0]?.trim() || "Ưu điểm";
        const description = parts.slice(1).join("-")?.trim() || "Liệu trình chăm sóc và trị liệu chuẩn spa chuyên nghiệp.";
        const iconNames = ["Leaf", "Sparkles", "Award"];
        const iconName = iconNames[idx % iconNames.length];
        const IconComponent = (Lucide as any)[iconName] || Lucide.Leaf;
        
        return {
          icon: <IconComponent className="text-primary" size={28} />,
          title,
          description
        };
      })
    : [
        {
          icon: <Lucide.Leaf className="text-primary" size={28} />,
          title: "Không gian yên tĩnh",
          description: "Tách biệt hoàn toàn với tiếng ồn đô thị, mang lại sự bình yên tuyệt đối."
        },
        {
          icon: <Lucide.Sparkles className="text-primary" size={28} />,
          title: "Kỹ thuật viên tận tâm",
          description: "Đội ngũ được đào tạo bài bản, thấu hiểu từng nhu cầu của khách hàng."
        },
        {
          icon: <Lucide.Award className="text-primary" size={28} />,
          title: "Sản phẩm cao cấp",
          description: "Cam kết sử dụng các dòng mỹ phẩm hữu cơ và công nghệ hàng đầu thế giới."
        }
      ];

  return (
    <section id="why-choose-us" className="py-20 px-5 md:px-16 bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {values.map((val, idx) => (
          <div
            key={idx}
            className="text-center group flex flex-col items-center p-6 bg-white/50 rounded-3xl border border-white/80 shadow-sm hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md border border-primary/5 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
              {val.icon}
            </div>
            <h4 className="font-display text-2xl font-medium mb-3 text-on-background">
              {val.title}
            </h4>
            <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-sm">
              {val.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
