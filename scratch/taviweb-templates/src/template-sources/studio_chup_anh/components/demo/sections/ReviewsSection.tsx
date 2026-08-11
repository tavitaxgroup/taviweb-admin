import React from 'react';
import { Quote } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface ReviewsSectionProps {
  data: DemoPageData;
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  const reviews = data.reviews;

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fff8f8]" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[#834767]/70">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#201a1c] tracking-tight">
            Lời Chúc Phúc Từ Các Cặp Đôi
          </h2>
          <div className="w-16 h-[2px] bg-[#e1c292] mx-auto mt-4" />
        </div>

        {/* 3-column reviews layout as shown in design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="flex flex-col items-center text-center space-y-6 px-4 py-8 rounded-sm bg-[#fef0f4]/40 border border-[#e1c292]/10"
              id={`review-item-${review.id}`}
            >
              {/* Quote Mark Icon */}
              <div className="text-[#834767]/20">
                <Quote className="w-8 h-8 fill-current rotate-180" />
              </div>

              {/* Quote Content */}
              <blockquote className="font-serif text-base md:text-lg italic text-[#201a1c] leading-relaxed">
                "{review.quote}"
              </blockquote>

              {/* Author & Date */}
              <div className="space-y-1">
                <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#834767]">
                  {review.author}
                </div>
                <div className="font-sans text-[11px] uppercase tracking-wider text-[#6c5962]/60">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
