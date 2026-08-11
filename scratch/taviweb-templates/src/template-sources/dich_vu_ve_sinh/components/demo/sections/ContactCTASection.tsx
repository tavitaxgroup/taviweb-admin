import { Phone, CheckCircle, Share2 } from "lucide-react";
import { ContactData } from "../../../types/demo";

interface ContactCTASectionProps {
  contact: ContactData;
}

export function ContactCTASection({ contact }: ContactCTASectionProps) {
  const formattedPhoneHref = contact.phoneValue ? `tel:${contact.phoneValue.replace(/\s+/g, "")}` : "#";

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#16a34a] text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          {contact.title}
        </h2>
        
        <p className="font-sans text-base md:text-lg text-[#f7fff2] opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
          {contact.subtitle}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Hotline Card */}
          {contact.phoneValue && (
            <a
              href={formattedPhoneHref}
              id="contact-phone-cta"
              className="group flex items-center gap-5 bg-white text-[#16a34a] px-8 py-6 rounded-lg shadow-lg hover:bg-slate-50 transition-all duration-150 active:scale-95"
            >
              <div className="w-14 h-14 bg-[#16a34a]/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Phone className="w-7 h-7 text-[#16a34a]" />
              </div>
              <div className="text-left">
                <p className="font-label text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {contact.phoneLabel || "Hotline 24/7"}
                </p>
                <p className="font-display text-2xl font-black text-[#16a34a] tracking-tight">
                  {contact.phoneValue}
                </p>
              </div>
            </a>
          )}

          {contact.secondaryAction && (
            <a
              href={contact.secondaryAction.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 bg-white text-[#16a34a] px-8 py-6 rounded-lg shadow-lg hover:bg-slate-50 transition-all duration-150 active:scale-95"
            >
              <div className="w-14 h-14 bg-[#16a34a]/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Share2 className="w-7 h-7 text-[#16a34a]" />
              </div>
              <div className="text-left">
                <p className="font-label text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Facebook
                </p>
                <p className="font-display text-xl font-black text-[#16a34a] tracking-tight">
                  {contact.secondaryAction.label}
                </p>
              </div>
            </a>
          )}

          {/* Benefits Bullet points */}
          <div className="flex flex-col items-center md:items-start gap-4">
            {contact.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#7ffc97] fill-current" />
                <span className="font-label text-base font-bold text-white tracking-wide">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Blur and Shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#91f1ff] rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
    </section>
  );
}
