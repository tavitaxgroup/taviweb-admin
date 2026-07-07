'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SalesStatusSelect({ leadId, initialStatus }: { leadId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus || 'chưa sale');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await supabase
        .from('leads')
        .update({ sales_status: newStatus })
        .eq('id', leadId);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select 
      value={status} 
      onChange={handleChange}
      disabled={loading}
      className={`text-xs font-bold px-2 py-1 border rounded-md shadow-sm outline-none transition-colors cursor-pointer 
        ${status === 'chưa sale' ? 'bg-slate-50 text-slate-600 border-slate-200' : 
          status === 'đang liên hệ' ? 'bg-amber-50 text-amber-600 border-amber-200' :
          status === 'đã chốt' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
          'bg-rose-50 text-rose-600 border-rose-200'
        }`}
    >
      <option value="chưa sale">Chưa Sale</option>
      <option value="đang liên hệ">Đang liên hệ</option>
      <option value="đã chốt">Đã chốt</option>
      <option value="fail">Fail</option>
    </select>
  );
}
