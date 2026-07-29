"use client";

import { useAuth } from '@/modules/crm/contexts/AuthContext';
import { UserCircle, Mail, Key, Shield, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountSettingsPage() {
  const { user } = useAuth();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy save for now
    toast.success('Đã cập nhật thông tin thành công!');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Thông tin Cá nhân</h1>
        <p className="text-slate-500 mt-2 font-medium">Quản lý hồ sơ, địa chỉ email và bảo mật tài khoản của bạn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-extrabold text-4xl mx-auto mb-4 border-4 border-white shadow-lg">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500 mb-4">{user.email}</p>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
              <Shield className="w-3 h-3" /> {user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
            </span>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-indigo-500" />
              Chỉnh sửa Hồ sơ
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Họ và Tên</label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email liên hệ</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed rounded-xl pl-10 pr-4 py-2.5 outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1 font-medium">Email dùng để đăng nhập không thể thay đổi.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Số điện thoại</label>
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </div>
          </form>

          {/* Security Box */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-500" />
              Bảo mật tài khoản
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Mật khẩu đăng nhập</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Cập nhật lần cuối: 3 tháng trước</p>
              </div>
              <button className="bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm">
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
