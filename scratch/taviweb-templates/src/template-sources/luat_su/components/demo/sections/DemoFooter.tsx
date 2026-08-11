import { Scale, Share2 } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function DemoFooter({ data }: SectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 sm:px-8 bg-blue-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand name & Copyright info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <span className="font-headline-md font-bold text-xl text-amber-500">
            {data.business.name}
          </span>
          <p className="font-sans text-xs text-gray-400 max-w-md">
            © {currentYear} {data.business.name}. Bảo lưu mọi quyền. Tư vấn pháp lý chuyên nghiệp và tận tâm.
          </p>
        </div>

        {/* Footer legal links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300">
          <a href="#" className="hover:text-amber-500 transition-colors">
            Điều khoản dịch vụ
          </a>
          <a href="#" className="hover:text-amber-500 transition-colors">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-amber-500 transition-colors">
            Sơ đồ trang web
          </a>
        </div>

        {/* Social interactions */}
        <div className="flex gap-4">
          <a
            href="#"
            title="Đạo đức nghề nghiệp"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all"
          >
            <Scale className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: data.seo.title,
                  text: data.seo.description,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            title="Chia sẻ"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
