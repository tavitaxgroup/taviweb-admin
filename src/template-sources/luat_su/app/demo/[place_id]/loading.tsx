import { Scale } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="bg-blue-900 p-4 rounded-full text-white shadow-lg">
          <Scale className="w-10 h-10 animate-spin" />
        </div>
        <p className="font-sans font-semibold text-blue-950 text-base tracking-wide">
          Đang tải thông tin văn phòng luật...
        </p>
      </div>
    </div>
  );
}
