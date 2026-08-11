import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, CheckCircle, Calendar, X } from 'lucide-react';
import { ContactData, BusinessData } from '../../../types/demo';

interface ContactCTASectionProps {
  contact: ContactData;
  business: BusinessData;
}

export default function ContactCTASection({ contact, business }: ContactCTASectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', dept: 'Khám Tổng Quát' });

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setShowModal(false);
      setBooked(false);
      setFormData({ name: '', phone: '', date: '', dept: 'Khám Tổng Quát' });
    }, 2500);
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden border border-slate-100 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Column: Info & Action */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-[#004ac6] rounded-full text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  ĐĂNG KÝ HẸN KHÁM
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  {contact.title}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                {contact.phone && (
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-[#004ac6] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Hotline Tư Vấn</div>
                      <a href={`tel:${contact.phone}`} className="text-xl md:text-2xl font-extrabold text-[#004ac6] hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {contact.address && (
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-teal-500/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Địa Chỉ</div>
                      <div className="text-slate-800 font-extrabold text-base leading-relaxed">
                        {contact.address}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {contact.workingHours && (
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Giờ Làm Việc</div>
                      <div className="text-slate-700 font-extrabold text-base">
                        {contact.workingHours}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-[#004ac6] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  Đặt Lịch Khám Ngay
                </button>
              </div>
            </div>

            {/* Right Column: Google Maps container */}
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] border-4 border-white relative group">
              <iframe 
                src={contact.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.485292437343!2d106.69904321533413!3d10.774100662181604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x178de34ca0190bd3!2zMTIzIMSQxrDhu51uZyBT4bupYyBLaOG7j2UsIFF14bqtbiAxLCBUUC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2svn!4v1689123456789!5m2!1svi!2svn"}
                className="w-full h-full border-0 absolute inset-0 z-10 opacity-90 group-hover:opacity-100 transition-opacity" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map locator for ${business.name}`}
              ></iframe>
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center -z-10">
                <div className="text-center p-8">
                  <MapPin className="w-14 h-14 text-[#004ac6] mx-auto mb-4 animate-bounce" />
                  <p className="font-bold text-slate-800">Địa điểm của {business.name}</p>
                  <p className="text-xs text-slate-500">Bản đồ đang được tải...</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl z-20 border border-slate-100"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {booked ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-800">Đặt Lịch Thành Công!</h3>
                  <p className="text-sm text-slate-500 font-sans">
                    Cảm ơn bạn. Đội ngũ y tế của <span className="font-bold text-[#004ac6]">{business.name}</span> sẽ liên hệ lại qua số điện thoại của bạn trong ít phút để xác nhận.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-slate-800">Đặt Lịch Tư Vấn</h3>
                    <p className="text-xs text-slate-500 mt-1 font-sans">Hỗ trợ đặt hẹn và tư vấn sức khỏe miễn phí nhanh chóng.</p>
                  </div>

                  <form onSubmit={handleBook} className="space-y-4 font-sans">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Họ và Tên</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nguyễn Văn A" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Số Điện Thoại</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="0912 345 XXX" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Ngày Khám</label>
                        <input 
                          type="date" 
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase">Chuyên Khoa</label>
                        <select 
                          value={formData.dept}
                          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#004ac6] focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
                        >
                          <option>Khám Tổng Quát</option>
                          <option>Khám Chuyên Khoa</option>
                          <option>Xét Nghiệm</option>
                          <option>Tư Vấn Gia Đình</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#004ac6] text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-2 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Xác Nhận Đăng Ký
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
