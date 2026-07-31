'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function ChatbotWidget({ tenantId }: { tenantId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, append, status, error } = useChat({
    api: '/api/chat',
    body: { tenantId },
    onError: (err: any) => {
      console.error('Chat error:', err);
      alert('Có lỗi khi gửi tin nhắn: ' + (err.message || 'Unknown error'));
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Nút bong bóng khi thu nhỏ
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-110 transition-transform z-50 animate-bounce-short"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  // Khung Chat khi mở ra
  return (
    <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200 animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
            <Bot className="w-6 h-6" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-indigo-700 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-sm">Trợ Lý TaviWeb</h3>
            <p className="text-[11px] text-indigo-100 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Sẵn sàng tư vấn ngay
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Box */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 custom-scrollbar">
        {/* Lời chào mặc định (chưa lưu vào DB nên fix cứng tạm) */}
        {messages.length === 0 && (
          <div className="flex gap-2 w-full">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm max-w-[85%]">
              Xin chào! Tôi là Trợ lý AI của TaviWeb. Tôi có thể giúp gì cho bạn hôm nay?
            </div>
          </div>
        )}

        {messages.map((m: any) => (
          <div key={m.id} className={`flex gap-2 w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
            )}
            
            <div className={`p-3 rounded-2xl text-sm shadow-sm max-w-[85%] whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {/* @ai-sdk/react v4 uses parts instead of content */}
              {m.parts ? m.parts.map((part: any, i: number) => (
                part.type === 'text' ? <span key={i}>{part.text}</span> : null
              )) : (m.content || '')}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-slate-500" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-2 w-full">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-3 text-sm text-rose-500 bg-rose-50 rounded-xl border border-rose-100">
            Trợ lý đang bảo trì hoặc tài khoản của bạn đã hết Hạn Mức Token. Vui lòng liên hệ Hotline!
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-100 shrink-0">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (!localInput.trim()) return;
            append({ role: 'user', content: localInput });
            setLocalInput('');
          }} 
          className="relative flex items-center"
        >
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            maxLength={500}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button 
            type="submit" 
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-slate-400 font-medium">Powered by TaviWeb AI</span>
        </div>
      </div>
    </div>
  );
}
