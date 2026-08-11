import React from 'react';
import { MapPin, Clock, Mail, Navigation, MessageCircle } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface SectionProps {
  data: DemoPageData;
}

export default function ContactCTASection({ data }: SectionProps) {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      
      {/* Map Background with Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#553722]/85 mix-blend-multiply z-10"></div>
        <img
          className="w-full h-full object-cover grayscale opacity-30 select-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-eT4qUnfj7BwalFlGb2HFB8xSUUhwpavItugxD68PLDP0AwUakVPm-2amlBUY8JEGVFVO05wf-iCEKtSrY6NrgTklptGYOTnQUBvOQLY6PzylzvKd810Lsuljk2IocuJmmtor0xkO6Ip1LUBBYAsfBi-vY_RBdbgImI-NMyhl1CTUiXGDqL6CxKx-qpTYSWR-C079ptrRrFgS9YwejGEsN24Rsj-rLzl4hTJGs2B1uq_0gDJ8Hg_4"
          alt="Bản đồ chỉ dẫn"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* White Card on Left */}
          <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-md rounded-[3rem] p-8 md:p-14 shadow-2xl">
            <h2 className="font-sans text-3xl font-extrabold text-[#553722] mb-8">
              {data.contact.title}
            </h2>
            
            <div className="space-y-6 sm:space-y-8 mb-10 md:mb-12">
              
              {/* Address */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 bg-[#efe0cd] rounded-xl flex items-center justify-center shrink-0 text-[#553722]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e1b19] mb-1">{data.contact.addressLabel}</h4>
                  <p className="text-sm sm:text-base text-[#50453e] font-medium leading-relaxed">{data.contact.addressValue}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 bg-[#efe0cd] rounded-xl flex items-center justify-center shrink-0 text-[#553722]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e1b19] mb-1">{data.contact.hoursLabel}</h4>
                  <p className="text-sm sm:text-base text-[#50453e] font-medium leading-relaxed">{data.contact.hoursValue}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 bg-[#efe0cd] rounded-xl flex items-center justify-center shrink-0 text-[#553722]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e1b19] mb-1">{data.contact.emailLabel}</h4>
                  <p className="text-sm sm:text-base text-[#50453e] font-medium leading-relaxed">{data.contact.emailValue}</p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.contact.primaryAction.href}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#553722] hover:bg-[#5f402a] text-white px-6 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#553722]/20 hover:shadow-xl transition-all cursor-pointer"
              >
                <Navigation className="w-5 h-5" />
                <span>{data.contact.primaryAction.label}</span>
              </a>
              <a
                href={data.contact.secondaryAction.href}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#1877F2] hover:bg-[#166fe5] text-white px-6 py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{data.contact.secondaryAction.label}</span>
              </a>
            </div>
          </div>

          {/* Right Slogan Text */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="text-white space-y-6 pl-8">
              <h3 className="text-4xl sm:text-5xl font-extrabold font-sans leading-tight">
                Hãy để chúng tôi<br />mời bạn một tách cafe
              </h3>
              <p className="text-lg sm:text-xl text-white/80 max-w-md leading-relaxed font-medium">
                Một ngày của bạn sẽ tuyệt vời hơn bắt đầu từ {data.business.name}.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
