import React from "react";
import { CheckCircle2 } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface AboutSectionProps {
  data: DemoPageData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { about } = data;
  const aboutImage = about.image.src || "https://lh3.googleusercontent.com/aida-public/AB6AXuBCY_hmgasARYG7UzlOe9j6tVPckVKktgsQar8JynRV-cjnFKZgUA-C3_x3lNy3DlYMx0I4XlGeSJdthd47Osesqe_6ITvYFBblRdDWzISL0l8wZwoU6KjXwEYYrAowuNzbIFRdvlyIX_zQ6dpFzOAN14drfokVK4w35kwZpNrP7VzNiOPej6FeU-_k2cw7Nw2wulcunjGxCZi3KnE2KNO2VQ-gcbEhxwQ7l3SDlTITPAdMuUqNaNvgQw";

  return (
    <section id="about-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Text column */}
      <div className="space-y-6">
        <h2 className="font-sans font-semibold text-sm text-brand-accent tracking-widest uppercase">
          {about.badge || "GIỚI THIỆU"}
        </h2>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-brand-primary leading-tight">
          {about.title}
        </h3>
        <p className="font-sans text-lg text-brand-secondary/90 leading-relaxed">
          {about.description1}
        </p>
        <p className="font-sans text-sm text-brand-secondary/80 leading-relaxed">
          {about.description2}
        </p>

        {about.points && about.points.length > 0 && (
          <div className="space-y-3 pt-4">
            {about.points.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-brand-accent flex-shrink-0" />
                <span className="font-sans text-brand-primary font-medium italic">
                  {point}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image column */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden aspect-[4/5] premium-shadow">
          <img
            src={aboutImage}
            alt={about.image.alt || "About Clinic Image"}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {about.experienceYears > 0 && (
          <div className="absolute -bottom-8 -left-8 bg-brand-accent-light/95 backdrop-blur-sm p-6 md:p-8 rounded-xl max-w-[220px] shadow-lg border border-brand-accent-light">
            <p className="font-serif text-4xl md:text-5xl font-bold text-brand-accent text-center mb-1">
              {about.experienceYears}+
            </p>
            <p className="text-[11px] font-sans font-semibold text-brand-accent/90 text-center tracking-wide uppercase leading-normal">
              {about.experienceLabel}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
