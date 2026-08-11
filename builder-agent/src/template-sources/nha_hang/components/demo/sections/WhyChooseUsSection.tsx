import React from "react";
import { Award, Leaf, GlassWater } from "lucide-react";

export default function WhyChooseUsSection() {
  const pillars = [
    {
      icon: <Leaf className="w-8 h-8 text-[#7c580f]" />,
      title: "Nông sản hữu cơ xanh",
      desc: "Chúng tôi kết nối trực tiếp với các trang trại vệ tinh sạch tại Đà Lạt và Sa Pa, thu hoạch nông sản đầu mùa hữu cơ tinh khiết nhất."
    },
    {
      icon: <Award className="w-8 h-8 text-[#7c580f]" />,
      title: "Tuyệt tác chế tác thủ công",
      desc: "L'ÉCHELLE gìn giữ những kỹ thuật lên men, sấy sưởi, om hầm di sản truyền thống, kết hợp hài hòa cùng công nghệ ẩm thực hiện đại bậc nhất."
    },
    {
      icon: <GlassWater className="w-8 h-8 text-[#7c580f]" />,
      title: "Trải nghiệm may đo riêng",
      desc: "Mỗi bàn tiệc đều được thiết kế kịch bản phục vụ riêng biệt, từ nhạc nền, ánh sáng nến cho tới các chai vang tuyển chọn phù hợp khẩu vị."
    }
  ];

  return (
    <section className="py-24 bg-[#fcf9f4] border-b border-[#dec0bd]/20" id="why-choose-us-section">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[#7c580f] font-semibold text-xs md:text-sm tracking-widest uppercase mb-4 block">
            Giá trị cốt lõi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1c19]">
            Hành Trình Tinh Hoa Ẩm Thực
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center md:items-start text-center md:text-left p-8 bg-white border border-[#dec0bd]/15 shadow-sm hover:shadow-md transition-shadow duration-300"
              id={`why-choose-pillar-${idx}`}
            >
              <div className="mb-6 p-4 bg-[#f6f3ee] rounded-full inline-flex">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#1c1c19] mb-4">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-[#574240] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
