import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, Clock, Mail, Share2, Globe, CheckCircle } from "lucide-react";
import { ContactData } from "../../../types/demo";

interface ContactProps {
  contact: ContactData;
}

export default function ContactCTASection({ contact }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "18:00",
    guests: "2",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Vui lòng điền đầy đủ thông tin để hoàn tất đặt bàn.");
      return;
    }

    // Generate a random luxury booking code
    const randomCode = "ECH-" + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(randomCode);
    setIsSubmitted(true);
  };

  return (
    <section 
      className="py-24 bg-white border-t border-[#dec0bd]/30" 
      id="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Left Column: Contact info & Interactive Form */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1c19] mb-10">
                {contact.title}
              </h2>

              <div className="space-y-8">
                {contact.phone && (
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-[#5f030a]/20 flex items-center justify-center text-[#5f030a] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-[#574240] font-semibold mb-1">
                        Điện thoại đặt bàn
                      </h4>
                      <p className="text-lg md:text-xl font-serif text-[#1c1c19]">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-[#5f030a]/20 flex items-center justify-center text-[#5f030a] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-[#574240] font-semibold mb-1">
                        Địa chỉ nhà hàng
                      </h4>
                      <p className="text-lg md:text-xl font-serif text-[#1c1c19]">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}

                {contact.workingHours && (
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-[#5f030a]/20 flex items-center justify-center text-[#5f030a] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-[#574240] font-semibold mb-1">
                        Giờ mở cửa
                      </h4>
                      <p className="text-sm md:text-base text-[#1c1c19] font-medium">
                        {contact.workingHours}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="mt-12 flex gap-4">
                {contact.socialLinks?.website && (
                  <a 
                    href={contact.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-[#dec0bd] flex items-center justify-center text-[#574240] hover:bg-[#5f030a] hover:text-white hover:border-[#5f030a] transition-all"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {contact.socialLinks?.email && (
                  <a 
                    href={`mailto:${contact.socialLinks.email}`}
                    className="w-10 h-10 border border-[#dec0bd] flex items-center justify-center text-[#574240] hover:bg-[#5f030a] hover:text-white hover:border-[#5f030a] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {contact.socialLinks?.MessageCircle && (
                  <a 
                    href={contact.socialLinks.MessageCircle}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 border border-[#dec0bd] flex items-center justify-center text-[#574240] hover:bg-[#5f030a] hover:text-white hover:border-[#5f030a] transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Booking Card inside Section */}
            <div className="mt-12 p-6 bg-[#f6f3ee] border border-[#dec0bd]/30" id="dat-ban">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-xl font-bold text-[#1c1c19] mb-4">
                      Đặt bàn trực tuyến
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] tracking-wider uppercase text-[#574240] font-bold mb-1">
                          Tên của bạn
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Họ và tên..."
                          className="w-full bg-white border border-[#dec0bd]/50 px-3 py-2 text-sm focus:outline-none focus:border-[#7c580f]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-wider uppercase text-[#574240] font-bold mb-1">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="09xx..."
                          className="w-full bg-white border border-[#dec0bd]/50 px-3 py-2 text-sm focus:outline-none focus:border-[#7c580f]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1.5">
                        <label className="block text-[10px] tracking-wider uppercase text-[#574240] font-bold mb-1">
                          Ngày dùng bữa
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white border border-[#dec0bd]/50 px-3 py-2 text-sm focus:outline-none focus:border-[#7c580f]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-wider uppercase text-[#574240] font-bold mb-1">
                          Giờ
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full bg-white border border-[#dec0bd]/50 px-3 py-2 text-sm focus:outline-none focus:border-[#7c580f]"
                        >
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                          <option value="19:30">19:30</option>
                          <option value="20:00">20:00</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-wider uppercase text-[#574240] font-bold mb-1">
                          Số khách
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-white border border-[#dec0bd]/50 px-3 py-2 text-sm focus:outline-none focus:border-[#7c580f]"
                        >
                          <option value="1">1 khách</option>
                          <option value="2">2 khách</option>
                          <option value="4">4 khách</option>
                          <option value="6">6 khách</option>
                          <option value="8">8 khách</option>
                          <option value="10">10+ khách</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#5f030a] hover:bg-[#7f1d1d] text-white py-3 text-xs font-semibold tracking-widest uppercase transition-colors"
                    >
                      Xác nhận yêu cầu đặt bàn
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-[#7c580f] mx-auto" />
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1c1c19]">
                        Yêu cầu của bạn đã được tiếp nhận!
                      </h3>
                      <p className="text-xs text-[#574240] mt-1">
                        Nhà hàng sẽ liên hệ lại với bạn qua số điện thoại để xác nhận.
                      </p>
                    </div>
                    <div className="bg-white border border-[#dec0bd]/30 p-4 inline-block">
                      <span className="block text-[10px] tracking-widest uppercase text-[#574240]">
                        Mã giữ bàn của bạn
                      </span>
                      <span className="font-mono font-bold text-[#5f030a] text-lg">
                        {bookingCode}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="block text-xs text-[#5f030a] underline mx-auto hover:text-[#7c580f]"
                    >
                      Thực hiện đặt bàn mới
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: High Contrast Map Graphic */}
          <div className="h-[450px] lg:h-auto min-h-[500px] bg-[#f0ede9] relative overflow-hidden border border-[#dec0bd]/30 shadow-md">
            <div 
              className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ backgroundImage: `url(${contact.mapImage})` }}
            ></div>
            <div className="absolute inset-0 bg-[#5f030a]/5 pointer-events-none"></div>
            
            {/* Overlay map badge */}
            <div className="absolute bottom-6 right-6 bg-white shadow-xl px-6 py-4 border border-[#dec0bd]/30 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#5f030a]" />
              <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#1c1c19]">
                {contact.mapLocation || "L'ÉCHELLE Gastronomy"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
