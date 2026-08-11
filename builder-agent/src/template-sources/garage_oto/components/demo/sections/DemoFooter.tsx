import React from 'react';
import { MessageCircle, Mail, Globe, Send } from 'lucide-react';
import { BusinessInfo } from '../../../types/demo';

interface DemoFooterProps {
  business: BusinessInfo;
}

export default function DemoFooter({ business }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi từ AutoGarage!');
  };

  return (
    <footer className="bg-[#031427] text-white pt-16 pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand & Socials */}
        <div className="md:col-span-5 space-y-4">
          <div className="font-sans font-extrabold text-2xl tracking-tight">
            Auto<span className="text-[#fd761a]">Garage</span>
          </div>
          
          <p className="text-[#8090a8] text-sm leading-relaxed max-w-sm font-normal">
            Professional Automotive Services. Chúng tôi tận tâm mang lại trải nghiệm sửa chữa trung thực, an toàn và hiệu suất cao nhất cho chiếc xe của bạn.
          </p>
          
          {/* Social Channels */}
          <div className="flex gap-4 pt-2">
            <a 
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#fd761a] hover:text-white flex items-center justify-center transition-all text-[#8090a8]" 
              href="#"
              aria-label="MessageCircle Link"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            <a 
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#fd761a] hover:text-white flex items-center justify-center transition-all text-[#8090a8]" 
              href="#"
              aria-label="Website Link"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a 
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#fd761a] hover:text-white flex items-center justify-center transition-all text-[#8090a8]" 
              href={`mailto:${business.email}`}
              aria-label="Email Link"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-sans font-bold text-lg text-white">
            Dịch Vụ Nổi Bật
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a className="text-[#8090a8] hover:text-white transition-colors" href="#services">
                Bảo dưỡng định kỳ
              </a>
            </li>
            <li>
              <a className="text-[#8090a8] hover:text-white transition-colors" href="#services">
                Sửa chữa động cơ
              </a>
            </li>
            <li>
              <a className="text-[#8090a8] hover:text-white transition-colors" href="#services">
                Điện &amp; Điều hòa ô tô
              </a>
            </li>
            <li>
              <a className="text-[#8090a8] hover:text-white transition-colors" href="#services">
                Kiểm tra phanh lốp
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup card */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-sans font-bold text-lg text-white">
            Đăng Ký Nhận Tin
          </h4>
          <p className="text-sm text-[#8090a8] leading-relaxed">
            Nhận thông báo lịch bảo dưỡng và các chương trình khuyến mãi sớm nhất từ chúng tôi.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
            <input 
              required
              className="bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-xl w-full focus:ring-2 focus:ring-[#fd761a] focus:border-transparent text-sm focus:outline-none transition-all"
              placeholder="Email của bạn" 
              type="email"
            />
            <button 
              type="submit"
              className="bg-[#fd761a] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#fd761a]/95 transition-all flex items-center justify-center flex-shrink-0"
              aria-label="Submit email"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Corporate watermark line */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12 pt-6 border-t border-white/5 text-center text-xs text-[#8090a8]/60">
        © {currentYear} {business.name}. Professional Automotive Services. All Rights Reserved.
      </div>
    </footer>
  );
}
