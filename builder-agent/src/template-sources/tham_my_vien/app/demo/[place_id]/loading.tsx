import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
      {/* Elegantly styled pulsing logo loader */}
      <div className="space-y-4">
        <div className="font-serif text-3xl font-light tracking-widest text-brand-primary uppercase animate-pulse">
          AURA CLINIC
        </div>
        <div className="w-16 h-0.5 bg-brand-accent-light mx-auto rounded-full animate-bounce"></div>
        <p className="font-sans text-xs text-brand-secondary/60 tracking-wider uppercase">
          Đang tải trải nghiệm...
        </p>
      </div>
    </div>
  );
}
