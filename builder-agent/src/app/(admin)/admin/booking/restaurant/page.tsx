'use client';

import React, { useState } from 'react';
import { Utensils, Calendar as CalendarIcon, Clock, Users, User, Phone, CheckCircle2, ChevronRight, ArrowLeft, ArrowRight, Info, Flame } from 'lucide-react';

// --- MOCK DATA ---
const TABLES = [
  { id: 't1', name: 'Bàn Cửa Sổ 01', capacity: 2, status: 'available', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop' },
  { id: 't2', name: 'Bàn Trung Tâm 05', capacity: 4, status: 'available', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=200&auto=format&fit=crop' },
  { id: 't3', name: 'Phòng VIP Hoa Sen', capacity: 10, status: 'available', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=200&auto=format&fit=crop' },
  { id: 't4', name: 'Bàn Ban Công 02', capacity: 4, status: 'booked', image: 'https://images.unsplash.com/photo-1414235077428-338988a9228e?q=80&w=200&auto=format&fit=crop' },
];

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
];

export default function RestaurantBookingPortal() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', note: '' });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#1c1917] text-stone-100 font-sans selection:bg-orange-500/30">
      {/* Premium Dark Header */}
      <header className="bg-[#1c1917]/80 backdrop-blur-xl border-b border-stone-800 sticky top-0 z-50 transition-all">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-950/50 rounded-xl flex items-center justify-center border border-orange-900/50 shadow-inner">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-white">TAVI<span className="text-orange-500 font-medium">BISTRO</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Fine Dining & Steakhouse</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-500">
            <span className={step >= 1 ? "text-orange-500" : ""}>Ngày & Giờ</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 2 ? "text-orange-500" : ""}>Chọn Bàn</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 3 ? "text-orange-500" : ""}>Thông tin</span>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className={step >= 4 ? "text-orange-500" : ""}>Hoàn tất</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 relative">
        {/* Animated Background blob for Dark Mode */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="bg-[#292524]/60 backdrop-blur-3xl border border-stone-700/50 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
          
          {step > 1 && step < 4 && (
            <button onClick={prevStep} className="flex items-center gap-2 text-sm font-bold text-stone-400 hover:text-orange-500 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại
            </button>
          )}

          {/* STEP 1: NGÀY GIỜ VÀ SỐ NGƯỜI */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Kính Chào Quý Khách</h2>
                <p className="text-stone-400 text-lg">Vui lòng chọn thời gian bạn muốn thưởng thức bữa tối</p>
              </div>

              <div className="space-y-8">
                {/* Số người */}
                <div className="bg-[#1c1917]/50 p-6 rounded-2xl border border-stone-800">
                   <label className="flex items-center gap-2 text-sm font-bold text-stone-300 mb-4 uppercase tracking-wider">
                    <Users className="w-4 h-4 text-orange-500" /> Số khách
                  </label>
                  <div className="flex items-center gap-4">
                    <button onClick={()=>setPartySize(Math.max(1, partySize-1))} className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xl transition-colors">-</button>
                    <div className="flex-1 text-center font-bold text-2xl text-white">{partySize} Người</div>
                    <button onClick={()=>setPartySize(Math.min(20, partySize+1))} className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xl transition-colors">+</button>
                  </div>
                </div>

                {/* Ngày */}
                <div className="bg-[#1c1917]/50 p-6 rounded-2xl border border-stone-800">
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-300 mb-4 uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4 text-orange-500" /> Ngày đặt bàn
                  </label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#292524] border border-stone-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium color-scheme-dark"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                {/* Khung giờ */}
                <div className={`transition-all duration-500 ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none translate-y-4'}`}>
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-300 mb-4 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-orange-500" /> Khung giờ trống
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3.5 rounded-xl font-bold text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105 border border-orange-400'
                            : 'bg-[#292524] border border-stone-700 text-stone-300 hover:border-orange-500/50 hover:text-orange-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className="w-full mt-10 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2"
              >
                Tiếp tục <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: CHỌN BÀN */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Vị Trí Ngồi</h2>
                <p className="text-stone-400 text-lg">Chọn không gian yêu thích của bạn</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {TABLES.filter(t => t.capacity >= partySize).map((table) => {
                  const isAvailable = table.status === 'available';
                  return (
                    <div 
                      key={table.id}
                      onClick={() => { if(isAvailable) { setSelectedTable(table.id); nextStep(); } }}
                      className={`group relative overflow-hidden flex items-center gap-4 p-3 rounded-2xl border-2 transition-all ${
                        !isAvailable ? 'opacity-50 grayscale cursor-not-allowed border-transparent bg-[#1c1917]' :
                        selectedTable === table.id 
                          ? 'border-orange-500 bg-orange-500/10 shadow-md' 
                          : 'border-stone-700 bg-[#1c1917] hover:border-orange-500/50 hover:bg-[#292524] cursor-pointer'
                      }`}
                    >
                      <img src={table.image} alt={table.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg">{table.name}</h3>
                        <p className="text-stone-400 text-sm mt-1">Sức chứa: Tối đa {table.capacity} khách</p>
                        
                        {!isAvailable ? (
                          <span className="inline-block mt-2 text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">Đã hết chỗ</span>
                        ) : (
                          <span className="inline-block mt-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Còn trống</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 bg-[#1c1917]/50 p-4 rounded-xl flex items-start gap-3 border border-stone-800">
                <Info className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-sm text-stone-400">Nếu bạn không chọn bàn, nhà hàng sẽ tự động sắp xếp bàn có vị trí đẹp nhất phù hợp với số lượng khách.</p>
              </div>
              
              <button
                onClick={() => { setSelectedTable('auto'); nextStep(); }}
                className="w-full mt-6 py-4 bg-transparent border-2 border-stone-700 hover:border-orange-500 hover:text-orange-500 text-stone-300 rounded-xl font-bold text-lg transition-all"
              >
                Để nhà hàng tự sắp xếp
              </button>
            </div>
          )}

          {/* STEP 3: THÔNG TIN KHÁCH HÀNG */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Thông Tin Liên Hệ</h2>
                <p className="text-stone-400 text-lg">Vui lòng để lại thông tin để chúng tôi xác nhận</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-300 mb-2">
                    <User className="w-4 h-4 text-orange-500" /> Tên người đặt
                  </label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-[#1c1917] border border-stone-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-stone-300 mb-2">
                    <Phone className="w-4 h-4 text-orange-500" /> Số điện thoại
                  </label>
                  <input 
                    type="tel" 
                    placeholder="0912 345 678"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full bg-[#1c1917] border border-stone-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-300 mb-2">Lưu ý đặc biệt (Dị ứng, Trang trí tiệc...)</label>
                  <textarea 
                    placeholder="Ví dụ: Dị ứng đậu phộng, sinh nhật bạn gái..."
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                    className="w-full bg-[#1c1917] border border-stone-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium h-28 resize-none"
                  />
                </div>
              </div>

              {/* Tóm tắt */}
              <div className="mt-8 bg-orange-950/30 p-5 rounded-2xl border border-orange-900/50">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Utensils className="w-4 h-4 text-orange-500"/> Tóm tắt đặt bàn</h4>
                <ul className="space-y-3 text-sm text-stone-300 font-medium">
                  <li className="flex justify-between border-b border-stone-800 pb-2"><span>Thời gian:</span> <span className="text-orange-400 font-bold">{selectedTime} - {selectedDate}</span></li>
                  <li className="flex justify-between border-b border-stone-800 pb-2"><span>Số lượng:</span> <span className="text-white">{partySize} Khách</span></li>
                  <li className="flex justify-between"><span>Vị trí bàn:</span> <span className="text-white">{selectedTable === 'auto' ? 'Nhà hàng sắp xếp' : TABLES.find(t=>t.id===selectedTable)?.name}</span></li>
                </ul>
              </div>

              <button
                onClick={nextStep}
                disabled={!customerInfo.name || !customerInfo.phone}
                className="w-full mt-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/30"
              >
                Xác Nhận Đặt Bàn
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-10">
              <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4">Đặt bàn thành công!</h2>
              <p className="text-stone-400 text-lg mb-8 max-w-md mx-auto">
                Cảm ơn quý khách <b>{customerInfo.name}</b>. Nhà hàng sẽ liên hệ lại qua số <b>{customerInfo.phone}</b> để xác nhận trong thời gian sớm nhất.
              </p>
              
              <div className="bg-[#1c1917] p-6 rounded-2xl border border-stone-800 inline-block text-left mb-8 w-full max-w-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <p className="text-sm text-stone-500 mb-1">Mã xác nhận</p>
                <p className="font-mono text-xl font-bold text-orange-400 mb-4">#BISTRO-{Math.floor(Math.random()*10000)}</p>
                
                <p className="text-sm text-stone-500 mb-1">Thời gian</p>
                <p className="font-bold text-white">{selectedTime}, ngày {selectedDate}</p>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="block mx-auto text-sm font-bold text-stone-400 hover:text-orange-400 transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
