import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface DemoNavbarProps {
  data: DemoPageData;
}

export default function DemoNavbar({ data }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fff8f8]/90 backdrop-blur-md border-b border-[#e1c292]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-5">
        {/* Brand Name */}
        <a 
          href="#" 
          className="min-w-0 max-w-[340px] whitespace-normal break-words font-serif text-lg font-bold leading-tight tracking-tight text-[#834767] transition-colors hover:text-[#201a1c] sm:max-w-[420px] md:max-w-[500px] md:text-xl"
          id="nav-logo"
          title={data.business.name}
        >
          {data.business.name}
        </a>

        {/* Desktop Menu */}
        <div className="hidden shrink-0 md:flex items-center space-x-10 text-sm font-sans uppercase tracking-widest text-[#6c5962]">
          <a href="#gallery" className="hover:text-[#834767] transition-colors">Bộ ảnh</a>
          <a href="#services" className="hover:text-[#834767] transition-colors">Dịch vụ</a>
          <a href="#reviews" className="hover:text-[#834767] transition-colors">Cảm nhận</a>
          <a href="#contact-cta" className="hover:text-[#834767] transition-colors">Liên hệ</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 md:block">
          <a
            href={data.contact.primaryAction.href}
            className="inline-flex items-center justify-center bg-[#834767] hover:bg-[#834767]/90 text-white font-sans text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-sm shadow-md shadow-[#834767]/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            id="nav-cta-btn"
          >
            {data.contact.primaryAction.label}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#6c5962] hover:text-[#834767] p-2"
            aria-label="Toggle menu"
            id="nav-mobile-btn"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#fff8f8] border-b border-[#e1c292]/30 px-6 py-8 flex flex-col space-y-6 shadow-xl shadow-[#834767]/5 transition-all animate-fade-in">
          <a 
            href="#gallery" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-sans uppercase tracking-widest text-[#6c5962] hover:text-[#834767] transition-colors"
          >
            Bộ ảnh
          </a>
          <a 
            href="#services" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-sans uppercase tracking-widest text-[#6c5962] hover:text-[#834767] transition-colors"
          >
            Dịch vụ
          </a>
          <a 
            href="#reviews" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-sans uppercase tracking-widest text-[#6c5962] hover:text-[#834767] transition-colors"
          >
            Cảm nhận
          </a>
          <a 
            href="#contact-cta" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-sans uppercase tracking-widest text-[#6c5962] hover:text-[#834767] transition-colors"
          >
            Liên hệ
          </a>
          
          <a
            href={data.contact.primaryAction.href}
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-[#834767] text-white font-sans text-xs uppercase tracking-widest font-semibold py-4 rounded-sm shadow-md"
          >
            {data.contact.primaryAction.label}
          </a>
        </div>
      )}
    </nav>
  );
}
