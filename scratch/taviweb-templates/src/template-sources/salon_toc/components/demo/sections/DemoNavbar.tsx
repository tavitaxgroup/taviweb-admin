import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BusinessData } from '../../../types/demo';

interface DemoNavbarProps {
  business: BusinessData;
}

export default function DemoNavbar({ business }: DemoNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-sans font-extrabold text-2xl md:text-3xl tracking-tighter text-[#121315] cursor-pointer select-none"
          style={{ fontFamily: 'Syne, sans-serif' }}
          id="nav-logo"
        >
          {business.logoText}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          <button 
            onClick={() => handleScroll('services')}
            className="font-sans text-sm font-bold text-[#855316] uppercase tracking-widest hover:text-[#121315] transition-colors duration-300"
          >
            Dịch vụ
          </button>
          <button 
            onClick={() => handleScroll('gallery')}
            className="font-sans text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-[#855316] transition-colors duration-300"
          >
            Bộ sưu tập
          </button>
          <button 
            onClick={() => handleScroll('about')}
            className="font-sans text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-[#855316] transition-colors duration-300"
          >
            Giới thiệu
          </button>
          <button 
            onClick={() => handleScroll('reviews')}
            className="font-sans text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-[#855316] transition-colors duration-300"
          >
            Đánh giá
          </button>
          
          <button 
            onClick={() => handleScroll('contact')}
            className="bg-[#121315] text-white px-7 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#855316] active:scale-95 transition-all duration-300"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Đặt lịch ngay
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#121315] p-2 focus:outline-none"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-gray-100 absolute top-20 left-0 w-full flex flex-col px-6 py-8 space-y-6 shadow-md backdrop-blur-md animate-fade-in">
          <button 
            onClick={() => handleScroll('services')}
            className="font-sans text-base font-bold text-left text-[#121315] uppercase tracking-wider"
          >
            Dịch vụ
          </button>
          <button 
            onClick={() => handleScroll('gallery')}
            className="font-sans text-base font-bold text-left text-gray-600 uppercase tracking-wider"
          >
            Bộ sưu tập
          </button>
          <button 
            onClick={() => handleScroll('about')}
            className="font-sans text-base font-bold text-left text-gray-600 uppercase tracking-wider"
          >
            Giới thiệu
          </button>
          <button 
            onClick={() => handleScroll('reviews')}
            className="font-sans text-base font-bold text-left text-gray-600 uppercase tracking-wider"
          >
            Đánh giá
          </button>
          <button 
            onClick={() => handleScroll('contact')}
            className="bg-[#121315] text-white py-4 text-center text-sm font-semibold uppercase tracking-widest rounded-sm hover:bg-[#855316]"
          >
            Đặt lịch làm tóc
          </button>
        </div>
      )}
    </nav>
  );
}
