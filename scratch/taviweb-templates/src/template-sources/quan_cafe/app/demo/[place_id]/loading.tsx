import React from 'react';
import { Coffee } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fff8f5] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Animated outer pulsing rings */}
        <div className="absolute w-24 h-24 bg-[#ffdcc6] rounded-full animate-ping opacity-25"></div>
        <div className="absolute w-16 h-16 bg-[#efe0cd] rounded-full animate-pulse"></div>
        {/* Coffee Cup Icon */}
        <div className="relative w-12 h-12 bg-[#553722] rounded-full flex items-center justify-center text-white shadow-md">
          <Coffee className="w-6 h-6 animate-bounce" />
        </div>
      </div>
      <p className="mt-6 text-[#553722] font-semibold text-sm tracking-widest uppercase">
        Đang pha chế tách cafe ngọt ngào...
      </p>
    </div>
  );
}
