'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SalesAssignSelect({ leadId, initialAssignee, salesUsers }: { leadId: string, initialAssignee: string | null, salesUsers: any[] }) {
  const [assignedTo, setAssignedTo] = useState(initialAssignee || '');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setAssignedTo(newVal);
    setLoading(true);

    try {
      await supabase
        .from('leads')
        .update({ assigned_to: newVal || null })
        .eq('id', leadId);
    } catch (error) {
      console.error('Error assigning lead:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select 
      value={assignedTo} 
      onChange={handleChange}
      disabled={loading}
      className="text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-md shadow-sm outline-none transition-colors bg-white text-slate-700 hover:border-slate-300 w-full"
    >
      <option value="">-- Chọn Sale --</option>
      {salesUsers.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  );
}
