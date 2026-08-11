interface NotFoundProps {
  onBackToDefault?: () => void;
}

export default function NotFoundPage({ onBackToDefault }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 text-center">
      <span className="font-display text-7xl font-black text-slate-200">404</span>
      <h2 className="font-display text-2xl font-bold text-slate-800 mt-4 mb-2">
        Không Tìm Thấy Trang Demo
      </h2>
      <p className="font-sans text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
        Không tìm thấy thông tin doanh nghiệp dọn dẹp vệ sinh cho mã địa điểm này. Vui lòng kiểm tra lại đường dẫn.
      </p>
      {onBackToDefault && (
        <button
          onClick={onBackToDefault}
          className="font-label font-bold bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded-md shadow transition-all active:scale-95"
        >
          Xem Trang Demo Mặc Định
        </button>
      )}
    </div>
  );
}
