import React from "react";
import { Star } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ReviewsSectionProps {
  data: DemoPageData;
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  // Gracefully handle empty reviews array
  if (!data.reviews || data.reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section title & rating stars */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-primary mb-4">
          Cảm nhận khách hàng
        </h2>
        <div className="flex justify-center text-brand-accent gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="fill-brand-accent text-brand-accent" />
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.reviews.map((review) => {
          // Compute initials for placeholder avatar if no image is supplied
          const initials = review.author
            ? review.author.split(" ").map((n) => n[0]).join("").substring(0, 2)
            : "KH";

          return (
            <div
              key={review.id}
              className="bg-white p-10 rounded-2xl premium-shadow border border-brand-outline/20 flex flex-col justify-between"
            >
              <p className="text-sm font-sans italic text-brand-secondary/95 mb-8 leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-brand-outline/10">
                {review.avatarUrl ? (
                  <img
                    src={review.avatarUrl}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover bg-brand-bg-low"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-bg-low flex items-center justify-center text-brand-primary font-bold text-sm tracking-wider uppercase">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="font-sans font-bold text-brand-primary text-base">
                    {review.author}
                  </p>
                  <p className="text-xs font-sans font-medium text-brand-secondary/70">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
