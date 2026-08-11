import React from "react";
import { DemoPageData } from "../../../types/demo";

interface DemoHeroProps {
  data: DemoPageData;
}

export default function DemoHero({ data }: DemoHeroProps) {
  const heroImage = data.hero.image.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8skZTlWKzD3n2us_bwsFt4dun-1o8gZriBB7ldT5y-JjdNTGOHKWpj2STgu1IlGhtA3aUKBc9xEqfwjlTPXP1BSA_fVv-fDxUYFkYjt5uegK1d8yaSc1wy_bCXbZHkZkflvnwriaUtSXaUP4l7f1_5IO8alPfpFED6gngRbBAVR_JQ2YVgtnopc3oukTddvyRvh5LMQlXaLB8Bg79OFNqlK8Ap6JgqovF3Svsytr-ihgduKWaeHDgA";
  const primaryLabel = data.hero.primaryAction?.label?.trim() || "Đặt lịch tư vấn";
  const secondaryLabel = data.hero.secondaryAction?.label?.trim() || "Xem dịch vụ";
  const heroSubtitle = data.hero.subtitle?.trim();

  return (
    <section className="relative min-h-[78vh] lg:h-[760px] flex items-center overflow-hidden">
      {/* Background image & overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={data.hero.image.alt || "Aura Clinic Luxury Interior"}
          className="w-full h-full object-cover scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1.5px]"></div>
        {/* Soft linear gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-brand-bg/40 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-24">
        <div className="max-w-2xl pt-8 md:pt-16">
          {heroSubtitle && (
            <h1 className="font-sans text-4xl md:text-6xl font-light italic text-brand-accent mb-7 leading-tight select-none">
              {heroSubtitle}
            </h1>
          )}
          <p className="font-sans text-lg md:text-xl text-brand-secondary/90 mb-10 max-w-xl leading-relaxed">
            {data.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={data.hero.primaryAction.href}
              className="bg-brand-primary text-center px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase shadow-lg hover:bg-brand-primary/95 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
              style={{ color: "#ffffff" }}
            >
              <span className="text-white">{primaryLabel}</span>
            </a>
            {data.hero.secondaryAction && (
              <a
                href={data.hero.secondaryAction.href}
                className="border border-brand-primary/45 bg-white/90 shadow-sm hover:border-brand-accent text-center px-10 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase hover:bg-white transition-all duration-300"
                style={{ color: "#60233f" }}
              >
                <span className="text-[#60233f]">{secondaryLabel}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
