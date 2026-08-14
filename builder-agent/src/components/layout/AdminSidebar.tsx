"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { LayoutDashboard, Users, CalendarDays, Target, Settings, Building2, ChevronRight, Shield, History, Bot, Globe, FileText, BookOpen } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Tổng quan', path: '/admin', icon: LayoutDashboard },
  { name: 'SaaS Factory (Tenants)', path: '/admin/workspaces', icon: Building2 },
  { name: 'CRM & Pipeline', path: '/admin/crm', icon: Target },
  { name: 'Leads Data', path: '/admin/leads', icon: Users },
  { name: 'Lịch hẹn', path: '/admin/booking/admin', icon: CalendarDays },
  { name: 'AI CMS (Bài viết)', path: '/admin/cms', icon: FileText },
  { name: 'Khóa học (LMS)', path: '/admin/lms', icon: BookOpen },
];

const BOTTOM_MENU = [
  { name: 'Nhật ký hệ thống', path: '/admin/audit-logs', icon: History },
  { name: 'Cài đặt Quy trình', path: '/admin/settings/pipelines', icon: Target },
  { name: 'Quản lý Team', path: '/admin/settings/team', icon: Users },
  { name: 'Phân quyền (Roles)', path: '/admin/settings/roles', icon: Shield },
  { name: 'Trợ lý AI (Chatbot)', path: '/admin/settings/chatbot', icon: Bot },
  { name: 'Cài đặt hệ thống', path: '/admin/settings', icon: Settings },
  { name: 'Trung tâm AI', path: '/admin/ai-hub', icon: Bot },
  { name: 'Cài đặt Website', path: '/admin/settings/website', icon: Globe },
];

import { useSidebar } from './ClientLayout';

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, hasPermission } = useAuth();
  const { isSidebarOpen } = useSidebar();

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gradient-to-b from-slate-950 to-slate-900 h-full flex flex-col text-slate-300 transition-all duration-300 border-r border-slate-800 shadow-2xl shrink-0 overflow-hidden relative`}>
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />

      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/40 bg-transparent whitespace-nowrap relative z-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] mr-3 shrink-0">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-extrabold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">TAVI SaaS</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar whitespace-nowrap relative z-10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Workspace</div>
        
        {MENU_ITEMS.map((item) => {
          if (item.path === '/admin/leads' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          // RBAC: Only Super Admin (TAVI) can see SaaS Factory
          if (item.path === '/admin/workspaces' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          // Active modules filter
          const modules = user?.tenant?.active_modules || ['crm', 'booking', 'cms', 'lms', 'chatbot']; // Default fallback for existing sessions
          if (item.path === '/admin/crm' && !modules.includes('crm')) return null;
          if (item.path === '/admin/leads' && !modules.includes('crm')) return null;
          if (item.path === '/admin/booking/admin' && !modules.includes('booking')) return null;
          if (item.path === '/admin/cms' && !modules.includes('cms')) return null;
          if (item.path === '/admin/lms' && !modules.includes('lms')) return null;

          const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-indigo-500/15 text-indigo-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-indigo-500/20' 
                  : 'hover:bg-slate-800/60 hover:text-white border border-transparent'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
              )}
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'text-slate-400 group-hover:text-indigo-300'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-70 shrink-0 text-indigo-300" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-slate-800/40 bg-transparent whitespace-nowrap relative z-10">
        {BOTTOM_MENU.map((item) => {
          if (item.path === '/admin/audit-logs' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/settings/pipelines' && !hasPermission('manage_pipelines')) return null;
          if (item.path === '/admin/settings/team' && !hasPermission('manage_users')) return null;
          if (item.path === '/admin/settings/roles' && !hasPermission('manage_roles')) return null;
          if (item.path === '/admin/settings/chatbot' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/settings' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/settings/website' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/ai-hub' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          const modules = user?.tenant?.active_modules || ['crm', 'booking', 'cms', 'lms', 'chatbot'];
          if (item.path === '/admin/settings/chatbot' && !modules.includes('chatbot')) return null;

          const isActive = pathname === item.path || pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-slate-800/80 text-white border border-slate-700/50' 
                  : 'hover:bg-slate-800/40 hover:text-white border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-slate-200 drop-shadow-sm' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
