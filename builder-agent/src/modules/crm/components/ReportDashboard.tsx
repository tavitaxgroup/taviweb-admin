import React, { useMemo, useEffect, useState } from 'react';
import { CRMDeal, CRMStage } from '../types';
import { CRMService } from '../api/crm.service';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReportDashboardProps {
  deals: CRMDeal[];
  stages: CRMStage[];
}

export default function ReportDashboard({ deals, stages }: ReportDashboardProps) {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<any[]>([]);

  useEffect(() => {
    if (user?.tenant_id) {
      loadKpis();
    }
  }, [user?.tenant_id]);

  const loadKpis = async () => {
    if (!user?.tenant_id) return;
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const fetchedKpis = await CRMService.getKpis(user.tenant_id, month, year);
      setKpis(fetchedKpis);
    } catch (error) {
      console.error('Failed to load KPIs', error);
    }
  };

  // Tính toán các chỉ số cơ bản
  const totalDeals = deals.length;
  const totalValue = deals.reduce((acc, deal) => acc + (deal.value || 0), 0);
  
  // Won Deals (Giả sử stage cuối cùng là Won, hoặc có chữ "Won"/"Chốt")
  const wonStages = stages.filter(s => s.name.toLowerCase().includes('won') || s.name.toLowerCase().includes('chốt'));
  const wonStageIds = wonStages.map(s => s.id);
  const wonDeals = deals.filter(d => wonStageIds.includes(d.stage_id));
  const wonValue = wonDeals.reduce((acc, deal) => acc + (deal.value || 0), 0);
  
  const winRate = totalDeals > 0 ? ((wonDeals.length / totalDeals) * 100).toFixed(1) : '0.0';

  // Dữ liệu cho Biểu đồ Phễu (Số lượng deal theo từng Stage)
  const funnelData = {
    labels: stages.map(s => s.name),
    datasets: [
      {
        label: 'Số lượng Khách',
        data: stages.map(stage => deals.filter(d => d.stage_id === stage.id).length),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue
          'rgba(139, 92, 246, 0.8)', // violet
          'rgba(236, 72, 153, 0.8)', // pink
          'rgba(245, 158, 11, 0.8)', // amber
          'rgba(16, 185, 129, 0.8)', // emerald
          'rgba(100, 116, 139, 0.8)' // slate
        ],
        borderRadius: 6,
      },
    ],
  };

  // Tính toán Bảng xếp hạng Sales (Leaderboard) kèm KPI
  const salesStats = useMemo(() => {
    const stats: Record<string, { name: string; totalDeals: number; wonDeals: number; totalValue: number; wonValue: number; targetRevenue: number }> = {};
    
    deals.forEach(deal => {
      if (deal.assignee) {
        const uid = deal.assignee.id;
        if (!stats[uid]) {
          stats[uid] = { name: deal.assignee.name, totalDeals: 0, wonDeals: 0, totalValue: 0, wonValue: 0, targetRevenue: 100000000 }; // Default 100M KPI
        }
        stats[uid].totalDeals += 1;
        stats[uid].totalValue += (deal.value || 0);
        
        if (wonStageIds.includes(deal.stage_id)) {
          stats[uid].wonDeals += 1;
          stats[uid].wonValue += (deal.value || 0);
        }
      }
    });

    // Merge KPI từ DB nếu có
    kpis.forEach(k => {
      if (stats[k.user_id]) {
        stats[k.user_id].targetRevenue = k.target_revenue;
      }
    });
    
    return Object.values(stats).sort((a, b) => b.wonValue - a.wonValue);
  }, [deals, wonStageIds, kpis]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Báo Cáo Hiệu Suất</h2>
          <p className="text-sm text-slate-500">Tổng quan tình hình kinh doanh của toàn đội ngũ</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-semibold text-slate-500 mb-2">Tổng Khách Hàng (Leads)</div>
          <div className="text-3xl font-extrabold text-slate-800">{totalDeals}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-semibold text-slate-500 mb-2">Tổng Doanh Thu Dự Kiến</div>
          <div className="text-3xl font-extrabold text-blue-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalValue)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500 rounded-bl-full opacity-10"></div>
          <div className="text-sm font-semibold text-slate-500 mb-2 relative z-10">Đã Chốt (Won)</div>
          <div className="text-3xl font-extrabold text-emerald-600 relative z-10">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(wonValue)}
          </div>
          <div className="text-xs font-bold text-emerald-500 mt-1 relative z-10">{wonDeals.length} hợp đồng</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-sm font-semibold text-slate-500 mb-2">Tỷ Lệ Chốt Thành Công</div>
          <div className="text-3xl font-extrabold text-indigo-600">{winRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ Phễu */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Phễu Bán Hàng (Sales Funnel)</h3>
          <div className="h-72">
            <Bar 
              data={funnelData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                  x: { grid: { display: false } }
                }
              }} 
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-amber-500">🏆</span> Bảng Xếp Hạng Sales & KPI
          </h3>
          <div className="flex flex-col gap-4">
            {salesStats.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-medium">Chưa có dữ liệu Sales</div>
            ) : (
              salesStats.map((stat, index) => {
                const progressPct = Math.min(100, Math.round((stat.wonValue / stat.targetRevenue) * 100)) || 0;
                return (
                  <div key={index} className="flex flex-col p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-slate-200 text-slate-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{stat.name}</div>
                          <div className="text-xs text-slate-500">{stat.wonDeals} / {stat.totalDeals} deal chốt</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-emerald-600">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stat.wonValue)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold text-slate-500">
                        <span>Tiến độ KPI (Mục tiêu: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stat.targetRevenue)})</span>
                        <span className={progressPct >= 100 ? 'text-emerald-600 font-bold' : ''}>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full ${progressPct >= 100 ? 'bg-emerald-500' : progressPct > 50 ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
