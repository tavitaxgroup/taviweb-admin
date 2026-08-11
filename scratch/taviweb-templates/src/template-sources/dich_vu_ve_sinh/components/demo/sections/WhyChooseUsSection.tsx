import { Shield, Sparkles, Users } from "lucide-react";
import { DEFAULT_CLEANING_IMAGES } from "../../../lib/demo/templateDefaults";

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="z-10">
          <span className="font-label text-xs font-bold text-[#16a34a] tracking-widest uppercase">
            Sự khác biệt của chúng tôi
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-2 mb-8 leading-tight">
            Tại Sao Hàng Ngàn Khách Hàng Tin Tưởng CleanPro?
          </h2>

          <ul className="space-y-8">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#16a34a] text-white rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-1">
                  Trang Thiết Bị Hiện Đại
                </h4>
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  Sử dụng máy móc công nghiệp nhập khẩu từ Châu Âu, tăng hiệu quả làm sạch sâu và nhanh chóng gấp 5 lần so với vệ sinh thông thường.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0284c7] text-white rounded-full flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-1">
                  Hóa Chất Thân Thiện
                </h4>
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  100% hóa chất chuyên dụng được kiểm định nghiêm ngặt, có đầy đủ chứng chỉ an toàn cho sức khỏe con người và bảo vệ môi trường.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-1">
                  Đội Ngũ Kinh Nghiệm
                </h4>
                <p className="font-sans text-sm text-slate-400 leading-relaxed">
                  Nhân viên có lý lịch rõ ràng, được đào tạo bài bản kỹ năng và tinh thần phục vụ chu đáo, trung thực, luôn có giám sát theo sát hiện trường.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Grid with Photos & Big numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-8">
            <div className="rounded-lg overflow-hidden h-48 md:h-64 border border-slate-800">
              <img
                src={DEFAULT_CLEANING_IMAGES.machine}
                alt="Industrial scrubbers in action"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-slate-800/80 border border-slate-700 rounded-lg flex flex-col justify-center text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-[#16a34a] mb-1">
                500+
              </div>
              <div className="font-label text-xs font-bold text-slate-400 uppercase tracking-widest">
                Khách hàng DN
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-[#16a34a] rounded-lg flex flex-col justify-center text-center text-white shadow-lg">
              <div className="text-3xl md:text-5xl font-extrabold mb-1">
                10+
              </div>
              <div className="font-label text-xs font-bold text-slate-100 uppercase tracking-widest">
                Năm Kinh Nghiệm
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-48 md:h-64 border border-slate-800">
              <img
                src={DEFAULT_CLEANING_IMAGES.about}
                alt="CleanPro professional team in uniforms"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -right-24 -top-24 w-96 h-96 border-[40px] border-[#16a34a] opacity-5 rounded-full pointer-events-none"></div>
    </section>
  );
}
