import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface TrustBarProps {
  data: DemoPageData;
}

export default function TrustBar({ data }: TrustBarProps) {
  // If neither is present, don't show the bar
  if (!data.trust.facebookFollowers && !data.trust.ratingText) {
    return null;
  }

  return (
    <div className="bg-[#f8eaee]/90 py-5 border-y border-[#e1c292]/30" id="trust-bar">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-sm font-sans text-[#6c5962]">
        
        {/* Followers / MessageCircle Info */}
        {data.trust.facebookFollowers && (
          <div className="flex items-center gap-3" id="trust-followers">
            <div className="p-2 bg-[#834767]/10 rounded-full text-[#834767]">
              <MessageCircle className="w-4 h-4 fill-[#834767]" />
            </div>
            <span className="font-medium tracking-wide">{data.trust.facebookFollowers}</span>
          </div>
        )}

        {/* Decorative Divider for desktop */}
        <div className="hidden md:block w-[1px] h-6 bg-[#e1c292]/40" />

        {/* Rating info */}
        {data.trust.ratingText && (
          <div className="flex items-center gap-3" id="trust-rating">
            <div className="flex items-center text-[#e1c292]" id="stars-row">
              {Array.from({ length: data.trust.ratingValue || 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-medium tracking-wide">{data.trust.ratingText}</span>
          </div>
        )}

      </div>
    </div>
  );
}
