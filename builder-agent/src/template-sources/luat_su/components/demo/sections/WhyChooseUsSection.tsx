import { Brain, Users, Award, Scale } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function WhyChooseUsSection({ data }: SectionProps) {
  return (
    <section className="py-24 bg-blue-950 text-white overflow-hidden relative">
      {/* Absolute Decorative Scales Icon in background */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none flex justify-end items-center">
        <Scale className="w-[450px] h-[450px] translate-x-32" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Core Strengths */}
          <div>
            <h2 className="font-headline-md font-bold text-3xl sm:text-4xl mb-8">
              Tại sao nên chọn chúng tôi?
            </h2>
            <div className="h-[2px] w-12 bg-amber-500 mb-10 rounded"></div>

            <div className="space-y-8">
              {/* Factor 1 */}
              <div className="flex gap-6 items-start">
                <div className="bg-amber-600 p-3.5 rounded-xl shrink-0 shadow-md">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-white mb-2">
                    Kiến thức chuyên sâu
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed opacity-90">
                    Đội ngũ luật sư nắm vững hệ thống pháp luật Việt Nam và quốc tế, luôn cập nhật những thay đổi mới nhất.
                  </p>
                </div>
              </div>

              {/* Factor 2 */}
              <div className="flex gap-6 items-start">
                <div className="bg-amber-600 p-3.5 rounded-xl shrink-0 shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-white mb-2">
                    Tiếp cận cá nhân hóa
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed opacity-90">
                    Mỗi khách hàng là một trường hợp duy nhất. Chúng tôi thiết kế giải pháp riêng biệt phù hợp với hoàn cảnh cụ thể.
                  </p>
                </div>
              </div>

              {/* Factor 3 */}
              <div className="flex gap-6 items-start">
                <div className="bg-amber-600 p-3.5 rounded-xl shrink-0 shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg sm:text-xl text-white mb-2">
                    Độ tin cậy tuyệt đối
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed opacity-90">
                    Sự bảo mật và đạo đức nghề nghiệp là kim chỉ nam trong mọi hành động của chúng tôi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Block Card */}
          <div className="bg-white/5 border border-white/10 p-10 sm:p-12 rounded-2xl backdrop-blur-md">
            <blockquote className="text-xl sm:text-2xl font-headline-md italic mb-8 text-gray-100 leading-relaxed">
              "Trong thế giới pháp luật đầy biến động, chúng tôi đứng vững như một mỏ neo vững chắc cho khách hàng của mình."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-amber-500 rounded"></div>
              <p className="font-sans font-bold text-xs sm:text-sm tracking-widest text-amber-500 uppercase">
                Hội đồng quản trị
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
