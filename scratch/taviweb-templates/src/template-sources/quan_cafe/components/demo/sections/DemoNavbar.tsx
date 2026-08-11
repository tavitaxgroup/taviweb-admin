import React, { useState, useEffect } from 'react';
import { Coffee, Phone, Navigation, Menu, X } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function DemoNavbar({ data }: SectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link highlight
      const sections = ['services', 'gallery', 'whychooseus', 'reviews', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 py-3 shadow-md'
          : 'bg-[#fff8f5]/40 backdrop-blur-md border-b border-outline-variant/10 py-4'
      }`}
    >
      <div className="flex justify-between items-center w-full px-5 md:px-16 max-w-[1280px] mx-auto">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#553722] text-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="text-xl md:text-2xl font-bold tracking-tight text-[#553722] font-sans">
            {data.business.name}
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activeSection === 'home'
                ? 'text-[#553722] font-bold border-b-2 border-[#553722] pb-1'
                : 'text-[#50453e] hover:text-[#553722]'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activeSection === 'services'
                ? 'text-[#553722] font-bold border-b-2 border-[#553722] pb-1'
                : 'text-[#50453e] hover:text-[#553722]'
            }`}
          >
            Dịch vụ
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className={`font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activeSection === 'gallery'
                ? 'text-[#553722] font-bold border-b-2 border-[#553722] pb-1'
                : 'text-[#50453e] hover:text-[#553722]'
            }`}
          >
            Hình ảnh
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
              activeSection === 'contact'
                ? 'text-[#553722] font-bold border-b-2 border-[#553722] pb-1'
                : 'text-[#50453e] hover:text-[#553722]'
            }`}
          >
            Liên hệ
          </button>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {data.business.phone && (
            <a
              href={`tel:${data.business.phone}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-[#50453e] hover:text-[#553722] hover:bg-[#efe0cd]/50 rounded-full transition-all duration-300 text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi quán</span>
            </a>
          )}
          <a
            href={data.business.mapUrl || '#contact'}
            target="_blank"
            rel="noreferrer"
            className="bg-[#553722] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-[#553722]/10 hover:shadow-lg hover:bg-[#5f402a] active:scale-95 transition-all duration-300"
          >
            Chỉ đường
          </a>
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#50453e] hover:text-[#553722] rounded-full hover:bg-[#efe0cd]/30"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-outline-variant/20 py-6 px-5 flex flex-col gap-4 shadow-xl">
          <button
            onClick={() => scrollToSection('home')}
            className="text-left py-2 text-base font-semibold text-[#50453e] hover:text-[#553722]"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-left py-2 text-base font-semibold text-[#50453e] hover:text-[#553722]"
          >
            Dịch vụ
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-left py-2 text-base font-semibold text-[#50453e] hover:text-[#553722]"
          >
            Hình ảnh
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left py-2 text-base font-semibold text-[#50453e] hover:text-[#553722]"
          >
            Liên hệ
          </button>
          {data.business.phone && (
            <a
              href={`tel:${data.business.phone}`}
              className="flex items-center gap-2 py-2 text-base font-semibold text-[#50453e] hover:text-[#553722]"
            >
              <Phone className="w-5 h-5 text-[#553722]" />
              <span>Gọi ngay: {data.business.phone}</span>
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
