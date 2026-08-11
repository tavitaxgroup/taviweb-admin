import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function DemoNavbar({ data }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="bg-blue-900 p-2 rounded-lg text-white group-hover:bg-blue-800 transition-colors">
            <Scale className="w-6 h-6" />
          </div>
          <span className="font-sans font-bold tracking-tight text-lg md:text-xl text-blue-950 whitespace-normal break-words leading-tight max-w-[340px] sm:max-w-[420px] md:max-w-[500px]">
            {data.business.name}
          </span>
        </a>

        {/* Desktop Menu links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="font-sans font-medium text-gray-600 hover:text-blue-900 transition-colors text-sm"
          >
            Dịch vụ
          </a>
          <a
            href="#about"
            className="font-sans font-medium text-gray-600 hover:text-blue-900 transition-colors text-sm"
          >
            Về chúng tôi
          </a>
          <a
            href="#gallery"
            className="font-sans font-medium text-gray-600 hover:text-blue-900 transition-colors text-sm"
          >
            Thư viện
          </a>
          <a
            href="#contact"
            className="font-sans font-medium text-gray-600 hover:text-blue-900 transition-colors text-sm"
          >
            Liên hệ
          </a>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex justify-center items-center bg-amber-700 hover:bg-amber-800 text-white font-sans font-semibold text-sm px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            Đặt lịch tư vấn
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-blue-950 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md absolute top-20 left-0 right-0 py-6 px-6 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            <a
              href="#services"
              onClick={() => setIsOpen(false)}
              className="font-sans font-medium text-gray-700 hover:text-blue-900 transition-colors text-base py-1"
            >
              Dịch vụ
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="font-sans font-medium text-gray-700 hover:text-blue-900 transition-colors text-base py-1"
            >
              Về chúng tôi
            </a>
            <a
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="font-sans font-medium text-gray-700 hover:text-blue-900 transition-colors text-base py-1"
            >
              Thư viện
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="font-sans font-medium text-gray-700 hover:text-blue-900 transition-colors text-base py-1"
            >
              Liên hệ
            </a>
            <div className="pt-4 border-t border-gray-100">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex justify-center items-center bg-amber-700 hover:bg-amber-800 text-white font-sans font-semibold px-5 py-3.5 rounded-lg shadow-sm transition-all text-center"
              >
                Đặt lịch tư vấn
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
