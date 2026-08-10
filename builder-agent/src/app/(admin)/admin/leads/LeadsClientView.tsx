'use client';

import React, { useState } from 'react';
import LeadsTable from './LeadsTable';
import DashboardStats from './DashboardStats';
import { BarChart3, Users } from 'lucide-react';

export default function LeadsClientView({ leads, isSuperAdmin, salesUsers }: { leads: any[], isSuperAdmin?: boolean, salesUsers?: any[] }) {
  const [activeTab, setActiveTab] = useState<'stats' | 'list'>('stats');

  return (
    <div>
      <div className="flex border-b border-slate-200 mb-6 gap-8">
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-4 flex items-center gap-2 font-bold text-lg transition-colors ${
            activeTab === 'stats'
              ? 'border-b-4 border-blue-600 text-blue-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BarChart3 className="w-5 h-5" /> Thống Kê Tổng Quan
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-4 flex items-center gap-2 font-bold text-lg transition-colors ${
            activeTab === 'list'
              ? 'border-b-4 border-blue-600 text-blue-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-5 h-5" /> Danh Sách Data
        </button>
      </div>

      <div>
        {activeTab === 'stats' && <DashboardStats leads={leads} />}
        {activeTab === 'list' && <LeadsTable initialLeads={leads} isSuperAdmin={isSuperAdmin} salesUsers={salesUsers} />}
      </div>
    </div>
  );
}
