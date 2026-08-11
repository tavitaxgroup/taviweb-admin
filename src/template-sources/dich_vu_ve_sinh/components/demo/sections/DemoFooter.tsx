import { MessageCircle, Mail, MapPin } from "lucide-react";
import { BusinessInfo, ServiceItem } from "../../../types/demo";

interface DemoFooterProps {
  business: BusinessInfo;
  services: ServiceItem[];
}

export function DemoFooter({ business, services }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Footer area */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Company brief */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-[#7ffc97]">
            {business.name}
          </h3>
          <p className="font-sans text-sm text-slate-400 leading-relaxed">
            Chuyên cung cấp dịch vụ vệ sinh công nghiệp trọn gói, chuyên nghiệp tại khu vực của bạn. Uy tín, tận tâm, chất lượng vượt trội.
          </p>

          <div className="flex flex-col gap-3">
            {business.address && (
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <span>{business.address}</span>
              </div>
            )}
            {business.email && (
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">
                  {business.email}
                </a>
              </div>
            )}
          </div>

          {/* Socials */}
          <div className="flex gap-4 pt-2">
            {business.MessageCircle && (
              <a
                href={business.MessageCircle}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                aria-label="MessageCircle Page"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Services column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-label text-sm font-bold text-[#7ffc97] uppercase tracking-wider">
            Dịch Vụ
          </h4>
          <ul className="space-y-2.5 text-sm">
            {services.map((srv) => (
              <li key={srv.id}>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  {srv.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal columns */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-label text-sm font-bold text-[#7ffc97] uppercase tracking-wider">
            Thông Tin Pháp Lý
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <span className="text-slate-400">Chính sách bảo mật (Privacy Policy)</span>
            </li>
            <li>
              <span className="text-slate-400">Điều khoản dịch vụ (Terms of Service)</span>
            </li>
            <li>
              <span className="text-slate-400">Khu vực phục vụ (Service Areas)</span>
            </li>
            <li>
              <span className="text-slate-400">Tuyển dụng (Careers)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="border-t border-slate-800 bg-slate-950/40 py-6">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} {business.name}. Bảo lưu mọi quyền.</p>
          <p>Thiết kế tinh tế & Uy tín hàng đầu.</p>
        </div>
      </div>
    </footer>
  );
}
