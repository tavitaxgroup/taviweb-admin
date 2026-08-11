import { ShieldCheck } from "lucide-react";
import { AboutData } from "../../../types/demo";

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-lg overflow-hidden shadow-lg border border-slate-100 aspect-[4/3] md:aspect-auto">
            <img
              src={about.image.src}
              alt={about.image.alt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#0284c7]/10 -z-10 rounded-lg"></div>
        </div>

        {/* Right Column: Text content */}
        <div className="lg:col-span-7">
          <span className="font-label text-xs font-bold text-[#16a34a] tracking-widest uppercase">
            Về chúng tôi
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
            {about.title}
          </h2>
          <p className="font-sans text-base text-slate-600 mb-8 leading-relaxed">
            {about.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-[#16a34a]/10 p-1.5 rounded text-[#16a34a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800">
                  Pháp nhân đầy đủ
                </h4>
                <p className="font-sans text-xs text-slate-500 mt-1">
                  Có đầy đủ hóa đơn, hợp đồng minh bạch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 bg-[#16a34a]/10 p-1.5 rounded text-[#16a34a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800">
                  Bảo hiểm trách nhiệm
                </h4>
                <p className="font-sans text-xs text-slate-500 mt-1">
                  Đảm bảo bồi hoàn nếu xảy ra sự cố hư hỏng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 bg-[#16a34a]/10 p-1.5 rounded text-[#16a34a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800">
                  Khảo sát nhanh chóng
                </h4>
                <p className="font-sans text-xs text-slate-500 mt-1">
                  Kỹ thuật viên khảo sát trực tiếp sau 30 phút.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 bg-[#16a34a]/10 p-1.5 rounded text-[#16a34a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-label text-sm font-bold text-slate-800">
                  Công nghệ Châu Âu
                </h4>
                <p className="font-sans text-xs text-slate-500 mt-1">
                  Trang thiết bị hiện đại, vệ sinh sạch sâu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
