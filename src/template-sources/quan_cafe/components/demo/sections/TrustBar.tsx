import React from 'react';
import { Star } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function TrustBar({ data }: SectionProps) {
  // If no rating or checkins are provided, we can hide/shorten or render default metrics
  return (
    <section className="bg-white border-y border-outline-variant/20 py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          
          {/* Rating Metric */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center justify-center gap-1 text-[#553722]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#553722]" />
              ))}
            </div>
            <div className="text-3xl font-extrabold text-[#1e1b19] font-sans">
              {data.business.rating ? `${data.business.rating} / 5.0` : '4.9 / 5.0'}
            </div>
            <div className="text-xs font-semibold text-[#50453e] uppercase tracking-[0.2em]">
              {data.trust.ratingText}
            </div>
          </div>

          {/* Customer Metric */}
          <div className="flex flex-col items-center justify-center space-y-3 border-y md:border-y-0 md:border-x border-outline-variant/20 py-8 md:py-0">
            <div className="text-3xl font-extrabold text-[#1e1b19] font-sans">
              {data.business.ratingCount ? `${data.business.ratingCount.toLocaleString()}+` : '10,000+'}
            </div>
            <div className="text-xs font-semibold text-[#50453e] uppercase tracking-[0.2em]">
              {data.trust.customerCountText}
            </div>
          </div>

          {/* Checkins Metric */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-3xl font-extrabold text-[#1e1b19] font-sans">
              2,500+
            </div>
            <div className="text-xs font-semibold text-[#50453e] uppercase tracking-[0.2em]">
              {data.trust.checkInCountText}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
