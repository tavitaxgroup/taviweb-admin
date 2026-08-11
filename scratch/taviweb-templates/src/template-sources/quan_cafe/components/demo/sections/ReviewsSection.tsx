import React from 'react';
import { Star } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function ReviewsSection({ data }: SectionProps) {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-[#fbf2ee]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#553722] mb-4">
            Cảm nhận từ khách hàng
          </h2>
          <p className="text-[#50453e] text-base sm:text-lg">
            Lắng nghe những chia sẻ thật từ những "người quen" của quán.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/10 flex flex-col justify-between"
            >
              <div>
                {/* Gold Stars */}
                <div className="flex text-[#553722] mb-6 gap-0.5">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#553722]" />
                  ))}
                </div>
                <p className="font-sans text-[#1e1b19] mb-8 italic leading-relaxed text-base sm:text-lg">
                  "{review.text}"
                </p>
              </div>
              
              {/* Author Footer */}
              <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-[#ffdcc6] flex items-center justify-center font-bold text-[#553722] text-lg select-none">
                  {review.authorInitials || 'KH'}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-[#1e1b19]">
                    {review.authorName}
                  </p>
                  {review.authorRole && (
                    <p className="text-xs text-[#50453e] opacity-80">
                      {review.authorRole}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
