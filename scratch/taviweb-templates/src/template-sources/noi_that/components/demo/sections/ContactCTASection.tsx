import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2, Share2 } from 'lucide-react';
import { ContactData, BusinessInfo } from '../../../types/demo';

interface ContactCTASectionProps {
  data: ContactData;
  business: BusinessInfo;
}

export default function ContactCTASection({ data, business }: ContactCTASectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Chung cư / Căn hộ');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isFacebookAction = /facebook|fb\.com/i.test(`${data.secondaryAction?.label ?? ''} ${data.secondaryAction?.href ?? ''}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    // Simulate API lead submission
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setIsSubmitted(false);
      setShowForm(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 md:py-48 bg-brand-primary text-white relative overflow-hidden">
      {/* Decorative architectural slant shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-secondary/10 skew-x-12 translate-x-20 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-12">
            {data.title}
          </h2>

          {!showForm ? (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button
                onClick={() => setShowForm(true)}
                className="px-10 py-5 bg-white text-brand-primary font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:bg-brand-secondary hover:text-white transition-all duration-300 rounded-none cursor-pointer"
              >
                {data.primaryAction.label}
              </button>
              
              {data.secondaryAction && (
                <a
                  href={data.secondaryAction.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-10 py-5 border border-white/30 text-white font-sans text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300 rounded-none flex items-center gap-3"
                >
                  {isFacebookAction ? <Share2 size={16} /> : <MapPin size={16} />}
                  {data.secondaryAction.label || 'Xem bản đồ'}
                </a>
              )}
            </div>
          ) : (
            <div className="bg-white text-brand-primary p-8 sm:p-12 border border-brand-secondary/20 shadow-xl max-w-lg mx-auto text-left animate-[fadeInUp_0.5s_forwards]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                  Đăng ký nhận tư vấn miễn phí
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-brand-primary/50 hover:text-brand-primary text-sm font-sans"
                >
                  Đóng
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="flex justify-center text-brand-accent">
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-brand-primary">
                    Đăng ký thành công!
                  </h4>
                  <p className="font-sans text-sm text-brand-primary/70">
                    Chuyên viên thiết kế của chúng tôi sẽ liên hệ đến số <strong>{phone}</strong> trong vòng 15-30 phút.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-sans text-[10px] font-semibold tracking-wider text-brand-secondary uppercase mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên của bạn"
                      className="w-full px-4 py-3 bg-brand-bg border-b border-brand-secondary/30 focus:border-brand-primary focus:outline-none text-sm transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-semibold tracking-wider text-brand-secondary uppercase mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại liên hệ"
                      className="w-full px-4 py-3 bg-brand-bg border-b border-brand-secondary/30 focus:border-brand-primary focus:outline-none text-sm transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[10px] font-semibold tracking-wider text-brand-secondary uppercase mb-2">
                      Loại hình công trình
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-bg border-b border-brand-secondary/30 focus:border-brand-primary focus:outline-none text-sm transition-colors rounded-none appearance-none"
                    >
                      <option>Chung cư / Căn hộ</option>
                      <option>Nhà phố / Liền kề</option>
                      <option>Biệt thự</option>
                      <option>Văn phòng / Studio</option>
                      <option>Quán Cafe / Nhà hàng</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-primary text-white text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-brand-secondary rounded-none flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Gửi yêu cầu thiết kế
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
