import { Star, Heart, Award } from 'lucide-react';
import { TrustData } from '../../../types/demo';

interface TrustBarProps {
  trust: TrustData;
}

export default function TrustBar({ trust }: TrustBarProps) {
  return (
    <div className="bg-[#f1eded] py-10 relative z-20 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 md:gap-24 items-center">
        {/* Rating */}
        <div className="flex items-center gap-3">
          <Star className="text-[#855316] fill-[#855316]" size={20} />
          <span 
            className="text-base md:text-lg font-bold text-[#121315]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {trust.rating}
          </span>
        </div>

        {/* Separator 1 */}
        <div className="hidden sm:block h-8 w-[1px] bg-gray-300" />

        {/* Followers */}
        <div className="flex items-center gap-3">
          <Heart className="text-[#855316] fill-[#855316]" size={20} />
          <span 
            className="text-base md:text-lg font-bold text-[#121315]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {trust.followers}
          </span>
        </div>

        {/* Separator 2 */}
        <div className="hidden sm:block h-8 w-[1px] bg-gray-300" />

        {/* Certified */}
        <div className="flex items-center gap-3">
          <Award className="text-[#855316] fill-[#855316]" size={20} />
          <span 
            className="text-base md:text-lg font-bold text-[#121315]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {trust.certifiedText}
          </span>
        </div>
      </div>
    </div>
  );
}
