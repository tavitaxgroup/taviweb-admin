import React from "react";
import { ContactData } from "../../../types/demo";

interface ContactCTASectionProps {
  contact: ContactData;
}

export function ContactCTASection({ contact }: ContactCTASectionProps) {
  return (
    <section id="book" className="py-20 px-5 md:px-16 bg-surface">
      <div className="max-w-5xl mx-auto bg-primary-container rounded-[40px] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl border border-primary/10">
        
        {/* Glow ambient background filters */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-on-primary-container mb-6 leading-tight">
            Sẵn Sàng Cho Một Buổi Chiều Thư Giãn?
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-on-primary-container/90 mb-10 leading-relaxed">
            Đặt chỗ trực tuyến hôm nay để tận hưởng các gói trị liệu chăm sóc chuyên sâu tốt nhất từ chuyên viên của chúng tôi.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={contact.primaryAction.href}
              className="bg-on-primary-container text-primary font-sans text-sm font-semibold px-10 py-4 rounded-full shadow-lg hover:scale-105 active:scale-100 hover:bg-white hover:text-primary transition-all duration-300"
            >
              {contact.primaryAction.label}
            </a>
            
            {contact.secondaryAction && (
              <a
                href={contact.secondaryAction.href}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-primary border border-white font-sans text-sm font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-on-primary-container hover:text-primary hover:scale-105 active:scale-100 transition-all duration-300"
              >
                {contact.secondaryAction.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
