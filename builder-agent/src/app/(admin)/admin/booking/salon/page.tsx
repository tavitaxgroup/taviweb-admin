'use client';

import React, { useState } from 'react';
import { Sparkles, Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, ChevronRight, ArrowLeft, ArrowRight, Scissors } from 'lucide-react';

// --- MOCK DATA ---
const SERVICES = [
  { id: 's1', name: 'Gội đầu dưỡng sinh', duration: '45 phút', price: '150.000đ', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=200&auto=format&fit=crop' },
  { id: 's2', name: 'Cắt tóc tạo kiểu Nữ', duration: '60 phút', price: '250.000đ', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200&auto=format&fit=crop' },
  { id: 's3', name: 'Uốn sóng lơi Hàn Quốc', duration: '120 phút', price: '850.000đ', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&auto=format&fit=crop' },
  { id: 's4', name: 'Cắt tóc Nam Fade', duration: '30 phút', price: '100.000đ', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop' },
];

const STYLISTS = [
  { id: 'any', name: 'Chọn ngẫu nhiên', role: 'Bất kỳ Stylist nào rảnh', rating: '5.0' },
  { id: 'st1', name: 'Tony Trần', role: 'Senior Hair Stylist', rating: '4.9' },
  { id: 'st2', name: 'Anna Nguyễn', role: 'Chuyên gia Uốn/Nhuộm', rating: '4.8' },
  { id: 'st3', name: 'Khang Lê', role: 'Barber Master', rating: '4.9' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '14:00', '15:30', '16:00', '17:00', '18:30'
];

export default function SalonBookingPortal() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', note: '' });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans selection:bg-rose-200">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200 sticky top-0 z-50 transition-all">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 shadow-sm">
              <Sparkles className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-stone-800">TAVI<span className="text-rose-500 font-light">BEAUTY</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Premium Salon & Spa</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-400">
            <span className={step >= 1 ? "text-rose-500" : ""}>Dịch vụ</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 2 ? "text-rose-500" : ""}>Thợ</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 3 ? "text-rose-500" : ""}>Giờ</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 4 ? "text-rose-500" : ""}>Xác nhận</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 relative">
        {/* Animated Background blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="bg-white/60 backdrop-blur-3xl border border-white rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          
          {step > 1 && step < 5 && (
            <button onClick={prevStep} className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-rose-500 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại
            </button>
          )}

          {/* STEP 1: CHỌN DỊCH VỤ */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-stone-800 mb-3 tracking-tight">Chọn Dịch Vụ</h2>
                <p className="text-stone-500 text-lg">Bạn muốn chúng tôi chăm sóc gì cho bạn hôm nay?</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map(svc => (
                  <div 
                    key={svc.id}
                    onClick={() => { setSelectedService(svc.id); nextStep(); }}
                    className={`group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedService === svc.id 
                        ? 'border-rose-400 bg-rose-50/50' 
                        : 'border-transparent bg-white hover:border-rose-200 hover:bg-rose-50/30 hover:shadow-lg hover:-translate-y-1'
                    } shadow-sm`}
                  >
                    <img src={svc.image} alt={svc.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-stone-800 text-lg group-hover:text-rose-600 transition-colors">{svc.name}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-sm font-medium">
                        <span className="text-stone-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {svc.duration}</span>
                        <span className="text-rose-500 bg-rose-100/50 px-2 py-0.5 rounded-lg">{svc.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHỌN THỢ */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-stone-800 mb-3 tracking-tight">Chọn Chuyên Gia</h2>
                <p className="text-stone-500 text-lg">Lựa chọn người thợ ưng ý nhất của bạn</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {STYLISTS.map((stylist, idx) => (
                  <div 
                    key={stylist.id}
                    onClick={() => { setSelectedStylist(stylist.id); nextStep(); }}
                    className={`group relative overflow-hidden p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedStylist === stylist.id 
                        ? 'border-rose-400 bg-rose-50/50 shadow-md' 
                        : 'border-transparent bg-white hover:border-rose-200 hover:bg-rose-50/30 hover:shadow-xl hover:-translate-y-1'
                    } shadow-sm flex items-center gap-4`}
                  >
                    {idx === 0 ? (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center border border-rose-200">
                        <Sparkles className="w-8 h-8 text-rose-500" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${stylist.name}&backgroundColor=ffd5dc`} alt="avatar" />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-bold text-stone-800 text-lg group-hover:text-rose-600 transition-colors">{stylist.name}</h3>
                      <p className="text-stone-500 text-sm">{stylist.role}</p>
                      {idx !== 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500 text-xs">★★★★★</span>
                          <span className="text-stone-400 text-xs font-medium">{stylist.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CHỌN GIỜ */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-stone-800 mb-3 tracking-tight">Thời Gian</h2>
                <p className="text-stone-500 text-lg">Chọn ngày và khung giờ bạn muốn đến</p>
              </div>

              <div className="mb-8 bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-4 uppercase tracking-wider">
                  <CalendarIcon className="w-4 h-4 text-rose-500" /> Ngày hẹn
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 text-stone-800 px-4 py-3 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium"
                />
              </div>

              <div className={`transition-all duration-500 ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none translate-y-4'}`}>
                <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-4 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-rose-500" /> Khung giờ trống
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${
                        selectedTime === time
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className="w-full mt-10 py-4 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-stone-800/20 flex items-center justify-center gap-2"
              >
                Tiếp tục <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 4: THÔNG TIN KHÁCH HÀNG */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-stone-800 mb-3 tracking-tight">Thông Tin Của Bạn</h2>
                <p className="text-stone-500 text-lg">Để chúng tôi chuẩn bị đón tiếp tốt nhất</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-2">
                    <User className="w-4 h-4 text-rose-500" /> Họ và Tên
                  </label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-white border border-stone-200 text-stone-800 px-4 py-3.5 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-700 mb-2">
                    <Phone className="w-4 h-4 text-rose-500" /> Số điện thoại
                  </label>
                  <input 
                    type="tel" 
                    placeholder="0912 345 678"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full bg-white border border-stone-200 text-stone-800 px-4 py-3.5 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Ghi chú thêm (Không bắt buộc)</label>
                  <textarea 
                    placeholder="Ví dụ: Da đầu nhạy cảm, muốn cắt ngắn..."
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                    className="w-full bg-white border border-stone-200 text-stone-800 px-4 py-3.5 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium shadow-sm h-24 resize-none"
                  />
                </div>
              </div>

              {/* Tóm tắt */}
              <div className="mt-8 bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
                <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><Scissors className="w-4 h-4 text-rose-500"/> Tóm tắt lịch hẹn</h4>
                <ul className="space-y-2 text-sm text-stone-600 font-medium">
                  <li className="flex justify-between"><span>Dịch vụ:</span> <span className="text-stone-800">{SERVICES.find(s=>s.id===selectedService)?.name}</span></li>
                  <li className="flex justify-between"><span>Chuyên gia:</span> <span className="text-stone-800">{STYLISTS.find(s=>s.id===selectedStylist)?.name}</span></li>
                  <li className="flex justify-between"><span>Thời gian:</span> <span className="text-rose-600 font-bold">{selectedTime} - {selectedDate}</span></li>
                </ul>
              </div>

              <button
                onClick={nextStep}
                disabled={!customerInfo.name || !customerInfo.phone}
                className="w-full mt-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-rose-500/30"
              >
                Xác nhận Đặt Lịch
              </button>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-10">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-extrabold text-stone-800 mb-4">Đặt lịch thành công!</h2>
              <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
                Cảm ơn <b>{customerInfo.name}</b> đã tin tưởng. Chúng tôi đã nhận được thông tin và sẽ gọi lại xác nhận trong ít phút.
              </p>
              
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 inline-block text-left mb-8 w-full max-w-sm">
                <p className="text-sm text-stone-500 mb-1">Mã đặt lịch</p>
                <p className="font-mono text-xl font-bold text-stone-800 mb-4">#TAVI-{Math.floor(Math.random()*10000)}</p>
                
                <p className="text-sm text-stone-500 mb-1">Thời gian</p>
                <p className="font-bold text-stone-800">{selectedTime}, ngày {selectedDate}</p>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="block mx-auto text-sm font-bold text-rose-500 hover:text-rose-600 underline"
              >
                Đặt thêm lịch khác
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
