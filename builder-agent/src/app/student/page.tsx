"use client";

import React, { useState } from 'react';

export default function StudentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');

  const mockClasses = [
    { id: 1, name: 'IELTS Intensive K99', schedule: 'Tối 2-4-6 (19:00 - 21:00)', link: 'https://meet.google.com/abc-xyz-def', status: 'ongoing', nextSession: '19:00 Hôm nay' },
    { id: 2, name: 'Giao tiếp Phản xạ T10', schedule: 'Cuối tuần (Sáng T7-CN)', link: '', status: 'upcoming', nextSession: 'Khai giảng 15/08' }
  ];

  const mockMaterials = [
    { id: 1, title: 'IELTS_Writing_Task_1_Guide.pdf', date: '10/08/2026', size: '2.4 MB' },
    { id: 2, title: 'Vocabulary_List_Topic_Education.pdf', date: '08/08/2026', size: '1.1 MB' },
    { id: 3, title: 'Video Record Buổi 1.mp4', date: '05/08/2026', size: '450 MB' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Khu vực Học viên</h1>
            <p className="text-slate-500 mt-2">Đăng nhập để xem lịch học và tài liệu</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại đăng ký</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="Nhập số điện thoại..." 
              />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors"
            >
              Đăng nhập
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">
              Hệ thống tự động đồng bộ với danh sách học viên trong CRM.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            StudentPortal
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-slate-700 hidden sm:block">Xin chào, Học viên {phone}</div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              HV
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lớp học của tôi */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Lớp Học Của Tôi
            </h2>
            
            <div className="grid gap-4">
              {mockClasses.map(cls => (
                <div key={cls.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-indigo-300 transition-colors">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-slate-800">{cls.name}</h3>
                      {cls.status === 'ongoing' && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-sm flex items-center gap-1.5 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {cls.schedule}
                    </div>
                    <div className="text-indigo-600 text-sm font-semibold mt-2">
                      Tiếp theo: {cls.nextSession}
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    {cls.status === 'ongoing' ? (
                      <a href={cls.link} target="_blank" rel="noreferrer" className="block w-full text-center bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold py-2.5 px-6 rounded-xl transition-colors border border-indigo-200 hover:border-transparent">
                        Vào phòng học (Meet)
                      </a>
                    ) : (
                      <button disabled className="block w-full text-center bg-slate-100 text-slate-400 font-bold py-2.5 px-6 rounded-xl cursor-not-allowed">
                        Chưa tới giờ
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tài liệu & Thông báo */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Tài Liệu Mới
            </h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {mockMaterials.map(doc => (
                  <li key={doc.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      {doc.title.endsWith('.mp4') ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-700 text-sm break-all">{doc.title}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span>{doc.date}</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 p-1 bg-indigo-50 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                <button className="text-sm font-semibold text-indigo-600 hover:underline">Xem tất cả tài liệu</button>
              </div>
            </div>
            
            {/* Promo Banner / Upsell */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 -translate-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2 relative z-10">Bạn cần tư vấn lộ trình?</h3>
              <p className="text-indigo-100 text-sm mb-4 relative z-10">Trợ lý AI của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc học tập 24/7.</p>
              <button className="bg-white text-indigo-700 font-bold py-2 px-4 rounded-lg text-sm w-full shadow-sm hover:shadow relative z-10 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Chat với AI Trợ giảng
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
