import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { ContactData } from '../../../types/demo';

interface ContactCTASectionProps {
  data: ContactData;
}

export default function ContactCTASection({ data }: ContactCTASectionProps) {
  const primaryLabel = data.primaryAction?.label?.trim() || 'Liên hệ ngay';

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#f0edee] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Contact details card */}
        <div className="md:col-span-6 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-[#c5c6cc]/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-[#fd761a] font-bold tracking-widest uppercase">
                THÔNG TIN LIÊN HỆ
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#0a1422] tracking-tight mt-2">
                {data.title}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#fd761a]/5 rounded-xl text-[#fd761a] mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-extrabold text-sm text-[#0a1422] uppercase tracking-wider">
                    Địa chỉ
                  </p>
                  <p className="text-[#44474c] text-sm md:text-base mt-1 leading-relaxed">
                    {data.address}
                  </p>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#fd761a]/5 rounded-xl text-[#fd761a] mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-extrabold text-sm text-[#0a1422] uppercase tracking-wider">
                    Hotline Tư Vấn
                  </p>
                  <p className="text-[#44474c] text-sm md:text-base mt-1 font-semibold">
                    <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="hover:text-[#fd761a] transition-colors">
                      {data.phone}
                    </a>
                    {data.phoneAlt && (
                      <>
                        <span className="text-gray-300 mx-2">|</span>
                        <a href={`tel:${data.phoneAlt.replace(/\s+/g, '')}`} className="hover:text-[#fd761a] transition-colors">
                          {data.phoneAlt}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#fd761a]/5 rounded-xl text-[#fd761a] mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-extrabold text-sm text-[#0a1422] uppercase tracking-wider">
                    Giờ làm việc
                  </p>
                  <div className="text-[#44474c] text-sm md:text-base mt-1 space-y-0.5 leading-relaxed font-normal">
                    {data.hours.map((hour, idx) => (
                      <p key={idx}>{hour}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <a 
              href={data.primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a1422] hover:bg-[#111c2d] w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0a1422]/10 hover:scale-[1.01] active:scale-95"
              style={{ color: '#ffffff' }}
            >
              <Navigation className="w-5 h-5 text-white" />
              <span className="text-white">{primaryLabel}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean gray-scale map image with high contrast */}
        <div className="md:col-span-6 min-h-[320px] rounded-2xl overflow-hidden border border-[#c5c6cc]/20 shadow-md relative group">
          <img 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
            src={data.mapImage.src}
            alt={data.mapImage.alt}
            referrerPolicy="no-referrer"
          />
          {/* Subtle colored pin point layout effect */}
          <div className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-5 h-5 bg-[#fd761a] rounded-full border-4 border-white shadow-xl animate-bounce" />
            <div className="bg-[#0a1422] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">
              AutoGarage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
