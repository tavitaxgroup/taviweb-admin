import React from 'react';
import { BusinessInfo } from '../../../types/demo';

interface DemoFooterProps {
  business: BusinessInfo;
}

export const DemoFooter: React.FC<DemoFooterProps> = ({ business }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-white">
              {business.name}
            </span>
            <p className="text-xs text-slate-500 max-w-xs">
              © {currentYear} {business.name}. Bảo lưu mọi quyền. Lộ trình đào tạo chuẩn quốc tế hàng đầu Việt Nam.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#khoa-hoc" className="text-sm text-slate-400 hover:text-white transition-colors">
              Khóa học
            </a>
            <a href="#lo-trinh" className="text-sm text-slate-400 hover:text-white transition-colors">
              Lộ trình
            </a>
            <a href="#giao-vien" className="text-sm text-slate-400 hover:text-white transition-colors">
              Giáo viên
            </a>
            <a href="#tu-van" className="text-sm text-slate-400 hover:text-white transition-colors">
              Liên hệ
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
