import React from "react";
import { ReviewItem } from "../../../types/demo";
import { Star } from "lucide-react";

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-20 bg-surface-container-low px-5 md:px-16 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs md:text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-on-background">
            Khách Hàng Nói Gì
          </h2>
          <div className="w-16 h-0.5 bg-primary/30 mx-auto mt-4"></div>
        </div>

        {/* Reviews Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 md:p-10 rounded-[32px] soft-shadow border border-white/80 hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Five Stars */}
                <div className="flex gap-1 text-primary mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "fill-primary text-primary" : "text-outline-variant"}
                    />
                  ))}
                </div>
                
                <p className="font-sans text-base text-on-surface-variant italic mb-8 leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              {/* User Bio row */}
              <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-6">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center font-display text-lg font-bold text-on-secondary-container shadow-inner">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-sans text-sm font-semibold text-on-surface">
                    {review.author}
                  </h5>
                  <p className="font-sans text-xs text-on-surface-variant/80">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
