import { Check, ShieldCheck, Award, Zap, Compass } from 'lucide-react';

export default function WhyChooseUsSection() {
  const points = [
    {
      icon: Award,
      title: 'Độ Hoàn Thiện Tối Đa',
      desc: 'Giám sát gắt gao từng khâu chế tác, đảm bảo sai số thi công dưới 1mm so với bản vẽ 3D.'
    },
    {
      icon: ShieldCheck,
      title: 'Vật Liệu Cao Cấp Nhất',
      desc: 'Hợp tác trực tiếp với các nhà phân phối vật liệu hàng đầu châu Âu và vật liệu xanh đạt chuẩn.'
    },
    {
      icon: Compass,
      title: 'Thiết Kế Độc Bản',
      desc: 'Nói không với các bản thiết kế rập khuôn. Mỗi ngôi nhà là một tác phẩm duy nhất của chính bạn.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 sm:py-32 bg-[#ffffff] overflow-hidden border-t border-brand-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block - Elegant Title */}
          <div className="lg:col-span-5">
            <span className="inline-block font-sans text-xs font-semibold tracking-widest text-brand-secondary uppercase mb-4">
              GIÁ TRỊ CỐT LÕI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-primary leading-tight mb-6">
              Tại sao hàng trăm gia chủ chọn Atelier Ethos?
            </h2>
            <p className="font-sans text-base text-brand-primary/70 leading-relaxed mb-8">
              Chúng tôi hiểu rằng ngôi nhà là tài sản lớn nhất của mỗi gia đình. Vì thế, chúng tôi không chỉ thiết kế, chúng tôi gieo vào đó sự tận tâm và giải pháp hoàn hảo để kiến tạo tổ ấm lý tưởng nhất.
            </p>
            <div className="editorial-line"></div>
          </div>

          {/* Right Block - Three core pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
            {points.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col lg:flex-row items-start gap-6 p-6 bg-brand-bg/50 border border-brand-secondary/10 hover:border-brand-secondary/35 transition-all duration-300"
                >
                  <div className="p-3 bg-brand-secondary/10 text-brand-secondary">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-brand-primary mb-2">
                      {point.title}
                    </h4>
                    <p className="font-sans text-sm text-brand-primary/70 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
