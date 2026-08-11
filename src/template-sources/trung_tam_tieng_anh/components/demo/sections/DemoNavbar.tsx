import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BusinessInfo } from '../../../types/demo';

interface DemoNavbarProps {
  business: BusinessInfo;
}

export const DemoNavbar: React.FC<DemoNavbarProps> = ({ business }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-5">
        {/* Brand Name / Logo */}
        <div className="min-w-0 flex items-center gap-2">
          {business.logoUrl ? (
            <img
              src={business.logoUrl}
              alt={business.name}
              className="h-10 object-contain"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span
              className="block max-w-[340px] whitespace-normal break-words text-lg font-bold leading-tight tracking-tight text-blue-600 sm:max-w-[420px] md:max-w-[500px] md:text-xl"
              title={business.name}
            >
              {business.name}
            </span>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden shrink-0 md:flex items-center gap-8">
          <a href="#khoa-hoc" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
            Khóa học
          </a>
          <a href="#lo-trinh" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Lộ trình
          </a>
          <a href="#giao-vien" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Giáo viên
          </a>
          <a href="#tu-van" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Liên hệ
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 md:block">
          <a
            href="#tu-van"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Đăng ký tư vấn
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-fadeIn">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#khoa-hoc"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-blue-600 py-2 border-b border-slate-50"
            >
              Khóa học
            </a>
            <a
              href="#lo-trinh"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
            >
              Lộ trình
            </a>
            <a
              href="#giao-vien"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
            >
              Giáo viên
            </a>
            <a
              href="#tu-van"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-slate-600 hover:text-blue-600 py-2"
            >
              Liên hệ
            </a>
            <a
              href="#tu-van"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-md"
            >
              Đăng ký tư vấn
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
