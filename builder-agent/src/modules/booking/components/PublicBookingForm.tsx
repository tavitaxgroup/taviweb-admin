'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Scissors, Utensils, User, CheckCircle2, Check, ArrowRight, ChevronLeft, CalendarDays, Sparkles, Stethoscope, BriefcaseMedical, Coffee, Dumbbell, Paintbrush, Gavel } from 'lucide-react';
import { BookingService, BookingResource, BookingServiceItem } from '../api/booking.service';

interface Props {
  tenantId: string;
  tenantName: string;
  templateKey: string;
}

export default function PublicBookingForm({ tenantId, tenantName, templateKey }: Props) {
  const [resources, setResources] = useState<BookingResource[]>([]);
  const [services, setServices] = useState<BookingServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<{start: string, end: string}[]>([]);
  const [dates, setDates] = useState<{date: Date, label: string, dayName: string, fullDate: string}[]>([]);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    resourceId: '',
    serviceId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, svcs, config] = await Promise.all([
          BookingService.getResources(tenantId),
          BookingService.getServices(tenantId),
          BookingService.getSettings(tenantId)
        ]);
        const activeRes = res.filter(r => r.status === 'active');
        setResources(activeRes);
        setServices(svcs);
        
        // Generate 30-min time slots based on opening/closing time
        const slots = [];
        const startHour = parseInt(config.opening_time.split(':')[0], 10);
        const endHour = parseInt(config.closing_time.split(':')[0], 10);
        for (let i = startHour; i <= endHour; i++) {
          slots.push(`${i.toString().padStart(2, '0')}:00`);
          if (i !== endHour) {
             slots.push(`${i.toString().padStart(2, '0')}:30`);
          }
        }
        setTimeSlots(slots);

        // Generate next 14 days
        const nextDates: {date: Date, dayName: string, label: string, fullDate: string}[] = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() + i);
          
          let dayName = d.toLocaleDateString('vi-VN', { weekday: 'short' });
          if (i === 0) dayName = 'Hôm nay';
          else if (i === 1) dayName = 'Ngày mai';

          nextDates.push({
            date: d,
            dayName: dayName,
            label: `${d.getDate()}/${d.getMonth() + 1}`,
            fullDate: d.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          });
        }
        setDates(nextDates);
        setFormData(f => ({ ...f, date: nextDates[0].date.toISOString().split('T')[0] }));
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu booking', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tenantId]);

  // Fetch availability when date or resource changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!formData.date) return;
      try {
        let url = `/api/public/${tenantId}/booking?date=${formData.date}`;
        if (formData.resourceId) {
          url += `&resourceId=${formData.resourceId}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setBookedSlots(data.booked_slots || []);
        }
      } catch (err) {
        console.error('Failed to fetch availability', err);
      }
    };
    fetchAvailability();
  }, [formData.date, formData.resourceId, tenantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.time) return;

    let finalResourceId = formData.resourceId;
    if (!finalResourceId && resources.length > 0) {
       finalResourceId = resources[0].id; // fallback random
    }

    setSubmitting(true);
    try {
      const start = new Date(formData.date);
      const [h, m] = formData.time.split(':');
      start.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);

      const service = services.find(s => s.id === formData.serviceId);
      const duration = service?.duration_minutes || 60;

      const end = new Date(start);
      end.setMinutes(start.getMinutes() + duration);

      const res = await fetch(`/api/public/${tenantId}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource_id: finalResourceId,
          service_id: formData.serviceId || undefined,
          service_name: service?.name || undefined,
          customer_name: formData.customerName,
          customer_phone: formData.customerPhone,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          status: 'pending', 
          notes: 'Premium UI Booking'
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        if (res.status === 409 || errData.error === 'double_booking') {
          setBookingError(errData.message || 'Rất tiếc, khung giờ này vừa có người nhanh tay đặt trước. Vui lòng chọn khung giờ khác.');
          // Tự động trigger refresh lại bookedSlots bằng cách gán lại state date để chạy lại useEffect
          setFormData(prev => ({ ...prev, time: '' }));
          const tempDate = formData.date;
          setFormData(prev => ({ ...prev, date: '' }));
          setTimeout(() => setFormData(prev => ({ ...prev, date: tempDate })), 50);
          return;
        }
        throw new Error('Booking failed');
      }
      
      setSuccess(true);
      setBookingError(null);
    } catch (err) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full mx-auto border border-white/60 min-h-[400px] flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
        <p className="text-slate-600 font-medium text-lg tracking-wide">Đang chuẩn bị không gian...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-12 text-center max-w-2xl w-full mx-auto border border-white/80 animate-in zoom-in-95 duration-700 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
           <div className="w-28 h-28 bg-gradient-to-tr from-emerald-400 to-teal-400 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30 rotate-3 hover:rotate-6 transition-transform">
             <CheckCircle2 className="w-14 h-14" />
           </div>
           <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Đặt Lịch Thành Công!</h2>
           <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg leading-relaxed font-medium">
             Tuyệt vời! Yêu cầu của bạn tại <span className="font-bold text-slate-900">{tenantName}</span> đã được ghi nhận thành công.
           </p>
           <button onClick={() => { setSuccess(false); setFormData({ ...formData, time: '', serviceId: '', resourceId: ''}); }} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-5 text-lg rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2">
             <CalendarIcon className="w-5 h-5" /> Đặt thêm lịch mới
           </button>
        </div>
      </div>
    );
  }

  const getCoverPhoto = () => {
    switch(templateKey) {
       case 'salon_toc': return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200';
       case 'spa': return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200';
       case 'nha_hang': return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200';
       case 'quan_cafe': return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200';
       case 'nha_khoa': return 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200';
       case 'phong_kham':
       case 'tham_my_vien': return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200';
       case 'phong_gym': return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200';
       case 'noi_that': return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200';
       case 'luat_su': return 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200';
       case 'studio_chup_anh': return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200';
       case 'trung_tam_tieng_anh': return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200';
       case 'dich_vu_ve_sinh': return 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200';
       case 'garage_oto': return 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=1200';
       case 'cong_ty_xay_dung': return 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200';
       default: return 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200';
    }
  };

  const getIcon = () => {
    switch(templateKey) {
       case 'salon_toc': return <Scissors className="w-4 h-4" />;
       case 'spa': return <Sparkles className="w-4 h-4" />;
       case 'nha_hang': return <Utensils className="w-4 h-4" />;
       case 'quan_cafe': return <Coffee className="w-4 h-4" />;
       case 'nha_khoa': return <BriefcaseMedical className="w-4 h-4" />;
       case 'phong_kham':
       case 'tham_my_vien': return <Stethoscope className="w-4 h-4" />;
       case 'phong_gym': return <Dumbbell className="w-4 h-4" />;
       case 'noi_that': return <Paintbrush className="w-4 h-4" />;
       case 'luat_su': return <Gavel className="w-4 h-4" />;
       default: return <User className="w-4 h-4" />;
    }
  };

  const selectedService = services.find(s => s.id === formData.serviceId);
  const selectedResource = resources.find(r => r.id === formData.resourceId);
  const selectedDateObj = dates.find(d => d.date.toISOString().split('T')[0] === formData.date);

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* LEFT COLUMN: The Selection Form */}
      <div className="flex-1 min-w-0 space-y-8">
         
         {/* COVER BANNER HEADER */}
         <div className="w-full h-48 lg:h-64 rounded-3xl overflow-hidden relative shadow-lg shadow-indigo-900/10 border border-white/60">
            <img src={getCoverPhoto()} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Cover Banner" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-3 border border-white/30 shadow-sm">
                 {getIcon()}
                 {tenantName}
               </div>
               <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">Đặt Lịch Hẹn</h1>
            </div>
         </div>

         {/* SERVICE SELECTION */}
         {services.length > 0 && (
           <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/30">1</div>
                   <h2 className="text-xl font-extrabold text-slate-900">Chọn Dịch Vụ</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {services.map(s => {
                     const isSelected = formData.serviceId === s.id;
                     return (
                       <div 
                         key={s.id}
                         onClick={() => setFormData({...formData, serviceId: s.id})}
                         className={`relative p-5 lg:p-6 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden ${isSelected ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-[1.02]' : 'bg-white/80 hover:bg-white text-slate-800 border border-slate-100 hover:border-indigo-200 hover:shadow-lg'}`}
                       >
                         {isSelected && <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none"></div>}
                         <div className="relative z-10">
                            <h3 className={`font-bold text-xl mb-2 pr-8 ${isSelected ? 'text-white' : 'text-slate-800'}`}>{s.name}</h3>
                            <div className="flex items-center justify-between mt-4">
                               <span className="font-extrabold text-lg">
                                 {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(s.price)}
                               </span>
                               <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold ${isSelected ? 'bg-indigo-500/50 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                 <Clock className="w-4 h-4" /> {s.duration_minutes} phút
                               </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-0 right-0 text-white">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                            )}
                         </div>
                       </div>
                     )
                   })}
                </div>
             </div>
           </div>
         )}

         {/* RESOURCE SELECTION */}
         {resources.length > 0 && (
           <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
             <div className="absolute top-0 right-0 w-48 h-48 bg-rose-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-orange-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-rose-500/30">2</div>
                   <h2 className="text-xl font-extrabold text-slate-900">Chọn Chuyên Viên / Khu Vực</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   <div 
                     onClick={() => setFormData({...formData, resourceId: ''})}
                     className={`p-5 rounded-3xl cursor-pointer text-center transition-all duration-300 ${formData.resourceId === '' ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.02]' : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-100 hover:border-slate-300 hover:shadow-lg'}`}
                   >
                      <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 shadow-inner ${formData.resourceId === '' ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                         <Sparkles className={`w-6 h-6 ${formData.resourceId === '' ? 'text-amber-300' : ''}`} />
                      </div>
                      <h4 className="font-bold text-base mb-1">Bất kỳ ai</h4>
                      <p className={`text-xs font-medium ${formData.resourceId === '' ? 'text-slate-300' : 'text-slate-400'}`}>Sắp xếp ngẫu nhiên</p>
                   </div>
                   
                   {resources.map(r => {
                     const isSelected = formData.resourceId === r.id;
                     return (
                       <div 
                         key={r.id}
                         onClick={() => setFormData({...formData, resourceId: r.id})}
                         className={`p-5 rounded-3xl cursor-pointer text-center transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-xl shadow-rose-500/20 scale-[1.02]' : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-100 hover:border-rose-200 hover:shadow-lg'}`}
                       >
                          <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center font-black text-xl mb-3 shadow-inner ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                             {r.name.charAt(0)}
                          </div>
                          <h4 className="font-bold text-base mb-1 truncate px-2">{r.name}</h4>
                          {r.role_or_capacity && <p className={`text-xs font-medium truncate ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>{r.role_or_capacity}</p>}
                       </div>
                     )
                   })}
                </div>
             </div>
           </div>
         )}

         {/* DATE & TIME SELECTION */}
         <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
             <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/30">3</div>
                   <h2 className="text-xl font-extrabold text-slate-900">Thời Gian</h2>
                </div>

                {/* Horizontal Date Scroller */}
                <div className="flex overflow-x-auto gap-3 pb-6 custom-scrollbar snap-x">
                   {dates.map((d) => {
                      const dateStr = d.date.toISOString().split('T')[0];
                      const isSelected = formData.date === dateStr;
                      return (
                         <div 
                           key={dateStr}
                           onClick={() => setFormData({...formData, date: dateStr, time: ''})}
                           className={`shrink-0 w-24 flex flex-col items-center justify-center p-4 rounded-3xl cursor-pointer snap-start transition-all duration-300 ${isSelected ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 -translate-y-1 scale-105' : 'bg-white/80 border border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
                         >
                           <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>{d.dayName}</span>
                           <span className="text-3xl font-black mb-1">{d.date.getDate()}</span>
                           <span className={`text-xs font-bold ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>Th{d.date.getMonth() + 1}</span>
                         </div>
                      );
                   })}
                </div>

                <div className="w-full h-px bg-slate-200/50 my-6"></div>

                {bookingError && (
                   <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                     <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                     <p className="text-sm font-bold leading-relaxed">{bookingError}</p>
                   </div>
                )}

                {/* Time Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                   {timeSlots.map(t => {
                     const isSelected = formData.time === t;
                     const [h, m] = t.split(':');
                     const slotStart = new Date(formData.date);
                     slotStart.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
                     
                     // Kiểm tra nếu slotStart nằm trong khoảng thời gian đã được đặt
                     const isBooked = bookedSlots.some(slot => {
                        const bStart = new Date(slot.start);
                        const bEnd = new Date(slot.end);
                        return slotStart >= bStart && slotStart < bEnd;
                     });

                     return (
                       <button
                         key={t}
                         type="button"
                         disabled={isBooked}
                         onClick={() => { setFormData({...formData, time: t}); setBookingError(null); }}
                         className={`py-4 px-2 rounded-2xl text-base font-extrabold transition-all duration-300 border-2 ${
                           isBooked ? 'bg-slate-100 text-slate-400 border-transparent cursor-not-allowed opacity-60' :
                           isSelected ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/30 scale-105' : 
                           'bg-white/80 text-slate-700 border-transparent hover:border-amber-300 hover:text-amber-600 hover:bg-white shadow-sm'
                         }`}
                       >
                         {isBooked ? <span className="text-sm line-through decoration-slate-400">{t}</span> : t}
                       </button>
                     );
                   })}
                </div>
             </div>
         </div>

         {/* CUSTOMER INFO */}
         <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500 mb-8">
             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-500/30">4</div>
                   <h2 className="text-xl font-extrabold text-slate-900">Thông Tin Liên Hệ</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Họ và tên <span className="text-rose-500">*</span></label>
                     <input required type="text" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full px-6 py-4 rounded-2xl border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/80 text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm hover:bg-white" placeholder="Nguyễn Văn A" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Số điện thoại <span className="text-rose-500">*</span></label>
                     <input required type="tel" value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} className="w-full px-6 py-4 rounded-2xl border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white/80 text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-medium shadow-sm hover:bg-white" placeholder="0901234567" />
                   </div>
                </div>
             </div>
         </div>

      </div>

      {/* RIGHT COLUMN: Sticky Summary */}
      <div className="w-full lg:w-[350px] shrink-0">
         <div className="sticky top-8 bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-slate-900/40 text-white overflow-hidden relative">
            
            {/* Dark mode glow effects */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full min-h-[500px]">
               <h3 className="text-xl font-black tracking-wider text-slate-300 uppercase mb-8 flex items-center gap-2">
                 Tóm tắt lịch hẹn
               </h3>

               <div className="flex-1 space-y-8">
                  {/* Service Detail */}
                  <div className="flex gap-5 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                        {getIcon()}
                     </div>
                     <div>
                        <div className="text-xs font-bold tracking-widest text-slate-400 mb-1.5 uppercase">Dịch vụ</div>
                        <div className="font-bold text-lg text-white leading-snug">{selectedService ? selectedService.name : 'Chưa chọn'}</div>
                        {selectedService && <div className="text-indigo-400 font-black mt-2 text-xl">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedService.price)}</div>}
                     </div>
                  </div>

                  {/* Resource Detail */}
                  <div className="flex gap-5 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                        <User className="w-6 h-6 text-rose-400" />
                     </div>
                     <div>
                        <div className="text-xs font-bold tracking-widest text-slate-400 mb-1.5 uppercase">Người phụ trách / Khu vực</div>
                        <div className="font-bold text-lg text-white leading-snug">{selectedResource ? selectedResource.name : 'Bất kỳ ai (Ngẫu nhiên)'}</div>
                     </div>
                  </div>

                  {/* DateTime Detail */}
                  <div className="flex gap-5 items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                        <CalendarIcon className="w-6 h-6 text-amber-400" />
                     </div>
                     <div>
                        <div className="text-xs font-bold tracking-widest text-slate-400 mb-1.5 uppercase">Thời gian</div>
                        <div className="font-bold text-lg text-white leading-snug flex items-center gap-2">
                          {formData.time ? <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/30">{formData.time}</span> : '...'}
                        </div>
                        <div className="text-slate-300 font-medium text-sm mt-2">{selectedDateObj ? selectedDateObj.fullDate : '...'}</div>
                     </div>
                  </div>
               </div>

               <div className="mt-10 pt-8 border-t border-white/10">
                 <button 
                   onClick={handleSubmit}
                   disabled={submitting || !formData.customerName || !formData.time} 
                   className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xl py-5 rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group flex items-center justify-center gap-3"
                 >
                   {submitting ? (
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></span> Đang xử lý...
                      </span>
                   ) : (
                      <>
                        Chốt Lịch Ngay
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                   )}
                 </button>
                 <p className="text-center text-xs text-slate-500 font-medium mt-5">Bằng việc đặt lịch, bạn đồng ý với chính sách và quy định của cửa hàng.</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
