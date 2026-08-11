import React from "react";
import { MapPin, Phone, Mail, MessageCircle, Share2 } from "lucide-react";
import { BusinessInfo } from "../../../types/demo";

interface DemoFooterProps {
  business: BusinessInfo;
}

export function DemoFooter({ business }: DemoFooterProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4 md:px-12 py-20 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col space-y-6">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-sans text-2xl font-black text-amber-500 uppercase tracking-tighter"
          >
            {business.name}
          </a>
          <p className="text-slate-400 text-sm leading-relaxed">
            Đơn vị tư vấn thiết kế và thi công xây dựng chuyên nghiệp, mang đến giải pháp bền vững cho mọi công trình của bạn.
          </p>
          <div className="flex space-x-3">
            <a 
              href="#" 
              aria-label="MessageCircle Link"
              className="w-10 h-10 border border-slate-700 hover:border-amber-500 rounded flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              aria-label="Share Link"
              className="w-10 h-10 border border-slate-700 hover:border-amber-500 rounded flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Services Links Column */}
        <div>
          <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-slate-800 pb-3">
            Dịch vụ
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button onClick={() => handleScrollTo("services")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Xây nhà trọn gói
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("services")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Sửa chữa cải tạo
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("services")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Thi công phần thô
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("services")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Hoàn thiện nội thất
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("services")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Tư vấn dự toán công trình
              </button>
            </li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div>
          <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-slate-800 pb-3">
            Công ty
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button onClick={() => handleScrollTo("about")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Về chúng tôi
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("gallery")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Dự án đã thực hiện
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("why-choose-us")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Quy trình làm việc
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("why-choose-us")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Sự khác biệt
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollTo("contact")} className="text-slate-400 hover:text-amber-500 transition-colors text-left cursor-pointer">
                Liên hệ tư vấn
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col space-y-5">
          <h4 className="font-sans text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-slate-800 pb-3">
            Liên hệ
          </h4>
          <ul className="space-y-4 text-sm">
            {business.address && (
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{business.address}</span>
              </li>
            )}
            {business.phone && (
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="hover:text-amber-500 transition-colors">
                  {business.phone}
                </a>
              </li>
            )}
            {business.email && (
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-amber-500 transition-colors break-all">
                  {business.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright area */}
      <div className="border-t border-slate-800/80 py-8 px-4 md:px-12 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {business.name}. Mọi quyền được bảo lưu.</p>
      </div>
    </footer>
  );
}
