import { MessageCircle, Mail, ShieldCheck } from 'lucide-react';
import { BusinessData } from '../../../types/demo';

interface DemoFooterProps {
  business: BusinessData;
}

export default function DemoFooter({ business }: DemoFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white font-sans text-slate-500 border-t border-slate-100">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="font-display text-2xl font-extrabold text-[#004ac6] tracking-tight">
            {business.name}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            © {year} {business.name}. Bảo lưu mọi quyền. <br />
            Dịch vụ y tế chuyên nghiệp và tận tâm cho mọi nhà.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-[#004ac6] rounded-full flex items-center justify-center transition-all border border-slate-100">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-[#004ac6] rounded-full flex items-center justify-center transition-all border border-slate-100">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="space-y-4">
          <h4 className="font-display font-extrabold text-slate-800 text-sm uppercase tracking-wider">
            Dịch Vụ Nổi Bật
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#services">Khám Tổng Quát</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#services">Nhi Khoa</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#services">Sản Phụ Khoa</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#services">Xét Nghiệm</a></li>
          </ul>
        </div>

        {/* Links Column */}
        <div className="space-y-4">
          <h4 className="font-display font-extrabold text-slate-800 text-sm uppercase tracking-wider">
            Liên Kết
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#about">Về Chúng Tôi</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#about">Đội Ngũ Bác Sĩ</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#why-choose-us">Ưu điểm nổi bật</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#reviews">Đánh giá khách hàng</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-4">
          <h4 className="font-display font-extrabold text-slate-800 text-sm uppercase tracking-wider">
            Chính Sách & Hỗ Trợ
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#">Chính Sách Bảo Mật</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#">Điều Khoản Sử Dụng</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#">Cổng Bệnh Nhân Portal</a></li>
            <li><a className="text-slate-500 hover:text-[#004ac6] transition-colors" href="#">Tuyển Dụng</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        Bản quyền thuộc về phòng khám {business.name}. Đạt tiêu chuẩn an toàn thông tin y tế toàn cầu.
      </div>
    </footer>
  );
}
