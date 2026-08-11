import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-pulse">
      <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-4"></div>
      <p className="font-display text-xl text-primary tracking-wide">Đang tải demo spa</p>
      <p className="font-sans text-xs text-on-surface-variant mt-2">Đang tải không gian thư giãn...</p>
    </div>
  );
}
