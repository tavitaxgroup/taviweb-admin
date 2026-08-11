import React from "react";
import { ClipboardCheck, Receipt, Clock, LucideIcon } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface TrustBarProps {
  trust: DemoPageData["trust"];
}

// Map string keys to Lucide icons dynamically to keep the template flexible and robust
const iconMap: Record<string, LucideIcon> = {
  "fact_check": ClipboardCheck,
  "request_quote": Receipt,
  "speed": Clock
};

export function TrustBar({ trust }: TrustBarProps) {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trust.badges.map((badge, idx) => {
            const IconComponent = iconMap[badge.icon] || ClipboardCheck;
            return (
              <div 
                key={idx} 
                className="flex items-start space-x-6 p-6 bg-white border border-slate-200/50 rounded shadow-sm hover:shadow transition-shadow duration-200"
              >
                <div className="bg-amber-100 p-4 rounded text-amber-600 shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-slate-900 mb-1">
                    {badge.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
