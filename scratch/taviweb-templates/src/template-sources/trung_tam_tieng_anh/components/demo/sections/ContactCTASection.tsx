import React, { useState } from 'react';
import { Phone, Share2, MapPin, CheckCircle } from 'lucide-react';
import { ContactData } from '../../../types/demo';

interface ContactCTASectionProps {
  data: ContactData;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ data }) => {
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const facebookHref = data.facebookUrl?.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !phoneNumber.trim()) {
      setError('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <section id="tu-van" className="py-20 md:py-28 bg-blue-600 text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Info) */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {data.title}
            </h2>
            <p className="text-base md:text-lg text-blue-100/90 leading-relaxed mb-10 max-w-xl">
              {data.description}
            </p>

            <div className="space-y-6">
              {/* Phone item */}
              {data.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 shadow-sm shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">Điện thoại</div>
                    <div className="text-lg md:text-xl font-bold">{data.phone}</div>
                  </div>
                </div>
              )}

              {/* Facebook item */}
              {facebookHref && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 shadow-sm shrink-0">
                    <Share2 size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">Facebook</div>
                    <a
                      href={facebookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold shadow-lg ring-1 ring-white/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#1d4ed8',
                        boxShadow: '0 12px 28px rgba(15, 23, 42, 0.18)'
                      }}
                    >
                      <Share2 size={16} aria-hidden="true" />
                      <span>Liên hệ Facebook</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Location/Address Item */}
              {data.mapLocation && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 shadow-sm shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">Địa chỉ</div>
                    <div className="text-lg font-bold">{data.mapLocation}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Form & Map) */}
          <div className="lg:col-span-6">
            <div className="bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
              
              {/* Map Thumbnail */}
              {data.mapImageUrl && (
                <div className="aspect-video w-full rounded-xl overflow-hidden relative mb-6 border border-slate-100">
                  <img
                    src={data.mapImageUrl}
                    alt={data.mapLocation || 'Bản đồ trung tâm'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {data.mapLocation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-md border border-slate-100/50 flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-700 truncate">{data.mapLocation}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Form States */}
              {isSubmitted ? (
                <div className="text-center py-8 px-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Đăng ký thành công!</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Cảm ơn <strong>{fullname}</strong>. Chuyên viên tư vấn của chúng tôi sẽ liên hệ với bạn qua số điện thoại <strong>{phoneNumber}</strong> sớm nhất trong vòng 24h tới!
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullname('');
                      setPhoneNumber('');
                    }}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors shadow"
                  >
                    Đăng ký cho học viên khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Đăng ký tư vấn lộ trình học</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0901234567"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-rose-500 mt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md text-sm md:text-base cursor-pointer"
                  >
                    {data.primaryAction.label}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
