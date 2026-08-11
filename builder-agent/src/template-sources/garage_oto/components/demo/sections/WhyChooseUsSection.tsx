import React from 'react';
import { UserCheck, Cpu, ShieldCheck, Coins, Hammer } from 'lucide-react';

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export default function WhyChooseUsSection() {
  const features: FeatureItem[] = [
    {
      icon: 'engineering',
      title: 'Kỹ thuật viên chuyên nghiệp',
      desc: 'Đội ngũ tay nghề cao, giàu thực tiễn, am hiểu sâu sắc về các dòng xe châu Âu và châu Á hiện đại.',
    },
    {
      icon: 'precision_manufacturing',
      title: 'Thiết bị hiện đại',
      desc: 'Sử dụng máy quét lỗi chuyên dụng, dàn cầu nâng an toàn, và trang thiết bị đời mới nhất.',
    },
    {
      icon: 'verified',
      title: 'Phụ tùng chính hãng',
      desc: 'Cam kết chỉ cung cấp linh kiện cao cấp, có tem mác nguồn gốc rõ ràng cùng chính sách bảo hành dài hạn.',
    },
    {
      icon: 'monetization_on',
      title: 'Chi phí hợp lý',
      desc: 'Chính sách báo giá chi tiết trước khi tiến hành sửa chữa, tuyệt đối không phụ phí phát sinh.',
    },
  ];

  // Helper maps icon string to Lucide React component
  function getFeatureIcon(iconKey: string) {
    switch (iconKey) {
      case 'engineering':
        return <UserCheck className="w-8 h-8 text-[#fd761a]" />;
      case 'precision_manufacturing':
        return <Cpu className="w-8 h-8 text-[#fd761a]" />;
      case 'verified':
        return <ShieldCheck className="w-8 h-8 text-[#fd761a]" />;
      case 'monetization_on':
        return <Coins className="w-8 h-8 text-[#fd761a]" />;
      default:
        return <Hammer className="w-8 h-8 text-[#fd761a]" />;
    }
  }

  return (
    <section className="py-16 md:py-24 bg-[#0a1422] text-white overflow-hidden relative">
      {/* Structural visual background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(253,118,26,0.05),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Why Choose Us copy & cards */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs text-[#fd761a] font-bold tracking-widest uppercase">
              TẠI SAO LÀ CHÚNG TÔI
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Tại sao chọn AutoGarage?
            </h2>
          </div>

          <div className="grid gap-6">
            {features.map((feat, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-shrink-0 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#fd761a]/10 group-hover:border-[#fd761a]/30 transition-colors h-fit">
                  {getFeatureIcon(feat.icon)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-white mb-1 group-hover:text-[#fd761a] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-[#8690a1] text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Circular framing of the SUV image */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="aspect-square w-full max-w-[420px] border-2 border-[#fd761a]/15 rounded-full flex items-center justify-center p-6 animate-pulse duration-10000">
            <div className="aspect-square w-full border-2 border-[#fd761a]/30 rounded-full flex items-center justify-center p-6">
              <div className="aspect-square w-full rounded-full overflow-hidden border-4 border-white/5 relative">
                <img 
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdNf3bl7ynbeyZSOoUGi2L1APFVxgyfqTQ7BEibVIesKb3TkaO66GGDRI2P4UTiiNqdNilwh2Oq3DykZYH6ZUIjzQWUJZKlVz3EZL6vao6vfC4iTq-Lo8nAPuruCQpaF_OFUkSu9xUySNayityA9ftzJB3XAK2gPjghUILSJ8KSLK2M6n1RAW_Eng2sxfnqFswjvtGrHqdvujb5nxZ-nTekX91r7NcrbY1_tp2jmAakmPJ6UmBBrmLgA"
                  alt="Gleaming SUV under studio lights representing premium care."
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
