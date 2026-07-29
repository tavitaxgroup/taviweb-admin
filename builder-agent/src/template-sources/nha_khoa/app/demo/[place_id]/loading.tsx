export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Medical Spinning Loader */}
        <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-teal-100 border-t-teal-700" />
        <p className="text-sm font-semibold tracking-wide text-gray-500 font-sans">
          Đang tải trang nụ cười...
        </p>
      </div>
    </div>
  );
}
