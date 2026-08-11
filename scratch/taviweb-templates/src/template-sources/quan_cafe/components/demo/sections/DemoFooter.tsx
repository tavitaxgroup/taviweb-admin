import React from 'react';
import { Coffee, MessageCircle, Camera } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function DemoFooter({ data }: SectionProps) {
  return (
    <footer className="bg-[#f5ece8] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
          
          {/* Logo Column */}
          <div className="md:col-span-4 space-y-6 md:space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#553722] rounded-lg flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-[#553722] font-sans">
                {data.business.name}
              </div>
            </div>
            
            <p className="text-[#50453e] text-sm sm:text-base max-w-sm leading-relaxed opacity-90">
              Nơi hội tụ của những tâm hồn yêu cà phê và trân trọng những giá trị mộc mạc. Chúng tôi tự hào mang đến trải nghiệm cà phê tử tế nhất.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {data.business.facebookUrl && (
                <a
                  href={data.business.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-[#553722] hover:bg-[#553722] hover:text-white transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
              )}
              <a
                href="https://Camera.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-[#553722] hover:bg-[#553722] hover:text-white transition-all cursor-pointer"
              >
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            
            {/* Column 1 */}
            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-bold text-[#553722] uppercase tracking-wider text-xs sm:text-sm">
                Về chúng tôi
              </h5>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li>
                  <a href="#about" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Câu chuyện thương hiệu
                  </a>
                </li>
                <li>
                  <a href="#whychooseus" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Đội ngũ Barista
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Nguồn gốc cà phê
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-bold text-[#553722] uppercase tracking-wider text-xs sm:text-sm">
                Hỗ trợ
              </h5>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li>
                  <a href="#contact" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Điều khoản dịch vụ
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 sm:space-y-6 col-span-2 sm:col-span-1">
              <h5 className="font-bold text-[#553722] uppercase tracking-wider text-xs sm:text-sm">
                Khám phá
              </h5>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li>
                  <a href="#services" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Menu thực đơn
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Góc check-in
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#50453e] hover:text-[#553722] transition-colors">
                    Blog sống chậm
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[#50453e]/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} {data.business.name}. Inspired by the art of slow living.
          </p>
          <p className="text-[#50453e]/60 text-xs sm:text-sm italic">
            Hành trình tìm lại sự bình yên trong từng tách cà phê.
          </p>
        </div>

      </div>
    </footer>
  );
}
