'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { User, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user);
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 font-sans overflow-hidden relative p-4">
      
      {/* Background Animated Gradients / Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-[15%] w-24 h-24 bg-gradient-to-br from-indigo-500/30 to-purple-500/10 rounded-3xl rotate-12 backdrop-blur-3xl border border-white/5 shadow-2xl animate-bounce" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-32 right-[15%] w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/10 rounded-full backdrop-blur-3xl border border-white/5 shadow-2xl animate-bounce" style={{ animationDuration: '9s' }} />

      {/* Centered Login Card */}
      <div className="w-full max-w-lg z-10 relative">
        <div className="text-center mb-10 relative z-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30 mb-6 relative">
            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping" style={{ animationDuration: '3s' }}></div>
            <ShieldCheck className="w-8 h-8 text-white relative z-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">TAVI CRM</h1>
          <p className="text-slate-400 text-lg">Quản lý Sales Thế Hệ Mới</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/10 relative overflow-hidden group">
          
          {/* Card Shine effect */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email làm việc</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
                  placeholder="admin@taviweb.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Mật khẩu</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group/btn relative flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:opacity-70 transition-all overflow-hidden shadow-lg shadow-indigo-600/30 mt-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Đăng nhập
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="pt-6 mt-6 border-t border-white/5">
              <div className="bg-indigo-500/5 rounded-xl p-4 border border-indigo-500/10 backdrop-blur-sm">
                <p className="text-xs font-semibold text-indigo-400/80 mb-3 uppercase tracking-wider text-center">Tài khoản trải nghiệm</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-slate-300 bg-slate-900/40 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 font-medium">Admin:</span>
                    <span className="font-mono text-indigo-300">admin@taviweb.com <span className="text-slate-500">/</span> admin123</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 bg-slate-900/40 p-2 rounded-lg border border-white/5">
                    <span className="text-slate-400 font-medium">Sale:</span>
                    <span className="font-mono text-indigo-300">sale@tavi.com <span className="text-slate-500">/</span> sale123</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
