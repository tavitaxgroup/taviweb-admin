import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface DemoFooterProps {
  data: DemoPageData;
}

export default function DemoFooter({ data }: DemoFooterProps) {
  return (
    <footer className="bg-[#fff8f8] border-t border-[#e1c292]/20 pt-20 pb-8 text-[#6c5962]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Left column brand info (Spans 4) */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#834767] tracking-tight">
            {data.business.name}
          </h3>
          <p className="font-sans text-sm leading-relaxed font-light max-w-sm">
            Nơi tình yêu được tôn vinh qua những góc nhìn nghệ thuật và sự tinh tế trong từng chi tiết.
          </p>
        </div>

        {/* Column 2: Studio Links (Spans 2) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#834767]">
            STUDIO
          </h4>
          <ul className="space-y-2 text-sm font-sans font-light">
            <li><a href="#about" className="hover:text-[#834767] transition-colors">Về chúng tôi</a></li>
            <li><a href="#gallery" className="hover:text-[#834767] transition-colors">Bộ sưu tập</a></li>
            <li><a href="#services" className="hover:text-[#834767] transition-colors">Báo giá dịch vụ</a></li>
          </ul>
        </div>

        {/* Column 3: Support Links (Spans 2) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#834767]">
            SUPPORT
          </h4>
          <ul className="space-y-2 text-sm font-sans font-light">
            <li><a href="#" className="hover:text-[#834767] transition-colors">Quy trình làm việc</a></li>
            <li><a href="#" className="hover:text-[#834767] transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-[#834767] transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info (Spans 4) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#834767]">
            CONTACT
          </h4>
          <ul className="space-y-3 text-sm font-sans font-light">
            {data.business.address && (
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#834767] shrink-0 mt-0.5" />
                <span>{data.business.address}</span>
              </li>
            )}
            {data.business.phone && (
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#834767] shrink-0" />
                <a href={`tel:${data.business.phone.replace(/\s+/g, '')}`} className="hover:text-[#834767] transition-colors">
                  {data.business.phone}
                </a>
              </li>
            )}
            {data.business.email && (
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#834767] shrink-0" />
                <a href={`mailto:${data.business.email}`} className="hover:text-[#834767] transition-colors">
                  {data.business.email}
                </a>
              </li>
            )}
          </ul>
        </div>

      </div>

      {/* Bottom copy row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#e1c292]/10 text-center text-xs font-sans tracking-wide text-[#6c5962]/60">
        <p>© 2026 {data.business.name}. Timeless Elegance Captured.</p>
      </div>
    </footer>
  );
}
