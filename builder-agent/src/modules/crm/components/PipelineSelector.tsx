import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, FolderKanban, Check } from 'lucide-react';

interface PipelineSelectorProps {
  pipelines: { id: string; name: string }[];
  activeId: string | null;
  onChange: (id: string) => void;
  className?: string;
}

export default function PipelineSelector({ pipelines, activeId, onChange, className = '' }: PipelineSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activePipeline = pipelines.find(p => p.id === activeId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (pipelines.length === 0) return null;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl shadow-sm hover:shadow transition-all group w-full sm:w-64"
      >
        <div className="w-6 h-6 rounded-md bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
          <FolderKanban className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="flex-1 text-left truncate">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Quy trình hiện tại</div>
          <div className="text-sm font-bold text-slate-800 truncate leading-none">
            {activePipeline?.name || 'Chọn quy trình'}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[250px] bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {pipelines.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  onChange(p.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  activeId === p.id 
                    ? 'bg-indigo-50 text-indigo-700 font-bold' 
                    : 'text-slate-600 font-medium hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-4">{p.name}</span>
                {activeId === p.id && <Check className="w-4 h-4 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
