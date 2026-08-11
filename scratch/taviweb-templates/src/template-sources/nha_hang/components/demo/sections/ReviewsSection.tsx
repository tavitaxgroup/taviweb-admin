import React from "react";
import { Star, Quote } from "lucide-react";
import { ReviewItem } from "../../../types/demo";

interface ReviewsProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsProps) {
  return (
    <section 
      className="py-24 bg-[#fcf9f4] overflow-hidden" 
      id="reviews-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[#7c580f] font-semibold text-xs md:text-sm tracking-widest uppercase mb-4 block">
            Cảm nhận thực khách
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1c19]">
            Nhận Xét Từ Những Vị Khách Quý
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white border border-[#dec0bd]/20 p-8 shadow-sm relative hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              id={`review-item-${index}`}
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 text-[#f0ede9] opacity-70">
                <Quote className="w-10 h-10 transform rotate-180" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex text-[#7c580f] mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-sans text-sm md:text-base text-[#574240] italic leading-relaxed mb-8 relative z-10">
                  "{review.content}"
                </p>
              </div>

              {/* Author & Date */}
              <div className="flex justify-between items-center border-t border-[#dec0bd]/10 pt-4">
                <span className="font-serif font-semibold text-sm text-[#1c1c19]">
                  {review.author}
                </span>
                {review.date && (
                  <span className="text-[10px] tracking-wider uppercase text-[#574240]/60">
                    {review.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
