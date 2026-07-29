import React, { useState, useEffect, useRef } from 'react';
import { CRMDeal } from '../types';

interface CommandPaletteProps {
  deals: CRMDeal[];
  onClose: () => void;
  onSelect: (deal: CRMDeal) => void;
}

export default function CommandPalette({ deals, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const filteredDeals = query.length > 0 ? deals.filter(deal => 
    deal.title?.toLowerCase().includes(query.toLowerCase()) || 
    deal.contact?.name?.toLowerCase().includes(query.toLowerCase()) ||
    deal.contact?.phone?.includes(query)
  ) : deals.slice(0, 10); // Show top 10 if empty

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-[15vh]">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="w-[600px] max-w-[90vw] bg-white rounded-xl shadow-2xl relative flex flex-col overflow-hidden animate-slide-in-down border border-slate-200">
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            ref={inputRef}
            className="flex-1 outline-none text-lg bg-transparent text-slate-800 placeholder-slate-400 font-medium"
            placeholder="Tìm Deal, Khách hàng, SĐT..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-block bg-slate-100 text-slate-400 px-2 py-1 rounded-md text-xs font-mono font-bold">ESC</kbd>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-slate-50 p-2">
          {filteredDeals.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filteredDeals.map(deal => (
                <button
                  key={deal.id}
                  onClick={() => onSelect(deal)}
                  className="flex items-center justify-between p-3 hover:bg-white hover:shadow-sm rounded-lg group transition-all text-left border border-transparent hover:border-slate-200"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{deal.title}</span>
                    <span className="text-xs text-slate-500">{deal.contact?.name || 'Chưa có tên khách'} • {deal.contact?.phone || 'Chưa có SĐT'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="font-mono">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <p>Không tìm thấy kết quả nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
