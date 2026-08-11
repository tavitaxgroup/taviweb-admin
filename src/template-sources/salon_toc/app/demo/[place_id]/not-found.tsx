export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-6 text-center">
      <h2 className="text-2xl font-bold text-[#121315] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
        Không Tìm Thấy Doanh Nghiệp
      </h2>
      <p className="text-sm text-gray-500 max-w-md mb-8">
        Rất tiếc, thông tin doanh nghiệp bạn yêu cầu hiện chưa được cài đặt hoặc chưa kết nối với hệ thống dữ liệu.
      </p>
      <a 
        href="/"
        className="bg-[#121315] text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#855316] transition-colors duration-300"
      >
        Quay lại trang chính
      </a>
    </div>
  );
}
