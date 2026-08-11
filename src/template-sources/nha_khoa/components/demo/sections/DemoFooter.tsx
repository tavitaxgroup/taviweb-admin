import { BusinessInfo } from '../../../types/demo';

interface DemoFooterProps {
  business: BusinessInfo;
}

export default function DemoFooter({ business }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Clinic info */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="text-xl font-bold tracking-tight text-white font-sans">
            {business.name}
          </div>
          <p className="text-sm text-gray-500 font-sans max-w-xs">
            Elite Dentistry &amp; Patient Wellness.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <a href="#" className="text-sm hover:text-white transition-colors font-sans">
            Chính sách bảo mật
          </a>
          <a href="#" className="text-sm hover:text-white transition-colors font-sans">
            Điều khoản dịch vụ
          </a>
          <a href="#" className="text-sm hover:text-white transition-colors font-sans">
            Cổng thông tin bệnh nhân
          </a>
          <a href="#" className="text-sm hover:text-white transition-colors font-sans">
            Tuyển dụng
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-650 font-sans text-center md:text-right">
          &copy; {currentYear} {business.name}. Bảo lưu mọi quyền.
        </div>

      </div>
    </footer>
  );
}
