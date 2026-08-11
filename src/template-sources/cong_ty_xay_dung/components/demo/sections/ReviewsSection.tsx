import React from "react";
import { Star } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ReviewsSectionProps {
  reviews: DemoPageData["reviews"];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-slate-100/60 border-t border-slate-200/50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
            Đánh giá từ khách hàng
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Khách hàng nói gì về chúng tôi
          </h2>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white p-8 border border-slate-200/60 rounded shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Visual 5-Star Rating block */}
                <div className="flex text-amber-500 mb-6 space-x-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ opacity: i < rev.rating ? 1 : 0.2 }}
                    />
                  ))}
                </div>

                {/* Italicized Review Comment text */}
                <p className="font-sans text-sm italic text-slate-600 mb-8 leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              {/* Author info footer inside the card */}
              <div className="flex items-center pt-4 border-t border-slate-100">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-amber-500 font-extrabold text-sm mr-4 shrink-0 shadow-inner">
                  {rev.authorInitials}
                </div>
                <div className="truncate">
                  <p className="font-sans text-sm font-bold text-slate-900 truncate">
                    {rev.authorName}
                  </p>
                  <p className="font-sans text-xs text-slate-500 truncate">
                    {rev.authorRole}
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
