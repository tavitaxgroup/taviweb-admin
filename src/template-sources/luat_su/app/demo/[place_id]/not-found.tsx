import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center p-6 text-center">
      <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-full w-fit mb-6">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h2 className="font-headline-md font-bold text-blue-950 text-2xl sm:text-3xl mb-3">
        Không Tìm Thấy Văn Phòng Luật
      </h2>
      <p className="font-sans text-gray-600 text-base max-w-md mb-8">
        Mã số văn phòng hoặc đường dẫn bạn truy cập không tồn tại hoặc đã thay đổi. Vui lòng kiểm tra lại.
      </p>
      <a
        href="/demo/juris-integrity"
        className="inline-flex justify-center items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-sans font-semibold text-sm px-6 py-3 rounded-lg transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Về văn phòng mặc định
      </a>
    </div>
  );
}
