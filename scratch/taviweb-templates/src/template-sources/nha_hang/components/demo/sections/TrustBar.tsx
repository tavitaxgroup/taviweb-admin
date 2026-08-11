import React from "react";
import { Star, Utensils, Calendar, Award, Leaf } from "lucide-react";
import { TrustData } from "../../../types/demo";

interface TrustBarProps {
  trust: TrustData;
}

export default function TrustBar({ trust }: TrustBarProps) {
  // Simple map to render the correct Lucide icon based on key names
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "restaurant":
        return <Utensils className="text-[#7c580f] w-7 h-7" />;
      case "calendar_month":
        return <Calendar className="text-[#7c580f] w-7 h-7" />;
      case "workspace_premium":
        return <Award className="text-[#7c580f] w-7 h-7" />;
      case "eco":
        return <Leaf className="text-[#7c580f] w-7 h-7" />;
      default:
        return <Utensils className="text-[#7c580f] w-7 h-7" />;
    }
  };

  return (
    <section 
      className="py-16 bg-[#f6f3ee] border-b border-[#dec0bd]/30" 
      id="trust-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Rating Block */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#1c1c19]">
              {trust.rating.toFixed(1)}/5
            </span>
            <div className="flex text-[#7c580f]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <Star className="w-5 h-5 fill-current opacity-70" />
            </div>
          </div>
          <p className="text-xs md:text-sm font-semibold tracking-widest text-[#574240] uppercase">
            Dựa trên {trust.reviewsCount}+ đánh giá thực khách
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block h-12 w-px bg-[#dec0bd]"></div>
        <div className="block md:hidden h-px w-24 bg-[#dec0bd]"></div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full md:w-auto">
          {trust.badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3" id={`trust-badge-${idx}`}>
              <div className="p-3 bg-[#f0ede9] rounded-full flex items-center justify-center">
                {renderIcon(badge.icon)}
              </div>
              <span className="text-xs font-semibold tracking-wider text-[#1c1c19] uppercase text-center">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
