export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin"></div>
      <p className="font-label text-sm font-semibold text-slate-500 tracking-wide uppercase animate-pulse">
        Đang tải trang demo...
      </p>
    </div>
  );
}
