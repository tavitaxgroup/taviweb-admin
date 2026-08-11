import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="font-serif text-6xl font-light text-brand-primary">404</h1>
        <h2 className="font-serif text-2xl text-brand-primary">Không tìm thấy phòng khám</h2>
        <p className="font-sans text-sm text-brand-secondary/80 leading-relaxed">
          Địa chỉ yêu cầu không tồn tại hoặc dữ liệu mẫu chưa được thiết lập cho cơ sở này.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-block bg-brand-primary text-white px-8 py-3 rounded-full font-sans font-semibold text-sm tracking-widest uppercase shadow-md hover:scale-95 transition-all duration-200"
          >
            Về trang Demo chính
          </a>
        </div>
      </div>
    </div>
  );
}
