import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Map, CheckCircle2 } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function ContactCTASection({ data }: SectionProps) {
  const { contact } = data;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("Doanh nghiệp");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) return;
    setIsSubmitted(true);
    // Reset form fields
    setFullName("");
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact details & Map fallback */}
          <div>
            <h2 className="font-headline-md font-bold text-blue-950 text-3xl sm:text-4xl mb-6">
              {contact.title}
            </h2>
            <p className="font-sans text-gray-600 text-base leading-relaxed mb-10">
              {contact.description}
            </p>

            <div className="space-y-6">
              {/* Phone item (only shown if phone exists) */}
              {contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950 shrink-0 border border-blue-100 shadow-sm">
                    <Phone className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="font-sans font-semibold text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">
                      Điện thoại
                    </span>
                    <p className="font-sans font-bold text-base sm:text-lg text-blue-950">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* Email item */}
              {contact.email && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950 shrink-0 border border-blue-100 shadow-sm">
                    <Mail className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="font-sans font-semibold text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">
                      Email
                    </span>
                    <p className="font-sans font-bold text-base sm:text-lg text-blue-950 break-all">
                      {contact.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Address item */}
              {contact.address && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-950 shrink-0 border border-blue-100 shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="font-sans font-semibold text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase">
                      Địa chỉ
                    </span>
                    <p className="font-sans font-bold text-base sm:text-lg text-blue-950">
                      {contact.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 rounded-xl overflow-hidden h-64 shadow-md border border-gray-200 relative group flex items-center justify-center bg-gray-200">
              <div className="absolute inset-0 bg-gray-300 opacity-20 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              <div className="text-center z-10 p-6 flex flex-col items-center">
                <div className="bg-white/80 p-3 rounded-full shadow-sm mb-3">
                  <Map className="w-8 h-8 text-blue-900 animate-pulse" />
                </div>
                <h4 className="font-sans font-bold text-blue-950 text-base mb-1">
                  Bản Đồ Chỉ Đường
                </h4>
                <p className="font-sans text-xs text-gray-500 max-w-sm">
                  {contact.address || "Hồ Chí Minh, Việt Nam"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-700"></div>

            {isSubmitted ? (
              <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="mx-auto bg-green-50 text-green-600 p-4 rounded-full w-fit mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-sans font-bold text-2xl text-blue-950 mb-3">
                  Gửi Yêu Cầu Thành Công!
                </h3>
                <p className="font-sans text-gray-600 text-base max-w-md mx-auto mb-8">
                  Cảm ơn bạn đã tin tưởng Juris & Integrity. Chúng tôi đã nhận được yêu cầu và sẽ phản hồi lại bạn trong vòng 2 giờ làm việc.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-950 hover:bg-blue-900 text-white font-sans font-semibold text-sm px-6 py-3 rounded-lg transition-all"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider text-gray-500 uppercase mb-2">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-stone-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider text-gray-500 uppercase mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                    placeholder="090 123 4567"
                  />
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider text-gray-500 uppercase mb-2">
                    Lĩnh vực cần tư vấn
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-stone-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                  >
                    <option>Doanh nghiệp</option>
                    <option>Hợp đồng</option>
                    <option>Dân sự</option>
                    <option>Lao động</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs tracking-wider text-gray-500 uppercase mb-2">
                    Nội dung yêu cầu
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-stone-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all outline-none"
                    placeholder="Vui lòng mô tả ngắn gọn vấn đề của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white py-4 rounded-lg font-sans font-bold text-sm shadow-md hover:shadow-lg transition-all uppercase tracking-widest active:scale-[0.98]"
                >
                  {contact.primaryAction.label}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
