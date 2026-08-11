import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../../../types/demo';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-white max-w-7xl mx-auto px-4 md:px-12 scroll-mt-20">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs font-bold text-[#fd761a] tracking-widest uppercase">
          Ý KIẾN KHÁCH HÀNG
        </span>
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#0a1422] tracking-tight mt-2">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>
        <p className="text-[#44474c] max-w-2xl mx-auto text-base md:text-lg mt-3 leading-relaxed">
          Sự tin tưởng và hài lòng của hàng nghìn khách hàng là động lực lớn nhất để tập thể AutoGarage nỗ lực mỗi ngày.
        </p>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="bg-[#fbf9fa] p-8 rounded-2xl border border-[#c5c6cc]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating Icons */}
              <div className="flex gap-1 text-[#fd761a] mb-5">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <blockquote className="italic text-[#44474c] text-sm md:text-base leading-relaxed mb-6">
                "{review.text}"
              </blockquote>
            </div>

            {/* Author details with customized avatar */}
            <div className="flex items-center gap-4 border-t border-[#c5c6cc]/20 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#ffdbca] flex items-center justify-center font-bold text-[#341100] text-sm flex-shrink-0">
                {review.authorInitials}
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-[#0a1422]">
                  {review.author}
                </p>
                <p className="text-xs text-[#44474c] font-medium">
                  {review.vehicle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
