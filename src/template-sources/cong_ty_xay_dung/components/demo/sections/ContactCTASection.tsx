import React from "react";
import { Send, Phone } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ContactCTASectionProps {
  contact: DemoPageData["contact"];
}

export function ContactCTASection({ contact }: ContactCTASectionProps) {
  return (
    <section 
      className="bg-amber-500 px-4 py-20 relative overflow-hidden" 
      id="contact"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side Message */}
        <div className="text-center lg:text-left max-w-3xl">
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">
            {contact.title}
          </h2>
          <p className="font-sans text-base md:text-lg text-slate-900 font-medium">
            {contact.description}
          </p>
        </div>

        {/* Right Side Call Action Button */}
        <a 
          href={contact.primaryAction.href}
          className="inline-flex items-center justify-center bg-slate-950 !text-white hover:bg-slate-900 font-extrabold px-10 py-5 text-lg rounded shadow-xl transition-all duration-200 uppercase tracking-wider shrink-0 [&_span]:!text-white [&_svg]:!text-white"
        >
          {contact.primaryAction.href.startsWith("tel:") ? (
            <Phone className="w-5 h-5 mr-2.5" />
          ) : (
            <Send className="w-5 h-5 mr-2.5" />
          )}
          <span className="!text-white">{contact.primaryAction.label}</span>
        </a>
      </div>

      {/* Decorative Grid mimicking technical blueprint drafting lines */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", 
          backgroundSize: "40px 40px" 
        }} 
      />
    </section>
  );
}
