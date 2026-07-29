'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  role_id?: string;
  tenant_id?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (perm: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  hasPermission: () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        if (process.env.NODE_ENV === 'development') {
          // Bỏ qua đăng nhập ở dev mode để dễ test Booking & CRM
          setUser({
            id: 'mock-dev-id',
            name: 'Dev Admin',
            email: 'admin@dev.local',
            role: 'admin',
            tenant_id: '00000000-0000-0000-0000-000000000000'
          });
        } else {
          setUser(null);
          if (pathname?.startsWith('/admin') && pathname !== '/admin/crm/login') {
            router.push('/admin/crm/login');
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        setUser({
          id: 'mock-dev-id',
          name: 'Dev Admin',
          email: 'admin@dev.local',
          role: 'admin',
          tenant_id: '00000000-0000-0000-0000-000000000000'
        });
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    router.push('/admin/crm');
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/admin/crm/login');
  };

  const hasPermission = (perm: string) => {
    if (!user) return false;
    
    // Nếu user có role_id (tức là đã dùng hệ thống RBAC mới)
    if (user.role_id) {
      return user.permissions?.includes(perm) || false;
    }
    
    // Fallback cho legacy user (chưa có role_id)
    if (user.role === 'admin') return true;
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
