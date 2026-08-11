import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface DemoNavbarProps {
  data: DemoPageData;
}

export default function DemoNavbar({ data }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/90 backdrop-blur-md border-b-2 border-black" id="nav-container">
      <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
        {/* Brand Name */}
        <a href="#" className="font-anton text-2xl tracking-tighter !text-[#A3E635]" id="brand-logo">
          {data.business.name}
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#services"
            className="font-archivo text-sm font-bold tracking-wide !text-[#A3E635] border-b-2 border-[#A3E635] pb-1"
            id="nav-link-services"
          >
            Services
          </a>
          <a
            href="#gallery"
            className="font-archivo text-sm font-semibold tracking-wide !text-white hover:!text-[#A3E635] transition-colors"
            id="nav-link-gallery"
          >
            Gallery
          </a>
          <a
            href="#reviews"
            className="font-archivo text-sm font-semibold tracking-wide !text-white hover:!text-[#A3E635] transition-colors"
            id="nav-link-reviews"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="font-archivo text-sm font-semibold tracking-wide !text-white hover:!text-[#A3E635] transition-colors"
            id="nav-link-contact"
          >
            Contact
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <a
            href="#register"
            className="bg-[#A3E635] hover:bg-[#8fd128] !text-black font-archivo font-bold text-xs uppercase px-6 py-3 tracking-wider transition-all duration-150 inline-block"
            style={{ borderRadius: "0px" }}
            id="nav-cta-button"
          >
            Đăng ký tư vấn
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden !text-white hover:!text-[#A3E635] p-2"
          aria-label="Toggle Menu"
          id="mobile-menu-btn"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#111827] border-t border-black px-6 py-4 space-y-4" id="mobile-drawer">
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block font-archivo text-base font-bold !text-[#A3E635]"
            id="mob-link-services"
          >
            Services
          </a>
          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="block font-archivo text-base font-semibold !text-white hover:!text-[#A3E635]"
            id="mob-link-gallery"
          >
            Gallery
          </a>
          <a
            href="#reviews"
            onClick={() => setIsOpen(false)}
            className="block font-archivo text-base font-semibold !text-white hover:!text-[#A3E635]"
            id="mob-link-reviews"
          >
            Reviews
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block font-archivo text-base font-semibold !text-white hover:!text-[#A3E635]"
            id="mob-link-contact"
          >
            Contact
          </a>
          <a
            href="#register"
            onClick={() => setIsOpen(false)}
            className="block bg-[#A3E635] !text-black font-archivo font-bold text-center py-3 uppercase tracking-wider"
            style={{ borderRadius: "0px" }}
            id="mob-cta-btn"
          >
            Đăng ký tư vấn
          </a>
        </div>
      )}
    </nav>
  );
}
