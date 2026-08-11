import React, { useState } from "react";
import { Phone, MapPin, CheckCircle } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ContactCTASectionProps {
  data: DemoPageData;
}

export default function ContactCTASection({ data }: ContactCTASectionProps) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const contactTitle = data.contact.title
    .replace(/NGAY HÃ”M NAY/g, "NGAY HÔM NAY")
    .replace(/ÄÄ‚NG KÃ/g, "ĐĂNG KÝ")
    .replace(/TÆ¯ Váº¤N/g, "TƯ VẤN")
    .replace(/Táº¬P THá»¬/g, "TẬP THỬ")
    .replace(/MIá»„N PHÃ/g, "MIỄN PHÍ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto close success alert after 3 seconds
      setShowFormModal(false);
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 3000);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden text-center" id="register">
      {/* Visual Radial overlay to create professional ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#A3E635] via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="font-archivo text-4xl md:text-6xl !text-white uppercase mb-6 leading-tight font-black tracking-normal" id="contact-cta-title">
          {contactTitle.includes("NGAY HÔM NAY") ? (
            <>
              {contactTitle.replace("NGAY HÔM NAY", "")}
              <span className="!text-[#A3E635] block mt-2">NGAY HÔM NAY</span>
            </>
          ) : (
            contactTitle
          )}
        </h2>

        <p className="font-archivo !text-[#dce2f7] text-base md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" id="contact-cta-subtitle">
          {data.contact.subtitle}
        </p>

        {/* Action controls row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6" id="contact-cta-actions">
          {/* Main lead trigger */}
          <button
            onClick={() => setShowFormModal(true)}
            className="w-full md:w-auto bg-[#A3E635] hover:bg-[#8fd128] !text-black font-archivo font-bold text-xl uppercase px-12 py-4 tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none duration-150 cursor-pointer"
            style={{ borderRadius: "0px" }}
            id="contact-btn-main"
          >
            {data.contact.primaryAction.label}
          </button>

          {/* Phone call trigger if phone available */}
          {data.business.phone && (
            <a
              href={`tel:${data.business.phone.replace(/\s+/g, "")}`}
              className="w-full md:w-auto border-2 border-white bg-black/40 !text-white hover:bg-white hover:!text-black font-archivo font-bold text-xl uppercase px-12 py-4 tracking-wider transition-all flex items-center justify-center gap-3 [&_svg]:!text-current"
              style={{ borderRadius: "0px" }}
              id="contact-btn-phone"
            >
              <Phone className="h-5 w-5 text-current" />
              <span className="text-current">{data.business.phone}</span>
            </a>
          )}

          {/* Map navigation trigger */}
          {data.business.mapUrl && (
            <a
              href={data.business.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto border-2 border-[#A3E635] bg-[#A3E635] !text-black hover:bg-black hover:!text-[#A3E635] font-archivo font-bold text-sm uppercase flex items-center justify-center gap-2 transition-colors px-10 py-4"
              id="contact-btn-map"
            >
              <MapPin className="h-5 w-5 text-current" />
              <span className="text-current">Xem đường đi</span>
            </a>
          )}
        </div>
      </div>

      {/* Leads capturing popup form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" id="register-modal">
          <div
            className="bg-[#111827] border-2 border-[#A3E635] max-w-md w-full p-8 text-left relative"
            style={{ borderRadius: "0px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8" id="register-success-view">
                <CheckCircle className="h-16 w-16 text-[#A3E635] mx-auto mb-4" />
                <h3 className="font-archivo text-2xl text-white uppercase mb-2 font-black">Đăng Ký Thành Công!</h3>
                <p className="font-archivo text-zinc-400 text-sm">
                  Cảm ơn bạn. Chuyên viên tư vấn sẽ liên hệ lại qua số điện thoại sớm nhất!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="register-form">
                <h3 className="font-archivo text-2xl text-white uppercase border-b border-zinc-800 pb-3 font-black">
                  Đăng ký tư vấn miễn phí
                </h3>
                <p className="font-archivo text-zinc-400 text-sm leading-relaxed">
                  Để lại thông tin để nhận buổi tư vấn chỉ số InBody và trải nghiệm tập luyện miễn phí.
                </p>

                <div>
                  <label className="block text-xs font-bold font-archivo text-[#A3E635] uppercase mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-[#A3E635] text-sm"
                    style={{ borderRadius: "0px" }}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-archivo text-[#A3E635] uppercase mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 focus:outline-none focus:border-[#A3E635] text-sm"
                    style={{ borderRadius: "0px" }}
                    placeholder="0912 345 678"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#A3E635] hover:bg-[#8fd128] text-black font-archivo font-bold uppercase py-4 transition-all"
                  style={{ borderRadius: "0px" }}
                >
                  Gửi đăng ký
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
