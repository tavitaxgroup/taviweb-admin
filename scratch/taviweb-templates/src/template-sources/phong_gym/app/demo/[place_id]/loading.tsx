import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-archivo">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A3E635] mx-auto mb-4" />
        <p className="text-sm tracking-wider uppercase text-zinc-400">Loading Elite Strength...</p>
      </div>
    </div>
  );
}
