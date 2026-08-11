import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="text-primary font-display text-2xl font-bold">!</span>
      </div>
      <h2 className="font-display text-3xl font-medium text-on-background mb-3">
        Không Tìm Thấy Địa Điểm
      </h2>
      <p className="font-sans text-sm text-on-surface-variant max-w-md mb-8 leading-relaxed">
        Yêu cầu mã địa điểm chưa tồn tại trong danh sách dữ liệu. Bạn có thể quay lại trang chủ hoặc xem bản thử nghiệm mẫu.
      </p>
      <a
        href="/demo/mock-spa"
        className="bg-primary text-white font-sans text-sm font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-md"
      >
        Xem demo spa mẫu
      </a>
    </div>
  );
}
