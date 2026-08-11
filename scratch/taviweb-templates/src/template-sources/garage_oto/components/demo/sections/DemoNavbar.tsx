import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { BusinessInfo } from '../../../types/demo';

interface DemoNavbarProps {
  business: BusinessInfo;
  ctaLabel?: string;
}

export default function DemoNavbar({ business, ctaLabel = 'Gọi kiểm tra xe' }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedPhone = business.phone ? business.phone.replace(/\s+/g, '') : '';
  const ctaHref = formattedPhone ? `tel:${formattedPhone}` : '#contact';

  const menuItems = [
    { label: 'Dịch vụ', href: '#services' },
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Hình ảnh', href: '#gallery' },
    { label: 'Đánh giá', href: '#reviews' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9fa] border-b border-[#c5c6cc]/25 shadow-sm h-20 transition-all duration-300">
      <div className="flex justify-between items-center gap-5 h-full px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Brand Logo / Business Name */}
        <div className="min-w-0 flex flex-col">
          <a href="#" className="font-headline-md text-xl md:text-2xl font-extrabold text-[#0a1422] tracking-tight">
            Auto<span className="text-[#fd761a]">Garage</span>
          </a>
          <span className="hidden max-w-[320px] whitespace-normal break-words text-[10px] font-mono leading-tight tracking-widest text-[#44474c] uppercase sm:block md:max-w-[420px]" title={business.name}>
            {business.name}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden shrink-0 md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <a
              key={item.href}
              className="text-[#44474c] hover:text-[#0a1422] font-medium transition-colors text-sm hover:underline decoration-[#fd761a] decoration-2 underline-offset-4"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="shrink-0 flex items-center gap-4">
          <a
            href={ctaHref}
            className="bg-[#fd761a] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#fd761a]/90 hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{ctaLabel}</span>
            <span className="inline sm:hidden">Gọi ngay</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#0a1422] p-2 hover:bg-[#f0edee] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#fbf9fa] border-b border-[#c5c6cc]/30 shadow-lg py-4 px-6 flex flex-col gap-4 z-40 transition-all">
          {menuItems.map((item) => (
            <a
              key={item.href}
              onClick={() => setIsOpen(false)}
              className="text-[#44474c] hover:text-[#0a1422] font-semibold transition-colors py-2 border-b border-[#f0edee]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-[#44474c]">HOTLINE HỖ TRỢ</span>
            <a href={`tel:${formattedPhone}`} className="text-[#fd761a] font-bold text-lg">
              {business.phone || 'Đang cập nhật'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
