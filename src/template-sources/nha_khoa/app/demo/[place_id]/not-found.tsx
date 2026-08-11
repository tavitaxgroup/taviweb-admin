export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-150">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 font-sans">
          Không tìm thấy trang
        </h2>
        <p className="mt-4 text-sm text-gray-550 font-sans leading-relaxed">
          Phòng khám bạn yêu cầu hiện chưa có bản xem thử hoặc địa chỉ xem thử không tồn tại.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 transition-all font-sans"
          >
            Về trang chủ Lumina Dental
          </a>
        </div>
      </div>
    </div>
  );
}
