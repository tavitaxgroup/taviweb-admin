import React, { useState, useEffect } from "react";
import { BusinessInfo, ContactData } from "../../../types/demo";
import { Menu, X, Phone } from "lucide-react";

interface DemoNavbarProps {
  business: BusinessInfo;
  contact: ContactData;
}

export function DemoNavbar({ business, contact }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-4"
          : "bg-white/20 backdrop-blur-md shadow-sm py-5"
      }`}
    >
      <div className="flex justify-between items-center gap-5 w-full px-5 md:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="min-w-0 max-w-[340px] whitespace-normal break-words font-display text-lg font-semibold leading-tight text-primary tracking-tight hover:opacity-90 transition-opacity sm:max-w-[420px] md:max-w-[500px] md:text-xl"
          title={business.name}
        >
          {business.name}
        </a>

        {/* Desktop Links */}
        <div className="hidden shrink-0 md:flex items-center gap-8">
          <a
            href="#services"
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Dịch vụ
          </a>
          <a
            href="#why-choose-us"
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Ưu điểm
          </a>
          <a
            href="#gallery"
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Không gian
          </a>
          <a
            href="#reviews"
            className="font-sans text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Đánh giá
          </a>
          <a
            href={contact.primaryAction.href}
            className="bg-primary text-white px-7 py-2.5 rounded-full font-sans text-sm font-semibold hover:scale-105 active:opacity-90 transition-all shadow-md"
          >
            {contact.primaryAction.label}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-primary focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-outline-variant py-6 px-5 flex flex-col gap-4 shadow-xl animate-fade-in">
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base font-semibold text-on-surface hover:text-primary py-2"
          >
            Dịch vụ
          </a>
          <a
            href="#why-choose-us"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base font-semibold text-on-surface hover:text-primary py-2"
          >
            Ưu điểm
          </a>
          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base font-semibold text-on-surface hover:text-primary py-2"
          >
            Không gian
          </a>
          <a
            href="#reviews"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base font-semibold text-on-surface hover:text-primary py-2"
          >
            Đánh giá
          </a>
          <a
            href={contact.primaryAction.href}
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white text-center py-3 rounded-full font-sans text-base font-semibold hover:bg-primary/95 transition-colors shadow-md mt-2 flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            {contact.primaryAction.label}
          </a>
        </div>
      )}
    </nav>
  );
}
