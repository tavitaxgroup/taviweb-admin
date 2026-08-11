import React from "react";
import { Users, ShieldCheck, Calendar, LucideIcon } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface WhyChooseUsSectionProps {
  whyChooseUs: DemoPageData["whyChooseUs"];
}

const iconMap: Record<string, LucideIcon> = {
  "engineering": Users,
  "verified_user": ShieldCheck,
  "calendar_today": Calendar
};

export function WhyChooseUsSection({ whyChooseUs }: WhyChooseUsSectionProps) {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/50" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
            {whyChooseUs.tagline}
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {whyChooseUs.title}
          </h2>
        </div>

        {/* Structured Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.items.map((item, idx) => {
            const IconComp = iconMap[item.icon] || ShieldCheck;
            return (
              <div 
                key={idx} 
                className="bg-white p-8 border border-slate-200/60 rounded shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Visual Icon Badge */}
                <div className="bg-slate-900 text-amber-500 p-5 rounded mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                  <IconComp className="w-8 h-8" />
                </div>
                
                {/* Text Blocks */}
                <h3 className="font-sans text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
