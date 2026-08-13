"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, Search, UserCircle, Menu, LogOut, Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import Link from 'next/link';

import { useSidebar } from './ClientLayout';

export function AdminHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotiMenu, setShowNotiMenu] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNoti, setLoadingNoti] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          setNotifications(data.notifications);
        }
        setLoadingNoti(false);
      })
      .catch(e => {
        console.error('Error fetching notifications:', e);
        setLoadingNoti(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setShowNotiMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Format the pathname to a readable title for breadcrumbs
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Tổng quan';
    if (pathname.startsWith('/admin/crm')) return 'CRM & Pipeline';
    if (pathname.startsWith('/admin/leads')) return 'Leads Data';
    if (pathname.startsWith('/admin/booking/admin')) return 'Lịch hẹn (Booking)';
    if (pathname.startsWith('/admin/settings/account')) return 'Thông báo cá nhân';
    if (pathname.startsWith('/admin/settings')) return 'Cài đặt hệ thống';
    return 'Bảng điều khiển';
  };

  return (
    <header className="h-16 glass-panel px-6 flex items-center justify-between shrink-0 z-40 sticky top-0 soft-shadow">
      
      {/* Left Section - Breadcrumb / Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-slate-800 hidden sm:block">
          {getPageTitle()}
        </h2>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-64 bg-slate-100/50 hover:bg-slate-100 border border-transparent focus:border-indigo-500 focus:bg-white text-sm rounded-full pl-9 pr-4 py-2 outline-none transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 shadow-sm">K</kbd>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <button 
            onClick={() => setShowNotiMenu(!showNotiMenu)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotiMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 pb-3 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Thông báo</h3>
                <span className="text-xs font-semibold text-indigo-600 cursor-pointer hover:underline">Đánh dấu đã đọc</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {loadingNoti ? (
                  <div className="p-4 text-center text-xs text-slate-500">Đang tải...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">Chưa có thông báo nào.</div>
                ) : (
                  notifications.map(noti => (
                    <div key={noti.id} className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors text-left">
                      <p className="text-sm font-semibold text-slate-800">{noti.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{noti.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">{new Date(noti.time).toLocaleString('vi-VN')}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-2 border-t border-slate-100 px-4 text-center">
                <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Xem tất cả</Link>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

        {/* Profile with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-full transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center border-2 border-white shadow-sm font-bold shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              {user ? user.name.charAt(0) : <UserCircle className="w-6 h-6" />}
            </div>
            <div className="hidden sm:flex flex-col items-start mr-1">
              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight">{user ? user.name : 'Khách'}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{user ? user.role : 'Người dùng'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 mr-2" />
          </button>
          
          {/* Dropdown Menu */}
          {showProfileMenu && user && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 mb-2">
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500 font-medium truncate">{user.email}</p>
              </div>
              
              <Link 
                href="/admin/settings/account" 
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                <SettingsIcon className="w-4 h-4" />
                Thông tin cá nhân
              </Link>
              
              <div className="h-px bg-slate-100 my-2"></div>
              
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
