import React, { useState } from 'react';
import { Phone, CheckCircle, X, Calendar, MessageSquare, MapPin, Mail } from 'lucide-react';
import { DemoPageData } from '../../../types/demo';

interface ContactCTASectionProps {
  data: DemoPageData;
}

export default function ContactCTASection({ data }: ContactCTASectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const secondaryActionLabel =
    data.contact.secondaryAction?.label?.replace(/MessageCircle/g, 'Facebook') || 'LIÊN HỆ FACEBOOK';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setFormData({ name: '', phone: '', date: '', notes: '' });
      alert('Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công. Chúng tôi sẽ liên hệ trong vòng 30 phút.');
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#fef0f4]" id="contact-cta">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        
        {/* Decorative divider leaf/icon */}
        <div className="flex justify-center text-[#e1c292]">
          <span className="text-2xl">&#10047;</span>
        </div>

        {/* Title */}
        <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-[#834767] tracking-normal leading-tight">
          {data.contact.title}
        </h2>

        {/* Description */}
        <p className="font-sans text-base md:text-lg text-[#6c5962] max-w-2xl mx-auto leading-relaxed font-light">
          {data.contact.description}
        </p>

        {/* CTA Buttons row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          
          {/* Primary CTA (Open simple popup or scroll) */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex min-h-14 items-center justify-center bg-[#834767] hover:bg-[#6f3a58] !text-white font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm shadow-lg shadow-[#834767]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            id="cta-primary-btn"
          >
            {data.contact.primaryAction.label}
          </button>

          {/* Secondary CTA */}
          {data.contact.secondaryAction && (
            <a
              href={data.contact.secondaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex min-h-14 items-center justify-center border border-[#834767] bg-white !text-[#834767] hover:bg-[#834767] hover:!text-white font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              id="cta-secondary-btn"
            >
              {secondaryActionLabel}
            </a>
          )}

          {/* Phone Link CTA */}
          {data.business.phone && (
            <a
              href={`tel:${data.business.phone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex min-h-14 items-center justify-center gap-2 bg-[#201a1c] !text-white hover:bg-[#834767] font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm shadow-lg shadow-[#201a1c]/15 transition-all duration-300 hover:-translate-y-0.5 [&_span]:!text-white [&_svg]:!text-white"
              id="cta-phone-btn"
            >
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white">Gọi studio</span>
            </a>
          )}

        </div>

      </div>

      {/* Elegant Booking Consultation Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#201a1c]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f8] w-full max-w-lg p-8 sm:p-10 rounded-sm border border-[#e1c292]/30 shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#6c5962] hover:text-[#834767] p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="flex justify-center text-[#834767]">
                  <CheckCircle className="w-16 h-16 animate-bounce" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#201a1c]">
                  Gửi Thành Công!
                </h3>
                <p className="font-sans text-[#6c5962] text-sm">
                  Cảm ơn bạn đã lựa chọn {data.business.name}. Chuyên viên tư vấn sẽ liên hệ lại với bạn ngay lập tức.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-2 mb-4">
                  <h3 className="font-serif text-2xl font-semibold text-[#201a1c]">
                    Đặt Lịch Tư Vấn
                  </h3>
                  <p className="font-sans text-[#6c5962] text-xs uppercase tracking-widest">
                    Chuyên viên sẽ liên hệ thiết kế concept riêng
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#6c5962] mb-1">
                      Tên của bạn *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white border border-[#e1c292]/40 rounded-sm px-4 py-3 text-[#201a1c] font-sans text-sm focus:outline-none focus:border-[#834767] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#6c5962] mb-1">
                      Số điện thoại *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-white border border-[#e1c292]/40 rounded-sm px-4 py-3 text-[#201a1c] font-sans text-sm focus:outline-none focus:border-[#834767] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#6c5962] mb-1">
                      Ngày dự kiến chụp (không bắt buộc)
                    </label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-[#e1c292]/40 rounded-sm px-4 py-3 text-[#201a1c] font-sans text-sm focus:outline-none focus:border-[#834767] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-widest text-[#6c5962] mb-1">
                      Yêu cầu đặc biệt
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Concept mong muốn, địa điểm..."
                      className="w-full bg-white border border-[#e1c292]/40 rounded-sm px-4 py-3 text-[#201a1c] font-sans text-sm focus:outline-none focus:border-[#834767] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#834767] hover:bg-[#834767]/90 text-white font-sans text-xs uppercase tracking-widest font-semibold py-4 rounded-sm shadow-md transition-all"
                >
                  Xác nhận đăng ký
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
