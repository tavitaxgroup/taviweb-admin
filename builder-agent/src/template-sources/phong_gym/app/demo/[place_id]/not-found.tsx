import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white text-center px-6">
      <div>
        <h1 className="font-anton text-6xl text-[#A3E635] mb-4">404</h1>
        <h2 className="font-anton text-2xl uppercase mb-4">KHÔNG TÌM THẤY PHÒNG TẬP</h2>
        <p className="font-archivo text-zinc-400 mb-8 max-w-md mx-auto">
          Dữ liệu của phòng tập hiện chưa tồn tại hoặc đường dẫn không hợp lệ. Vui lòng quay lại sau!
        </p>
        <a
          href="/"
          className="bg-[#A3E635] text-black font-archivo font-bold px-8 py-3 uppercase tracking-wider"
          style={{ borderRadius: "0px" }}
        >
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
