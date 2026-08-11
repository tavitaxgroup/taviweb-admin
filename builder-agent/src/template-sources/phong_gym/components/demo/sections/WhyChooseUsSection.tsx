import React from "react";
import { Clock, UserCheck, Zap } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface WhyChooseUsSectionProps {
  data: DemoPageData;
}

export default function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  return (
    <section className="py-20 bg-[#45464c] text-white overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: List of Highlights */}
        <div id="wcu-left">
          <h2 className="font-anton text-4xl md:text-5xl uppercase mb-10 text-white" id="wcu-title">
            TẠI SAO CHỌN CHÚNG TÔI?
          </h2>

          <div className="space-y-8" id="wcu-list">
            {/* Highlight 1 */}
            <div className="flex gap-6 items-start" id="wcu-item-1">
              <div className="w-12 h-12 bg-[#A3E635] flex items-center justify-center shrink-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Clock className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg uppercase text-[#A3E635] mb-1">
                  Truy cập 24/7
                </h4>
                <p className="font-archivo text-[#e1e2e4] text-sm md:text-base">
                  Tập luyện bất cứ khi nào bạn muốn, không giới hạn khung giờ.
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="flex gap-6 items-start" id="wcu-item-2">
              <div className="w-12 h-12 bg-[#A3E635] flex items-center justify-center shrink-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <UserCheck className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg uppercase text-[#A3E635] mb-1">
                  HLV Chuyên nghiệp
                </h4>
                <p className="font-archivo text-[#e1e2e4] text-sm md:text-base">
                  Đội ngũ chuyên gia có bằng cấp quốc tế luôn sẵn sàng hỗ trợ bạn.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="flex gap-6 items-start" id="wcu-item-3">
              <div className="w-12 h-12 bg-[#A3E635] flex items-center justify-center shrink-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg uppercase text-[#A3E635] mb-1">
                  Thiết bị tối tân
                </h4>
                <p className="font-archivo text-[#e1e2e4] text-sm md:text-base">
                  Sử dụng các dòng máy tập nhập khẩu hiện đại, chuẩn quốc tế.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Slanted Image Frame */}
        <div className="relative h-[380px] md:h-[450px] w-full mt-8 lg:mt-0" id="wcu-right-slanted">
          {/* Slanted Green Backdrop */}
          <div className="absolute inset-0 bg-[#A3E635] rotate-3 shadow-[4px_4px_12px_rgba(0,0,0,0.3)]" />
          
          {/* Counter-Rotated Image Frame */}
          <div className="absolute inset-0 bg-cover bg-center border-2 border-black -rotate-2 overflow-hidden bg-zinc-800">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClA_L8qVSIvaANqIWimsaXWfXFszJ7NPAG54rSGIYdNQuTcesYYdPEjsOTCdS0wWo0Dt8hzBQndBHaUH1xGMmgHF3EoUhIMpIWvZHH5oN--SZjjzyjKggtUrPNGgQDNySOMnr_KgMUeXcICRCWecDzerEWwYeGg8NLdGIGmZ1Bg3YTi5SDeNyNL2GDQaqOtJxWlUWKhK3hdWpYNllGqyvX5-bQadmmdGQ32csOMkECu2TLSqHHl7_T"
              alt="Elite powerlifting training"
              className="w-full h-full object-cover object-center scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
              id="wcu-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
