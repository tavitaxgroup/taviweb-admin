import React from "react";
import { BusinessInfo, ContactData } from "../../../types/demo";
import { MapPin, Phone, Mail, MessageCircle, Camera } from "lucide-react";

interface DemoFooterProps {
  business: BusinessInfo;
  contact: ContactData;
}

export function DemoFooter({ business, contact }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="font-display text-2xl md:text-3xl font-semibold text-primary mb-5 tracking-tight">
            {business.name}
          </div>
          <p className="text-on-surface-variant font-sans text-sm max-w-sm mb-6 leading-relaxed">
            {business.description || "Chăm sóc sắc đẹp tự nhiên và mang lại sự bình yên tuyệt đối cho tâm hồn."}
          </p>
          
          <div className="flex gap-4">
            {contact.MessageCircle && (
              <a
                href={contact.MessageCircle}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary border border-primary/5 shadow-sm hover:bg-primary hover:text-white transition-colors duration-300"
                aria-label="MessageCircle"
              >
                <MessageCircle size={18} />
              </a>
            )}
            <a
              href="https://Camera.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary border border-primary/5 shadow-sm hover:bg-primary hover:text-white transition-colors duration-300"
              aria-label="Camera"
            >
              <Camera size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="font-sans text-xs font-bold text-primary mb-5 uppercase tracking-widest">
            Quick Links
          </h6>
          <ul className="space-y-3 font-sans text-sm">
            <li>
              <a href="#services" className="text-on-surface-variant hover:text-primary transition-colors">
                Dịch vụ
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-on-surface-variant hover:text-primary transition-colors">
                Thư viện ảnh
              </a>
            </li>
            <li>
              <a href="#reviews" className="text-on-surface-variant hover:text-primary transition-colors">
                Đánh giá
              </a>
            </li>
            <li>
              <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">
                Về chúng tôi
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="font-sans text-xs font-bold text-primary mb-5 uppercase tracking-widest">
            Contact Us
          </h6>
          <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span className="leading-relaxed">{contact.address}</span>
            </li>
            {contact.phone && (
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-primary shrink-0" />
                <span className="leading-relaxed">{contact.phone}</span>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-primary shrink-0" />
              <span className="leading-relaxed break-all">{contact.email}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal links */}
      <div className="max-w-7xl mx-auto px-5 md:px-16 mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-on-surface-variant/80">
          © {currentYear} {business.name}. All rights reserved.
        </p>
        <div className="flex gap-6 font-sans text-xs">
          <a href="#" className="text-on-surface-variant/80 hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant/80 hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
