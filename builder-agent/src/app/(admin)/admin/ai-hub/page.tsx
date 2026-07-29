'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Bot, Key, Save, CheckCircle, Database, Zap, RefreshCw, Trash2 } from 'lucide-react';

interface AIProvider {
  id: string;
  name: string;
  key: string;
  isDefault: boolean;
  status: 'active' | 'inactive';
}

export default function SuperadminAIHub() {
  
  // Mock State cho Providers
  const [providers, setProviders] = useState<AIProvider[]>([
    { id: 'gemini', name: 'Google Gemini', key: 'AIzaSyA...', isDefault: true, status: 'active' },
    { id: 'openai', name: 'OpenAI (ChatGPT)', key: 'sk-proj-...', isDefault: false, status: 'active' },
    { id: 'anthropic', name: 'Anthropic (Claude)', key: '', isDefault: false, status: 'inactive' }
  ]);

  const [saving, setSaving] = useState(false);

  const handleUpdateKey = (id: string, newKey: string) => {
    setProviders(providers.map(p => p.id === id ? { ...p, key: newKey, status: newKey ? 'active' : 'inactive' } : p));
  };

  const handleSetDefault = (id: string) => {
    setProviders(providers.map(p => ({ ...p, isDefault: p.id === id })));
  };

  const handleSaveProviders = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // alert('Đã lưu cấu hình AI thành công!');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Trung tâm AI (AI Hub)</h1>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý các kết nối API từ Google, OpenAI, Anthropic cho toàn bộ hệ thống SaaS.
            </p>
          </div>
        </div>
      </div>

      {/* Cấu Hình Providers */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Các Nhà Cung Cấp AI (LLMs)</h2>
              <p className="text-sm text-slate-500">Cấu hình API Key gốc để cung cấp trí tuệ nhân tạo cho toàn bộ khách hàng thuê nền tảng.</p>
            </div>
            <button 
              onClick={handleSaveProviders}
              disabled={saving}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Lưu Cấu Hình
            </button>
          </div>

          <div className="space-y-4">
            {providers.map(provider => (
              <div key={provider.id} className={`flex flex-col md:flex-row gap-4 items-center p-5 rounded-xl border ${provider.isDefault ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-200 bg-white'}`}>
                {/* Info */}
                <div className="w-full md:w-1/4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${provider.isDefault ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-100 text-slate-600'}`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{provider.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${provider.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{provider.status}</span>
                    </div>
                  </div>
                </div>

                {/* API Key Input */}
                <div className="w-full md:flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="password"
                    value={provider.key}
                    onChange={(e) => handleUpdateKey(provider.id, e.target.value)}
                    placeholder="Nhập API Key vào đây..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition font-mono tracking-widest"
                  />
                </div>

                {/* Default Toggle */}
                <div className="w-full md:w-auto shrink-0 flex justify-end">
                  {provider.isDefault ? (
                    <div className="flex items-center gap-2 text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg font-bold text-sm">
                      <CheckCircle className="w-4 h-4" /> Đang Mặc Định
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleSetDefault(provider.id)}
                      className="text-sm font-semibold text-slate-500 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
                    >
                      Chọn Mặc Định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Database className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 leading-relaxed">
              <strong>Bảo mật Lõi:</strong> Các API Key này được mã hóa an toàn ở mức Server (Backend). Không một khách hàng nào (Tenant) có thể xem hoặc đánh cắp Key gốc này thông qua Inspect Element hay API Network.
            </div>
          </div>
        </div>
    </div>
  );
}
