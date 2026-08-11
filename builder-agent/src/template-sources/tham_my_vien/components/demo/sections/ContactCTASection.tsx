import React from "react";
import { MessageSquare, PhoneCall } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ContactCTASectionProps {
  data: DemoPageData;
}

export default function ContactCTASection({ data }: ContactCTASectionProps) {
  const { contact } = data;
  const primaryLabel =
    contact.primaryAction?.label?.trim() || "Nhắn chuyên viên qua MessageCircle";

  return (
    <section id="contact-section" className="py-24 px-6 md:px-12 bg-brand-bg-container overflow-hidden">
      <div className="max-w-7xl mx-auto bg-brand-primary rounded-[40px] p-12 md:p-20 relative shadow-2xl overflow-hidden">
        {/* Decorative background gradients for atmosphere */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent-light/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-8 tracking-tight">
            {contact.title}
          </h2>
          <p className="font-sans text-base md:text-lg mb-12 text-white/80 leading-relaxed max-w-xl mx-auto">
            {contact.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {contact.primaryAction?.href && (
              <a
                href={contact.primaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent-light hover:bg-brand-accent-light/90 px-10 py-5 rounded-full font-sans font-semibold text-sm tracking-wider uppercase shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-3"
                style={{ color: "#60233f" }}
              >
                <MessageSquare size={18} className="stroke-[2] text-[#60233f]" />
                <span className="text-[#60233f]">{primaryLabel}</span>
              </a>
            )}
            {contact.phoneAction?.href && (
              <a
                href={contact.phoneAction.href}
                className="text-white hover:text-brand-accent-light font-serif text-xl md:text-2xl font-medium tracking-wide flex items-center gap-3 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <PhoneCall size={18} className="text-brand-accent-light stroke-[2]" />
                </div>
                {contact.phoneAction.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
