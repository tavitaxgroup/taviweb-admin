"use client";

import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import ChatbotWidget from '../ChatbotWidget';

export const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {}
});
export const useSidebar = () => useContext(SidebarContext);

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAuthPage = pathname === '/admin/crm/login' || pathname === '/crm/login' || pathname === '/login' || pathname?.includes('/login');

  if (isAuthPage) {
    return (
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 h-full">
        <main className="flex-1 overflow-y-auto relative h-full">
          {children}
        </main>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/50">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>
      {user?.tenant_id && <ChatbotWidget tenantId={user.tenant_id} />}
    </SidebarContext.Provider>
  );
}
