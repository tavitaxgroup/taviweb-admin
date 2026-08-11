import React, { useState } from "react";
import { Send, Check } from "lucide-react";
import { BusinessData } from "../../../types/demo";

interface FooterProps {
  business: BusinessData;
}

export default function DemoFooter({ business }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#e5e2dd] border-t border-[#dec0bd] text-[#1c1c19]">
      
      {/* Primary Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-16 py-20 max-w-7xl mx-auto">
        
        {/* Brand Slogan */}
        <div>
          <div className="font-serif text-2xl font-bold tracking-widest text-[#5f030a] mb-8 uppercase">
            {business.name || "L'ÉCHELLE"}
          </div>
          <p className="font-sans text-sm text-[#574240] max-w-xs leading-relaxed">
            Tôn vinh nghệ thuật ẩm thực truyền thống qua góc nhìn hiện đại và tinh tế.
          </p>
        </div>

        {/* Links Column */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] tracking-widest uppercase font-bold text-[#5f030a] mb-2">
              Thực đơn
            </h5>
            <a href="#services-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              A La Carte
            </a>
            <a href="#services-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              Tasting Menu
            </a>
            <a href="#services-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              Wine List
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] tracking-widest uppercase font-bold text-[#5f030a] mb-2">
              Liên kết
            </h5>
            <a href="#about-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              Tuyển dụng
            </a>
            <a href="#reviews-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              Nhận xét
            </a>
            <a href="#contact-section" className="text-sm text-[#574240] hover:text-[#5f030a] transition-colors">
              Liên hệ
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h5 className="text-[10px] tracking-widest uppercase font-bold text-[#5f030a] mb-6">
            Đăng ký bản tin
          </h5>
          <p className="text-sm text-[#574240] mb-6 leading-relaxed">
            Đăng ký để nhận thông tin sớm nhất về các sự kiện ẩm thực và ưu đãi đặc quyền.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex">
            <input 
              type="email" 
              required
              placeholder="Email của bạn..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribed}
              className="bg-white border border-[#dec0bd] border-r-0 focus:outline-none focus:border-[#5f030a] px-4 py-3 text-sm w-full disabled:bg-gray-100 disabled:text-gray-400"
            />
            <button 
              type="submit" 
              disabled={subscribed}
              className="bg-[#5f030a] hover:bg-[#7f1d1d] text-white px-6 flex items-center justify-center transition-colors shrink-0 disabled:bg-gray-400"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-[#7c580f] mt-2 font-medium">
              Cảm ơn bạn đã đăng ký theo dõi bản tin!
            </p>
          )}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#dec0bd]/30 py-8 px-6 md:px-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="text-xs text-[#574240]">
          © {new Date().getFullYear()} {business.name || "L'ÉCHELLE"} Gastronomy. All rights reserved.
        </p>
        <div className="flex gap-8 text-xs text-[#574240]">
          <a href="#contact-section" className="hover:text-[#5f030a] transition-colors">
            Chính sách bảo mật
          </a>
          <a href="#contact-section" className="hover:text-[#5f030a] transition-colors">
            Điều khoản dịch vụ
          </a>
        </div>
      </div>

    </footer>
  );
}
