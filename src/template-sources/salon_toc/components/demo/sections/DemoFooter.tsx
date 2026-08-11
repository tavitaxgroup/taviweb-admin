import { MessageCircle, Camera, Play } from 'lucide-react';
import { BusinessData } from '../../../types/demo';

interface DemoFooterProps {
  business: BusinessData;
}

export default function DemoFooter({ business }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#e5e2e1] py-20 text-[#121315] border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* About Salon Column */}
        <div className="md:col-span-2 text-left">
          <div 
            className="text-2xl font-black mb-6 tracking-tighter"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {business.name}
          </div>
          <p 
            className="text-sm text-gray-600 max-w-sm mb-8 leading-relaxed font-normal"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Nâng tầm phong cách cá nhân với những trải nghiệm chăm sóc tóc chuyên nghiệp nhất tại không gian làm đẹp cao cấp của chúng tôi.
          </p>
          <div className="flex gap-4">
            {business.facebookUrl && (
              <a 
                href={business.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#855316] hover:border-[#855316] transition-colors duration-300"
                aria-label="MessageCircle"
              >
                <MessageCircle size={18} />
              </a>
            )}
            <a 
              href="https://Camera.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#855316] hover:border-[#855316] transition-colors duration-300"
              aria-label="Camera"
            >
              <Camera size={18} />
            </a>
            <a 
              href="https://Play.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-[#855316] hover:border-[#855316] transition-colors duration-300"
              aria-label="Play"
            >
              <Play size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="text-left">
          <h4 
            className="text-xs font-bold text-[#121315] mb-6 uppercase tracking-widest"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Quick Links
          </h4>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => handleScroll('services')}
                className="text-sm text-gray-600 hover:text-[#855316] transition-colors duration-200 block text-left"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Dịch vụ
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('gallery')}
                className="text-sm text-gray-600 hover:text-[#855316] transition-colors duration-200 block text-left"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Bộ sưu tập
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('about')}
                className="text-sm text-gray-600 hover:text-[#855316] transition-colors duration-200 block text-left"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Giới thiệu
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleScroll('reviews')}
                className="text-sm text-gray-600 hover:text-[#855316] transition-colors duration-200 block text-left"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Đánh giá khách hàng
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="text-left">
          <h4 
            className="text-xs font-bold text-[#121315] mb-6 uppercase tracking-widest"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Legal
          </h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <a 
                href="#" 
                className="hover:text-[#855316] transition-colors duration-200 block"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="hover:text-[#855316] transition-colors duration-200 block"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Điều khoản dịch vụ
              </a>
            </li>
            <li>
              <span 
                className="text-gray-400 cursor-default"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
              >
                Địa chỉ: {business.address}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Credits */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
        <p 
          className="text-xs text-gray-500 uppercase tracking-wider font-semibold"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
        >
          © {currentYear} {business.name}. ALL RIGHTS RESERVED.
        </p>
        <p 
          className="text-xs text-gray-500 uppercase tracking-wider font-semibold"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
        >
          Designed for elegance.
        </p>
      </div>
    </footer>
  );
}
