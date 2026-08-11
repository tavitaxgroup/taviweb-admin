import React from "react";
import * as LucideIcons from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface TrustBarProps {
  data: DemoPageData;
}

export default function TrustBar({ data }: TrustBarProps) {
  // Gracefully handle missing trust bar metrics
  if (!data.trust || !data.trust.items || data.trust.items.length === 0) {
    return null;
  }

  return (
    <section className="relative z-20 -mt-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl premium-shadow p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border border-brand-outline/35">
        {data.trust.items.map((item, index) => {
          // Dynamic icon resolver from lucide-react
          let IconComponent = LucideIcons.Sparkles;
          if (item.icon) {
            const mappedName = item.icon as keyof typeof LucideIcons;
            if (LucideIcons[mappedName]) {
              IconComponent = LucideIcons[mappedName] as any;
            } else if (item.icon === "Star") {
              IconComponent = LucideIcons.Star;
            } else if (item.icon === "HeartHandshake") {
              IconComponent = LucideIcons.HeartHandshake;
            } else if (item.icon === "UserCheck") {
              IconComponent = LucideIcons.UserCheck;
            } else if (item.icon === "ShieldAlert") {
              IconComponent = LucideIcons.ShieldCheck;
            }
          }

          return (
            <div
              key={index}
              className="flex items-center gap-4 sm:justify-start md:border-r border-brand-outline/30 last:border-none last:md:border-none"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-bg-container/60 flex items-center justify-center text-brand-primary">
                <IconComponent size={24} className="stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <p className="font-serif font-semibold text-lg md:text-xl text-brand-primary leading-tight truncate">
                  {item.value}
                </p>
                <p className="text-xs font-sans font-medium text-brand-secondary/80 tracking-wide uppercase mt-0.5 truncate">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
