import React from 'react';
import { Coffee, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const handleBackToDemo = () => {
    window.location.href = '/demo/quan-cafe-dep';
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 bg-[#ffdcc6] text-[#553722] rounded-full flex items-center justify-center mb-6">
        <Coffee className="w-8 h-8" />
      </div>
      <h1 className="font-sans text-3xl font-extrabold text-[#553722] mb-4">
        Tách cà phê này chưa được pha!
      </h1>
      <p className="text-[#50453e] text-base sm:text-lg max-w-md mb-10 leading-relaxed font-sans">
        Rất tiếc, trang landing page của địa điểm này không tồn tại hoặc dữ liệu đang được cập nhật. Bạn có muốn ghé qua trang demo mặc định của chúng tôi?
      </p>
      <button
        onClick={handleBackToDemo}
        className="bg-[#553722] hover:bg-[#5f402a] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-3 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Xem trang Demo Quán Cafe Đẹp</span>
      </button>
    </div>
  );
}
