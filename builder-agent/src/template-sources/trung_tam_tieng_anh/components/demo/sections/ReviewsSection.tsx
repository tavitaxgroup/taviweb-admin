import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../../../types/demo';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section id="giao-vien" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight">
            Học Viên Nói Gì Về Chúng Tôi
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="mb-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < rev.rating ? 'fill-amber-400 stroke-amber-400' : 'text-slate-200'}
                    />
                  ))}
                </div>
                <p className="text-base text-slate-600 italic leading-relaxed">
                  "{rev.content}"
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
