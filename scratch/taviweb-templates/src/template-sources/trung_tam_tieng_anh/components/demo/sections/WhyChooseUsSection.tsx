import React from 'react';
import * as Lucide from 'lucide-react';
import { AboutFeature } from '../../../types/demo';

interface WhyChooseUsSectionProps {
  features?: AboutFeature[];
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ features }) => {
  const items = features && features.length > 0
    ? features.map((feat, index) => {
        const iconNames = ["Target", "Heart", "Sparkles"];
        const iconName = feat.icon || iconNames[index % iconNames.length];
        
        return {
          title: feat.title,
          desc: feat.description,
          iconName
        };
      })
    : [
        {
          title: "Lộ trình rõ ràng",
          desc: "Hệ thống bài giảng được thiết kế khoa học, bám sát năng lực thực tế và mục tiêu cụ thể của từng học viên.",
          iconName: "Target"
        },
        {
          title: "Giáo viên tận tâm",
          desc: "Đội ngũ giảng viên 8.0+ IELTS, có bề dày sư phạm quốc tế và luôn sẵn sàng hỗ trợ, truyền lửa nhiệt huyết.",
          iconName: "Heart"
        },
        {
          title: "Cộng đồng năng động",
          desc: "Các hoạt động dã ngoại dồi dào, câu lạc bộ Debate hàng tuần, nâng cao kỹ năng mềm toàn diện.",
          iconName: "Sparkles"
        }
      ];

  return (
    <section className="py-20 md:py-24 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, index) => {
            const IconComponent = (Lucide as any)[item.iconName] || Lucide.CheckCircle;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
