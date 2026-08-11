import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface DemoNavbarProps {
  data: DemoPageData;
}

export default function DemoNavbar({ data }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Dịch vụ", href: "#services-section" },
    { label: "Về chúng tôi", href: "#about-section" },
    { label: "Không gian", href: "#gallery-section" },
    { label: "Đánh giá", href: "#reviews-section" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/85 backdrop-blur-md border-b border-brand-outline/20">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center gap-5">
        {/* Logo text */}
        <div
          className="min-w-0 max-w-[360px] whitespace-normal break-words font-serif text-lg font-bold leading-tight tracking-[0.06em] text-brand-primary uppercase sm:max-w-[440px] md:max-w-[520px] md:text-xl"
          title={data.business.name}
        >
          {data.business.logoText || data.business.name}
        </div>

        {/* Desktop Links */}
        <div className="hidden shrink-0 md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-brand-secondary hover:text-brand-primary font-sans font-medium text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden shrink-0 md:flex items-center">
          <a
            href={data.hero.primaryAction.href}
            className="bg-brand-primary text-white hover:bg-brand-primary/90 px-6 py-2.5 rounded-full font-sans font-semibold text-sm tracking-wide shadow-md hover:scale-95 transition-all duration-200"
          >
            {data.hero.primaryAction.label}
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-brand-primary p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden bg-brand-bg border-t border-brand-outline/20 absolute left-0 right-0 py-6 px-6 shadow-xl space-y-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-brand-secondary hover:text-brand-primary font-sans font-medium text-lg py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href={data.hero.primaryAction.href}
            onClick={() => setIsOpen(false)}
            className="bg-brand-primary text-white w-full text-center py-3 rounded-full font-sans font-semibold text-sm tracking-wide shadow-md mt-4"
          >
            {data.hero.primaryAction.label}
          </a>
        </div>
      )}
    </header>
  );
}
