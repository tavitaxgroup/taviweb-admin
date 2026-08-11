import React from "react";
import { Cpu, Award, ShieldCheck } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface WhyChooseUsSectionProps {
  data: DemoPageData;
}

export default function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  // Baseline high-quality clinic values
  const defaultValues = [
    {
      icon: Cpu,
      title: "Công nghệ tiên tiến",
      description: "Liên tục cập nhật các thiết bị hiện đại nhất được chứng nhận lâm sàng quốc tế."
    },
    {
      icon: Award,
      title: "Bác sĩ chuyên môn",
      description: "Đội ngũ y bác sĩ và kỹ thuật viên được đào tạo chuyên sâu, có chuyên môn nghiệp vụ cao."
    },
    {
      icon: ShieldCheck,
      title: "Quy trình chuẩn y khoa",
      description: "Mọi thao tác dịch vụ đều tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh, an toàn y khoa."
    }
  ];

  return (
    <section className="py-24 bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {defaultValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="flex flex-col items-center max-w-sm mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-brand-accent-light/40 mb-8 text-brand-accent-light">
                  <Icon size={36} className="stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-2xl font-medium mb-4">
                  {value.title}
                </h4>
                <p className="font-sans text-sm text-white/80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
