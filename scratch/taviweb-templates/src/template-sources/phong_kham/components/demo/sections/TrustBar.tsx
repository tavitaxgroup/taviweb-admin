import { Star } from 'lucide-react';
import { TrustData } from '../../../types/demo';

interface TrustBarProps {
  trust: TrustData;
}

export default function TrustBar({ trust }: TrustBarProps) {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8">
          {/* Left Side: Rating */}
          <div className="flex items-center gap-4">
            <div className="flex text-amber-500">
              <Star className="w-5 h-5 fill-current text-amber-400" />
              <Star className="w-5 h-5 fill-current text-amber-400" />
              <Star className="w-5 h-5 fill-current text-amber-400" />
              <Star className="w-5 h-5 fill-current text-amber-400" />
              <Star className="w-5 h-5 fill-current text-amber-400" />
            </div>
            <span className="font-display text-lg font-bold text-slate-800">
              {trust.rating}/5{' '}
              <span className="text-sm font-normal text-slate-500">
                ({trust.reviewCount}+ đánh giá)
              </span>
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>

          {/* Right Side: Achievements */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-75">
            {trust.achievements.map((achievement, index) => (
              <span
                key={index}
                className="font-display text-sm font-bold text-slate-600 border border-slate-200/60 rounded-full px-4 py-1 bg-white shadow-xs"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
