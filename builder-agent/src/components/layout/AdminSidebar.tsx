"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { LayoutDashboard, Users, CalendarDays, Target, Settings, Building2, ChevronRight, Shield, History, Bot } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Tổng quan', path: '/admin', icon: LayoutDashboard },
  { name: 'SaaS Factory (Tenants)', path: '/admin/workspaces', icon: Building2 },
  { name: 'CRM & Pipeline', path: '/admin/crm', icon: Target },
  { name: 'Leads Data', path: '/admin/leads', icon: Users },
  { name: 'Lịch hẹn', path: '/admin/booking/admin', icon: CalendarDays },
];

const BOTTOM_MENU = [
  { name: 'Nhật ký hệ thống', path: '/admin/audit-logs', icon: History },
  { name: 'Cài đặt Quy trình', path: '/admin/settings/pipelines', icon: Target },
  { name: 'Quản lý Team', path: '/admin/settings/team', icon: Users },
  { name: 'Phân quyền (Roles)', path: '/admin/settings/roles', icon: Shield },
  { name: 'Trợ lý AI (Chatbot)', path: '/admin/settings/chatbot', icon: Bot },
  { name: 'Cài đặt hệ thống', path: '/admin/settings', icon: Settings },
  { name: 'Trung tâm AI', path: '/admin/ai-hub', icon: Bot },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, hasPermission } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 h-full flex flex-col text-slate-300 transition-all border-r border-slate-800 shadow-xl shrink-0">
      
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/60 bg-slate-950/30">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md mr-3">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-extrabold text-lg tracking-wide">TAVI SaaS</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">Workspace</div>
        
        {MENU_ITEMS.map((item) => {
          if (item.path === '/admin/leads' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          // RBAC: Only Super Admin (TAVI) can see SaaS Factory
          if (item.path === '/admin/workspaces' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/20">
        {BOTTOM_MENU.map((item) => {
          if (item.path === '/admin/audit-logs' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/settings/pipelines' && !hasPermission('manage_pipelines')) return null;
          if (item.path === '/admin/settings/team' && !hasPermission('manage_users')) return null;
          if (item.path === '/admin/settings/roles' && !hasPermission('manage_roles')) return null;
          if (item.path === '/admin/settings/chatbot' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/settings' && !hasPermission('manage_settings')) return null;
          if (item.path === '/admin/ai-hub' && user?.tenant_id !== '6064025b-7fe4-4840-a27f-2d5da65e15fa') return null;
          
          const isActive = pathname === item.path || pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                isActive 
                  ? 'bg-slate-800 text-white' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
