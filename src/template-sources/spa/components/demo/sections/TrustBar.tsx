import React from "react";
import { TrustData } from "../../../types/demo";
import { Star, Heart } from "lucide-react";

interface TrustBarProps {
  trust: TrustData;
}

export function TrustBar({ trust }: TrustBarProps) {
  if (!trust || (!trust.rating && !trust.followers)) return null;

  return (
    <section className="bg-surface-container-low border-b border-outline-variant/10 py-5">
      <div className="max-w-7xl mx-auto px-5 md:px-16 flex flex-wrap justify-center md:justify-start gap-8 items-center text-on-surface">
        {trust.rating && (
          <div className="flex items-center gap-2 bg-white/40 py-2 px-4 rounded-full border border-white/60 shadow-sm">
            <Star size={18} className="text-primary fill-primary" />
            <span className="font-sans text-xs md:text-sm font-medium tracking-wide">
              <span className="font-bold text-primary">{trust.rating.score}</span> {trust.rating.label}
            </span>
          </div>
        )}
        
        {trust.followers && (
          <div className="flex items-center gap-2 bg-white/40 py-2 px-4 rounded-full border border-white/60 shadow-sm">
            <Heart size={18} className="text-primary fill-primary animate-pulse" />
            <span className="font-sans text-xs md:text-sm font-medium tracking-wide">
              <span className="font-bold text-primary">{trust.followers.count}</span> {trust.followers.label}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
