import React from "react";
import { MessageCircle, Camera, Globe, Mail, Phone, MapPin } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface DemoFooterProps {
  data: DemoPageData;
}

export default function DemoFooter({ data }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-bg-container border-t border-brand-outline/25">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="space-y-6">
          <div className="font-serif text-2xl font-bold tracking-widest text-brand-primary uppercase">
            {data.business.name}
          </div>
          <p className="font-sans text-sm text-brand-secondary/90 leading-relaxed">
            Nâng tầm nhan sắc Việt bằng công nghệ hiện đại và sự tận tâm từ tâm hồn.
          </p>
          <div className="flex gap-4">
            {data.business.MessageCircle && (
              <a
                href={data.business.MessageCircle}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-outline/40 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                aria-label="MessageCircle Link"
              >
                <MessageCircle size={16} />
              </a>
            )}
            {data.business.Camera && (
              <a
                href={data.business.Camera}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-outline/40 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                aria-label="Camera Link"
              >
                <Camera size={16} />
              </a>
            )}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-brand-outline/40 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
              aria-label="Website Link"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>

        {/* Services column */}
        <div className="space-y-6">
          <p className="font-sans font-semibold text-xs text-brand-primary tracking-widest uppercase">
            Dịch vụ
          </p>
          <ul className="space-y-3 font-sans text-sm text-brand-secondary/90">
            {data.services && data.services.slice(0, 4).map((service) => (
              <li key={service.id}>
                <a href="#services-section" className="hover:text-brand-primary transition-colors duration-200">
                  {service.title}
                </a>
              </li>
            ))}
            {(!data.services || data.services.length === 0) && (
              <>
                <li>Chăm sóc da</li>
                <li>Trẻ hóa da</li>
                <li>Phẫu thuật thẩm mỹ</li>
                <li>Giảm béo chuyên sâu</li>
              </>
            )}
          </ul>
        </div>

        {/* Links column */}
        <div className="space-y-6">
          <p className="font-sans font-semibold text-xs text-brand-primary tracking-widest uppercase">
            Liên kết
          </p>
          <ul className="space-y-3 font-sans text-sm text-brand-secondary/90">
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors duration-200">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors duration-200">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#contact-section" className="hover:text-brand-primary transition-colors duration-200">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-primary transition-colors duration-200">
                Tuyển dụng
              </a>
            </li>
          </ul>
        </div>

        {/* Address & contact column */}
        <div className="space-y-6">
          <p className="font-sans font-semibold text-xs text-brand-primary tracking-widest uppercase">
            Địa chỉ
          </p>
          <div className="space-y-4 font-sans text-sm text-brand-secondary/90 leading-relaxed">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-primary flex-shrink-0 mt-0.5" />
              <span>{data.business.address}</span>
            </div>
            {data.business.phone && (
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brand-primary flex-shrink-0" />
                <a href={`tel:${data.business.phone.replace(/\s+/g, "")}`} className="hover:text-brand-primary transition-colors">
                  {data.business.phone}
                </a>
              </div>
            )}
            {data.business.email && (
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-brand-primary flex-shrink-0" />
                <a href={`mailto:${data.business.email}`} className="hover:text-brand-primary transition-colors">
                  {data.business.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright area */}
      <div className="border-t border-brand-outline/20 py-8 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-brand-secondary/70">
        <p>© {currentYear} {data.business.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-primary transition-colors duration-200">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-brand-primary transition-colors duration-200">
            Điều khoản sử dụng
          </a>
          <a href="#contact-section" className="hover:text-brand-primary transition-colors duration-200">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
}
