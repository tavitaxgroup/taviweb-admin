import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { BusinessInfo } from "../../../types/demo";

interface DemoNavbarProps {
  business: BusinessInfo;
}

export function DemoNavbar({ business }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
      isScrolled ? "h-16 shadow-md border-slate-200" : "h-20 border-slate-100"
    }`}>
      <div className="flex justify-between items-center w-full px-4 md:px-12 h-full max-w-7xl mx-auto">
        {/* Brand Logo / Business Name */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-sans text-lg md:text-xl font-black leading-tight tracking-tighter text-slate-900 uppercase whitespace-normal break-words max-w-[340px] sm:max-w-[420px] md:max-w-[500px]"
          title={business.name}
        >
          {business.name}
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleScrollTo("services")} 
            className="font-sans text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
          >
            Dịch vụ
          </button>
          <button 
            onClick={() => handleScrollTo("gallery")} 
            className="font-sans text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
          >
            Công trình
          </button>
          <button 
            onClick={() => handleScrollTo("about")} 
            className="font-sans text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
          >
            Giới thiệu
          </button>
          <button 
            onClick={() => handleScrollTo("why-choose-us")} 
            className="font-sans text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
          >
            Sự khác biệt
          </button>
          <button 
            onClick={() => handleScrollTo("contact")} 
            className="font-sans text-sm font-semibold text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
          >
            Liên hệ
          </button>

          {/* Call CTA Button */}
          {business.phone ? (
            <a 
              href={`tel:${business.phone.replace(/\s+/g, '')}`} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded text-sm font-bold uppercase transition-all duration-200 shadow-sm flex items-center space-x-2 shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi tư vấn</span>
            </a>
          ) : (
            <button 
              onClick={() => handleScrollTo("contact")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded text-sm font-bold uppercase transition-all duration-200 shadow-sm shrink-0"
            >
              Nhận báo giá
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-slate-800 hover:text-amber-500 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-6 px-4 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <button 
            onClick={() => handleScrollTo("services")} 
            className="text-left font-sans text-base font-semibold text-slate-700 py-2 border-b border-slate-100"
          >
            Dịch vụ
          </button>
          <button 
            onClick={() => handleScrollTo("gallery")} 
            className="text-left font-sans text-base font-semibold text-slate-700 py-2 border-b border-slate-100"
          >
            Công trình
          </button>
          <button 
            onClick={() => handleScrollTo("about")} 
            className="text-left font-sans text-base font-semibold text-slate-700 py-2 border-b border-slate-100"
          >
            Giới thiệu
          </button>
          <button 
            onClick={() => handleScrollTo("why-choose-us")} 
            className="text-left font-sans text-base font-semibold text-slate-700 py-2 border-b border-slate-100"
          >
            Sự khác biệt
          </button>
          <button 
            onClick={() => handleScrollTo("contact")} 
            className="text-left font-sans text-base font-semibold text-slate-700 py-2 border-b border-slate-100"
          >
            Liên hệ
          </button>

          {business.phone ? (
            <a 
              href={`tel:${business.phone.replace(/\s+/g, '')}`} 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded font-bold uppercase transition-all text-center flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi: {business.phone}</span>
            </a>
          ) : (
            <button 
              onClick={() => handleScrollTo("contact")}
              className="bg-slate-900 hover:bg-slate-800 text-white py-3 rounded font-bold uppercase transition-all text-center"
            >
              Nhận báo giá
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
