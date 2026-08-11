import React from "react";
import { motion } from "motion/react";
import { HeroData } from "../../../types/demo";

interface HeroProps {
  hero: HeroData;
}

export default function DemoHero({ hero }: HeroProps) {
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero-section">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          alt="Không gian nhà hàng sang trọng"
          className="w-full h-full object-cover"
          src={hero.backgroundImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/58 to-black/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.36)_72%)]" />
      </div>

      <div className="relative z-10 text-center px-6 md:px-0 max-w-5xl">
        {hero.subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#f2d58d] font-sans text-xs md:text-sm font-semibold tracking-[0.32em] uppercase mb-6 block"
          >
            {hero.subtitle}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[clamp(3rem,6.4vw,5.9rem)] text-white font-bold mb-10 leading-[1.04] tracking-normal whitespace-pre-line"
          id="hero-title"
          style={{
            fontFamily: 'Cambria, "Times New Roman", Georgia, serif',
            textShadow: "0 4px 24px rgba(0,0,0,0.55)",
          }}
        >
          {hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => handleScrollTo("contact-section")}
            className="bg-[#8b000b] hover:bg-[#a20a16] px-12 py-5 text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 w-full md:w-auto cursor-pointer border border-[#8b000b] shadow-lg shadow-black/20"
            id="hero-primary-cta"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">{hero.primaryCta?.label || "Đặt bàn ngay"}</span>
          </button>
          <button
            onClick={() => handleScrollTo("services-section")}
            className="border border-white/55 bg-black/20 backdrop-blur-sm px-12 py-5 text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-white/15 hover:border-white transition-all duration-300 w-full md:w-auto cursor-pointer"
            id="hero-secondary-cta"
            style={{ color: "#ffffff" }}
          >
            <span className="text-white">{hero.secondaryCta?.label || "Xem thực đơn"}</span>
          </button>
        </motion.div>
      </div>

      <div
        onClick={() => handleScrollTo("trust-section")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-white/70 hover:text-white transition-colors flex flex-col items-center gap-1 z-10"
        id="hero-scroll-indicator"
      >
        <span className="text-xs uppercase tracking-widest">Cuộn xuống</span>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
