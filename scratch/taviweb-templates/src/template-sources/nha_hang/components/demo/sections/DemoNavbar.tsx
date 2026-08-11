import React, { useEffect, useState } from "react";
import { BusinessData } from "../../../types/demo";

interface NavbarProps {
  business: BusinessData;
}

export default function DemoNavbar({ business }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      id="top-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-16 py-4 flex justify-between items-center border-b ${
        isScrolled
          ? "bg-[#140c08]/92 backdrop-blur-xl border-[#e8c982]/20 shadow-lg"
          : "bg-[#140c08]/72 backdrop-blur-md border-white/10"
      }`}
    >
      <div
        className="cursor-pointer select-none text-2xl md:text-3xl font-bold tracking-[0.08em] text-[#f7ead2]"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        id="navbar-logo"
        style={{ fontFamily: 'Cambria, "Times New Roman", Georgia, serif' }}
      >
        {business.name || "L'Echelle"}
      </div>

      <div className="hidden md:flex gap-8 items-center">
        <button
          onClick={() => handleScrollTo("services-section")}
          className="text-sm font-semibold tracking-widest text-[#f2d58d] border-b-2 border-[#f2d58d] pb-1 hover:text-white hover:border-white transition-all cursor-pointer"
          id="nav-menu-btn"
        >
          Thực đơn
        </button>
        <button
          onClick={() => handleScrollTo("gallery-section")}
          className="text-sm font-semibold tracking-widest text-white/78 hover:text-[#f2d58d] transition-all cursor-pointer"
          id="nav-space-btn"
        >
          Không gian
        </button>
        <button
          onClick={() => handleScrollTo("about-section")}
          className="text-sm font-semibold tracking-widest text-white/78 hover:text-[#f2d58d] transition-all cursor-pointer"
          id="nav-about-btn"
        >
          Về chúng tôi
        </button>
      </div>

      <button
        onClick={() => handleScrollTo("contact-section")}
        className="bg-[#8b000b] hover:bg-[#a20a16] text-white px-6 md:px-8 py-3 text-xs md:text-sm font-semibold tracking-wider uppercase transition-transform active:scale-95 cursor-pointer shadow-lg shadow-black/20"
        id="nav-reserve-btn"
        style={{ color: "#ffffff" }}
      >
        Đặt bàn ngay
      </button>
    </nav>
  );
}
