import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { BusinessInfo } from "../../../types/demo";

interface DemoNavbarProps {
  business: BusinessInfo;
  primaryActionLabel: string;
  primaryActionHref: string;
}

export function DemoNavbar({ business, primaryActionLabel, primaryActionHref }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo / Company Name */}
        <a href="#" className="min-w-0 flex items-center" title={business.name}>
          <span className="block max-w-[340px] whitespace-normal break-words font-display text-base font-bold leading-tight tracking-tight text-[#16a34a] sm:max-w-[420px] md:max-w-[500px] md:text-lg">
            {business.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="font-label text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
            Dịch vụ
          </a>
          <a href="#about" className="font-label text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
            Về chúng tôi
          </a>
          <a href="#gallery" className="font-label text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
            Dự án thực tế
          </a>
          <a href="#reviews" className="font-label text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
            Đánh giá
          </a>
          <a href="#contact" className="font-label text-sm font-semibold text-gray-600 hover:text-[#16a34a] transition-colors">
            Liên hệ
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={primaryActionHref}
            id="nav-cta-btn"
            className="font-label text-sm font-semibold bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-md flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-95"
          >
            {business.phone ? <Phone className="w-4 h-4" /> : null}
            {primaryActionLabel}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#16a34a] focus:outline-none"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block font-label text-base font-semibold text-gray-600 hover:text-[#16a34a] py-2 border-b border-gray-50"
          >
            Dịch vụ
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block font-label text-base font-semibold text-gray-600 hover:text-[#16a34a] py-2 border-b border-gray-50"
          >
            Về chúng tôi
          </a>
          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="block font-label text-base font-semibold text-gray-600 hover:text-[#16a34a] py-2 border-b border-gray-50"
          >
            Dự án thực tế
          </a>
          <a
            href="#reviews"
            onClick={() => setIsOpen(false)}
            className="block font-label text-base font-semibold text-gray-600 hover:text-[#16a34a] py-2 border-b border-gray-50"
          >
            Đánh giá
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block font-label text-base font-semibold text-gray-600 hover:text-[#16a34a] py-2 border-b border-gray-50"
          >
            Liên hệ
          </a>
          <div className="pt-2">
            <a
              href={primaryActionHref}
              onClick={() => setIsOpen(false)}
              className="w-full font-label text-center justify-center font-semibold bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-3 rounded-md flex items-center gap-2 shadow-sm transition-all"
            >
              {business.phone ? <Phone className="w-4 h-4" /> : null}
              {primaryActionLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
