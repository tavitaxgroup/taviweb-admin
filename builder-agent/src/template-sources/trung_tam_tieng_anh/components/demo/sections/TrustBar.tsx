import React from 'react';
import { Star } from 'lucide-react';
import { TrustData } from '../../../types/demo';

interface TrustBarProps {
  data: TrustData;
}

export const TrustBar: React.FC<TrustBarProps> = ({ data }) => {
  // If we have no statistics at all, let's not render the bar
  if (!data.studentsCount && !data.rating && !data.followersCount) {
    return null;
  }

  return (
    <section className="bg-white py-10 border-b border-slate-100 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row flex-wrap justify-around items-center gap-8 md:gap-12">
          {/* Students */}
          {data.studentsCount && (
            <div className="text-center flex-1 min-w-[150px]">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                {data.studentsCount}
              </div>
              <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Học viên tin chọn
              </div>
            </div>
          )}

          {data.studentsCount && data.rating && (
            <div className="hidden sm:block h-10 w-px bg-slate-200" />
          )}

          {/* Rating */}
          {data.rating > 0 && (
            <div className="text-center flex-1 min-w-[150px]">
              <div className="flex items-center justify-center gap-1.5 text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                <span>{data.rating}/5</span>
                <Star size={24} className="fill-amber-400 stroke-amber-400 animate-pulse" />
              </div>
              <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Đánh giá chất lượng
              </div>
            </div>
          )}

          {data.rating > 0 && data.followersCount && (
            <div className="hidden sm:block h-10 w-px bg-slate-200" />
          )}

          {/* Followers */}
          {data.followersCount && (
            <div className="text-center flex-1 min-w-[150px]">
              <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                {data.followersCount}
              </div>
              <div className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Người theo dõi
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
