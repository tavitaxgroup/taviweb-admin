import React, { useState } from 'react';
import { Bot, Save, Sparkles, MessageSquare } from 'lucide-react';

export default function AIChatbotSettings() {
  const [botName, setBotName] = useState('Trợ lý TaviWeb');
  const [greeting, setGreeting] = useState('Xin chào! Tôi có thể giúp gì cho bạn hôm nay?');
  const [systemPrompt, setSystemPrompt] = useState('Bạn là nhân viên tư vấn khách hàng. Hãy trả lời ngắn gọn, lịch sự và luôn cố gắng xin số điện thoại của khách để tư vấn viên gọi lại.');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // alert('Lưu cấu hình thành công!');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cấu Hình Trợ Lý AI</h2>
          <p className="text-sm text-slate-500 mt-1">
            Thiết lập tính cách và kịch bản tư vấn cho Chatbot trên website của bạn.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center shadow-sm disabled:opacity-70"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saving ? 'Đang lưu...' : 'Lưu Cấu Hình'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                <Bot className="w-4 h-4 mr-1 text-slate-400" />
                Tên hiển thị của Chatbot
              </label>
              <input 
                type="text" 
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="VD: Trợ lý Tâm An"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1 text-slate-400" />
                Lời chào mở đầu
              </label>
              <input 
                type="text" 
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Câu nói đầu tiên khi khách mở khung chat..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-indigo-500" />
                Kịch bản mồi (System Prompt)
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Hướng dẫn cho AI biết nó đóng vai trò gì, cách nói chuyện ra sao, mục tiêu cuối cùng là gì.
              </p>
              <textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition custom-scrollbar"
                placeholder="Bạn là nhân viên tư vấn..."
              />
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex items-start gap-3 text-sm text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <strong>Lưu ý bảo mật:</strong> Hệ thống đã tự động bảo vệ dữ liệu nội bộ. Trợ lý AI sẽ không bao giờ tiết lộ các thông tin này ra bên ngoài dù bị khách hàng "Hỏi xoáy".
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="md:col-span-1">
          <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 sticky top-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Xem trước (Preview)</h3>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[400px]">
              {/* Chat Header */}
              <div className="bg-indigo-600 p-3 flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">{botName}</div>
                  <div className="text-[10px] text-indigo-200 flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></span> Đang hoạt động
                  </div>
                </div>
              </div>
              
              {/* Chat Body */}
              <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-indigo-600" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 text-sm text-slate-700 shadow-sm">
                    {greeting}
                  </div>
                </div>
              </div>
              
              {/* Chat Input (Fake) */}
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">
                  Nhập tin nhắn...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertTriangle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
