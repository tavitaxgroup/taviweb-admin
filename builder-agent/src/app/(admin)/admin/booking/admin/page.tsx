'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import BookingAdmin from '@/modules/booking/components/BookingAdmin';
import ResourceManagement from '@/modules/booking/components/ResourceManagement';
import ServiceManagement from '@/modules/booking/components/ServiceManagement';
import BookingSettings from '@/modules/booking/components/BookingSettings';
import { Calendar as CalendarIcon, Scissors, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function StandaloneBookingAdminPage() {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'calendar' | 'resources' | 'services' | 'settings'>('calendar');
  const [templateKey, setTemplateKey] = useState<string>('salon_toc');

  useEffect(() => {
    if (user?.tenant_id) {
      import('@/modules/booking/api/booking.service').then(({ BookingService }) => {
        BookingService.getTemplateKey(user.tenant_id as string).then(key => {
          setTemplateKey(key);
        });
      });
    }
  }, [user?.tenant_id]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div></div>;
  }

  // Bỏ qua yêu cầu đăng nhập tạm thời cho mục đích demo

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] font-sans">
      {/* Top Navigation for Booking Module */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
              BOOKING SYSTEM
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Management</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
             <button 
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'}`}
             >
                Lịch Hẹn
             </button>
             <button 
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'resources' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'}`}
             >
                Tài Nguyên
             </button>
             <button 
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'services' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'}`}
             >
                Dịch Vụ
             </button>
             <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'}`}
             >
                Cài Đặt
             </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-6 relative max-w-7xl mx-auto w-full">
         {activeTab === 'calendar' && <BookingAdmin template={templateKey as any} />}
         {activeTab === 'resources' && <ResourceManagement template={templateKey as any} />}
         {activeTab === 'services' && <ServiceManagement template={templateKey as any} />}
         {activeTab === 'settings' && <BookingSettings />}
      </main>
    </div>
  );
}
