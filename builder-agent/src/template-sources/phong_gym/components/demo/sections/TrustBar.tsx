import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface TrustBarProps {
  data: DemoPageData;
}

export default function TrustBar({ data }: TrustBarProps) {
  // If no rating or badges, hide the section as per fallback rules
  if (!data.trust || (!data.trust.rating && !data.trust.badges?.length)) {
    return null;
  }

  return (
    <section className="bg-[#A3E635] py-4 border-y-2 border-black" id="trust-bar-section">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Rating Metrics */}
        {data.trust.rating > 0 && (
          <div className="flex items-center gap-3" id="trust-rating-block">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => {
                const isFullStar = i < Math.floor(data.trust.rating);
                return (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      isFullStar ? "fill-black text-black" : "text-black/40"
                    }`}
                  />
                );
              })}
            </div>
            <span className="font-archivo font-bold text-black text-sm uppercase tracking-wide">
              {data.trust.rating}/5 RATING ({data.trust.ratingCount}+ MEMBERS)
            </span>
          </div>
        )}

        {/* Dynamic Badges */}
        {data.trust.badges && data.trust.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8" id="trust-badges-block">
            {data.trust.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-black fill-transparent" />
                <span className="font-archivo font-bold text-black text-xs uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
