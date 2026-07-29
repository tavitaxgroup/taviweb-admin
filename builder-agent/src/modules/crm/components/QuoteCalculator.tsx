import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PRESETS = {
  domain: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'Tên miền Quốc tế (.com/.net) ~350k', value: 350000 },
    { label: 'Tên miền Việt Nam (.vn) ~750k', value: 750000 },
    { label: 'Tên miền Việt Nam (.com.vn) ~650k', value: 650000 },
  ],
  vps: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'Vietnix/TinoHost Cloud VPS Cơ bản ~150k', value: 150000 },
    { label: 'Vietnix/TinoHost Cloud VPS Pro ~350k', value: 350000 },
    { label: 'DigitalOcean Basic Droplet ~150k', value: 150000 },
    { label: 'AWS EC2 t3.micro / t4g.small ~250k', value: 250000 },
    { label: 'Vercel Pro (Frontend Hosting) ~500k', value: 500000 },
  ],
  db: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'Supabase Pro (Postgres Cloud) ~600k', value: 600000 },
    { label: 'Firebase Blaze (NoSQL) ~200k', value: 200000 },
    { label: 'Vercel Postgres (Serverless) ~500k', value: 500000 },
    { label: 'MongoDB Atlas (Dedicated) ~1tr500k', value: 1500000 },
    { label: 'Self-hosted (Chung VPS) ~0đ', value: 0 },
  ],
  storage: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'AWS S3 Cơ bản ~150k', value: 150000 },
    { label: 'Cloudflare R2 (Miễn phí Egress) ~50k', value: 50000 },
    { label: 'Google Cloud Storage ~150k', value: 150000 },
    { label: 'Không dùng Storage rời ~0đ', value: 0 },
  ],
  aiApi: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'Model 3.5 Flash (Quốc dân) ~1k/User', value: 1000 },
    { label: 'Gemini 2.0 Flash (Mới) ~1.5k/User', value: 1500 },
    { label: 'Gemini 2.0 Pro (Suy luận) ~12k/User', value: 12000 },
    { label: 'Claude 3.5 Haiku (Nhanh/Rẻ) ~2k/User', value: 2000 },
    { label: 'Claude 3.5 Sonnet (Code/Logic) ~25k/User', value: 25000 },
    { label: 'OpenAI GPT-4o-mini ~2.5k/User', value: 2500 },
    { label: 'OpenAI GPT-4.5 (Mới nhất) ~28k/User', value: 28000 },
    { label: 'Llama 3 (Qua Groq/Together) ~1k/User', value: 1000 },
    { label: 'Không dùng AI ~0đ', value: 0 },
  ],
  thirdParty: [
    { label: '-- Tự nhập tay --', value: '' },
    { label: 'Không dùng ~0đ', value: 0 },
    { label: 'Cơ bản (Chỉ chạy Email) ~500đ', value: 500 },
    { label: 'Tiêu chuẩn (Email + Zalo ZNS) ~2.5k', value: 2500 },
    { label: 'Cao cấp (Email + ZNS + SMS OTP) ~5k', value: 5000 },
  ]
};

const MODULES_LIST = [
  { id: 'landing', label: 'Website Cơ bản (Landing Page)', hours: 40 },
  { id: 'cms', label: 'Hệ thống Quản trị (CMS Admin)', hours: 40 },
  { id: 'payment', label: 'Tích hợp Thanh toán (VNPay/Momo)', hours: 24 },
  { id: 'lms', label: 'Hệ thống LMS (Khóa học/Học viên)', hours: 80 },
  { id: 'ecommerce', label: 'E-commerce (Giỏ hàng/Đơn hàng)', hours: 60 },
  { id: 'booking', label: 'Hệ thống Booking/Đặt lịch', hours: 48 },
  { id: 'ai_chatbot', label: 'Tích hợp Trợ lý AI (Chatbot/RAG)', hours: 40 },
  { id: 'i18n', label: 'Đa ngôn ngữ (I18n)', hours: 16 },
];

export default function QuoteCalculator() {
  // Input States - Hạ tầng cứng
  const [domainCost, setDomainCost] = useState(300000); // 1 năm
  const [vpsCost, setVpsCost] = useState(250000); // 1 tháng
  const [dbCost, setDbCost] = useState(0); // 1 tháng (VD Supabase Pro là 25$ ~ 600k)
  const [storageCost, setStorageCost] = useState(100000); // 1 tháng S3/R2

  // Input States - API & Dịch vụ ngoài (Biến phí)
  const [activeUsers, setActiveUsers] = useState(100);
  const [aiUsagePerUser, setAiUsagePerUser] = useState(5000); // 5k VND/user/tháng tiền API
  const [thirdPartyCostPerUser, setThirdPartyCostPerUser] = useState(2000); // 2k VND/user/tháng

  // Input States - Chức năng & Nhân sự
  const [selectedModules, setSelectedModules] = useState<string[]>(['landing', 'cms']);
  const [extraDevHours, setExtraDevHours] = useState(0); // Giờ bù thêm ngoài module
  
  const modulesDevHours = useMemo(() => {
    return selectedModules.reduce((sum, id) => {
      const mod = MODULES_LIST.find(m => m.id === id);
      return sum + (mod ? mod.hours : 0);
    }, 0);
  }, [selectedModules]);

  const devHours = modulesDevHours + extraDevHours;
  const [freeDevSetup, setFreeDevSetup] = useState(false); // Lấy công làm lời

  const [hourlyRate, setHourlyRate] = useState(200000);
  const [maintenanceRate, setMaintenanceRate] = useState(15); // % bảo trì hàng năm
  const [commissionRate, setCommissionRate] = useState(10); // % hoa hồng đối tác

  // Tỷ suất lợi nhuận kỳ vọng
  const [profitMargin, setProfitMargin] = useState(40); // 40% biên lợi nhuận

  // TÍNH TOÁN
  const calc = useMemo(() => {
    // 1. Chi phí duy trì mỗi tháng (OPEX)
    const monthlyInfra = vpsCost + dbCost + storageCost;
    const monthlyApi = activeUsers * (aiUsagePerUser + thirdPartyCostPerUser);
    const totalMonthlyCost = monthlyInfra + monthlyApi;
    const totalYearlyCost = (totalMonthlyCost * 12) + domainCost;

    // 2. Giá vốn phát triển 1 lần (Setup Cost)
    const setupCost = freeDevSetup ? 0 : devHours * hourlyRate;

    // 3. Tổng vốn năm đầu (Setup + Vận hành 1 năm)
    const totalFirstYearBaseCost = setupCost + totalYearlyCost;

    // 4. Giá bán đề xuất năm đầu (Dựa trên Margin mong muốn)
    // Giá Bán = Giá Vốn / (1 - Margin/100 - Commission/100)
    // Phải đảm bảo Margin + Commission < 100 để tránh số âm
    let markupFactor = 1 - (profitMargin / 100) - (commissionRate / 100);
    if (markupFactor <= 0.05) markupFactor = 0.05; // Giới hạn an toàn
    
    const suggestedPrice = totalFirstYearBaseCost / markupFactor;

    // 5. Các con số phát sinh
    const maintenanceFee = (suggestedPrice * maintenanceRate) / 100; // Tiền bảo trì năm sau
    const expectedProfit = suggestedPrice - totalFirstYearBaseCost - (suggestedPrice * commissionRate / 100);
    const partnerCommission = suggestedPrice * (commissionRate / 100);

    return {
      monthlyInfra,
      monthlyApi,
      totalMonthlyCost,
      totalYearlyCost,
      setupCost,
      totalFirstYearBaseCost,
      suggestedPrice,
      maintenanceFee,
      expectedProfit,
      partnerCommission
    };
  }, [domainCost, vpsCost, dbCost, storageCost, activeUsers, aiUsagePerUser, thirdPartyCostPerUser, devHours, hourlyRate, maintenanceRate, commissionRate, profitMargin]);

  const chartData = {
    labels: ['Lương Dev (Setup)', 'Hạ tầng năm 1', 'API/AI năm 1', 'Hoa hồng', 'Lợi nhuận'],
    datasets: [
      {
        data: [
          calc.setupCost,
          (calc.monthlyInfra * 12) + domainCost,
          calc.monthlyApi * 12,
          calc.partnerCommission,
          calc.expectedProfit
        ],
        backgroundColor: [
          '#64748b', // slate-500
          '#3b82f6', // blue-500
          '#f59e0b', // amber-500
          '#ec4899', // pink-500
          '#10b981', // emerald-500
        ],
        borderWidth: 0,
      },
    ],
  };

  const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  const selectPackage = (type: 'starter' | 'pro' | 'business' | 'enterprise') => {
    switch (type) {
      case 'starter':
        setDomainCost(0); setVpsCost(0); setDbCost(0); setStorageCost(0);
        setActiveUsers(10); setAiUsagePerUser(0); setThirdPartyCostPerUser(0);
        setSelectedModules(['landing']); setFreeDevSetup(true); setProfitMargin(90);
        break;
      case 'pro':
        setDomainCost(0); setVpsCost(150000); setDbCost(0); setStorageCost(0);
        setActiveUsers(50); setAiUsagePerUser(0); setThirdPartyCostPerUser(0);
        setSelectedModules(['landing', 'cms']); setFreeDevSetup(true); setProfitMargin(65);
        break;
      case 'business':
        setDomainCost(0); setVpsCost(350000); setDbCost(600000); setStorageCost(100000);
        setActiveUsers(200); setAiUsagePerUser(0); setThirdPartyCostPerUser(2500);
        setSelectedModules(['landing', 'cms', 'booking']); setFreeDevSetup(true); setProfitMargin(45);
        break;
      case 'enterprise':
        setDomainCost(0); setVpsCost(500000); setDbCost(600000); setStorageCost(150000);
        setActiveUsers(500); setAiUsagePerUser(5000); setThirdPartyCostPerUser(5000);
        setSelectedModules(['landing', 'cms', 'booking', 'lms', 'ai_chatbot']); setFreeDevSetup(false); setProfitMargin(40);
        break;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 custom-scrollbar animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800">Máy Tính Giá & Báo Giá Hệ Thống</h2>
          <p className="text-slate-500 mt-1">Công cụ nội bộ giúp bạn kiểm soát chi phí hạ tầng và tự động tính toán giá bán an toàn.</p>
        </div>
        
        {/* PACKAGE PRESETS UI */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Lựa Chọn Nhanh (Gói Sản Phẩm)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => selectPackage('starter')} className="text-left bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition group focus:outline-none">
              <div className="font-bold text-slate-800 group-hover:text-indigo-600">Gói Khởi Nghiệp</div>
              <div className="text-xs text-slate-500 mt-1">Miễn phí Setup (SaaS)</div>
            </button>
            <button onClick={() => selectPackage('pro')} className="text-left bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition group focus:outline-none">
              <div className="font-bold text-slate-800 group-hover:text-indigo-600">Gói Tiêu Chuẩn</div>
              <div className="text-xs text-slate-500 mt-1">Web & CMS (SaaS)</div>
            </button>
            <button onClick={() => selectPackage('business')} className="text-left bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition group focus:outline-none">
              <div className="font-bold text-slate-800 group-hover:text-indigo-600">Gói Nâng Cao</div>
              <div className="text-xs text-slate-500 mt-1">CRM + Booking (SaaS)</div>
            </button>
            <button onClick={() => selectPackage('enterprise')} className="text-left bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition group focus:outline-none">
              <div className="font-bold text-indigo-900 group-hover:text-indigo-600">Gói Cao Cấp (AI)</div>
              <div className="text-xs text-indigo-700/70 mt-1">Full + AI Agent (Bán đứt)</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT NHẬP LIỆU (INPUTS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box 1: Hạ tầng cứng */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>
                Chi phí Hạ tầng tĩnh (Server/DB)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Tên miền (VNĐ/Năm)</label>
                  <select 
                    className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                    onChange={e => e.target.value !== '' && setDomainCost(Number(e.target.value))}
                  >
                    {PRESETS.domain.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                  </select>
                  <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={domainCost} onChange={e => setDomainCost(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">VPS/Hosting (VNĐ/Tháng)</label>
                  <select 
                    className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                    onChange={e => e.target.value !== '' && setVpsCost(Number(e.target.value))}
                  >
                    {PRESETS.vps.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                  </select>
                  <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={vpsCost} onChange={e => setVpsCost(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Database Cloud (VNĐ/Tháng)</label>
                  <select 
                    className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                    onChange={e => e.target.value !== '' && setDbCost(Number(e.target.value))}
                  >
                    {PRESETS.db.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                  </select>
                  <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={dbCost} onChange={e => setDbCost(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Lưu trữ S3/Video (VNĐ/Tháng)</label>
                  <select 
                    className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                    onChange={e => e.target.value !== '' && setStorageCost(Number(e.target.value))}
                  >
                    {PRESETS.storage.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                  </select>
                  <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={storageCost} onChange={e => setStorageCost(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Box 2: API & AI */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Chi phí Biến đổi (API/Third-party theo User)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Quy mô User thường xuyên (MAU)</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="10" max="10000" step="50" className="flex-1 accent-indigo-600" value={activeUsers} onChange={e => setActiveUsers(Number(e.target.value))} />
                    <span className="font-bold text-indigo-700 w-24 text-right">{activeUsers} User</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Phí API AI (VNĐ/1 User/Tháng)</label>
                    <select 
                      className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                      onChange={e => e.target.value !== '' && setAiUsagePerUser(Number(e.target.value))}
                    >
                      {PRESETS.aiApi.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                    </select>
                    <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={aiUsagePerUser} onChange={e => setAiUsagePerUser(Number(e.target.value))} />
                    <p className="text-[10px] text-slate-400 mt-1">Ước tính token ChatGPT/Gemini API cho các tính năng AI.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Phí Dịch vụ ngoài (SMS/Email/Zalo) / User</label>
                    <select 
                      className="w-full bg-slate-100 border border-slate-200 rounded-t-lg px-2 py-1 text-xs text-slate-600 focus:outline-none focus:bg-white"
                      onChange={e => e.target.value !== '' && setThirdPartyCostPerUser(Number(e.target.value))}
                    >
                      {PRESETS.thirdParty.map(p => <option key={p.label} value={p.value}>{p.label}</option>)}
                    </select>
                    <input type="number" className="w-full bg-slate-50 border-x border-b border-slate-200 rounded-b-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={thirdPartyCostPerUser} onChange={e => setThirdPartyCostPerUser(Number(e.target.value))} />
                    <p className="text-[10px] text-slate-400 mt-1">Phí thông báo OTP, SMS, Email Marketing v.v.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Module Chức Năng */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  Tùy chọn Module Chức Năng
                </h3>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                  Tổng: {modulesDevHours} Giờ Dev
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MODULES_LIST.map(mod => {
                  const isSelected = selectedModules.includes(mod.id);
                  return (
                    <label key={mod.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${isSelected ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500" 
                        checked={isSelected}
                        onChange={() => {
                          setSelectedModules(prev => prev.includes(mod.id) ? prev.filter(id => id !== mod.id) : [...prev, mod.id]);
                        }}
                      />
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${isSelected ? 'text-purple-900' : 'text-slate-700'}`}>{mod.label}</div>
                        <div className="text-xs text-slate-500">Ước tính: {mod.hours}h</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Box 4: Nhân sự & Lợi nhuận */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Chi phí Nhân sự & Lợi nhuận
                </h3>
                <label className="flex items-center gap-2 cursor-pointer bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" checked={freeDevSetup} onChange={e => setFreeDevSetup(e.target.checked)} />
                  <span className="text-sm font-bold">🔥 Lấy công làm lời (Free Setup)</span>
                </label>
              </div>
              <div className={`grid grid-cols-2 gap-4 transition-opacity ${freeDevSetup ? 'opacity-40 pointer-events-none' : ''}`}>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Giờ Dev tùy chỉnh (+thêm)</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-500 sm:text-sm font-bold">
                      {modulesDevHours}h +
                    </span>
                    <input type="number" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500" value={extraDevHours} onChange={e => setExtraDevHours(Number(e.target.value))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Lương Dev (VNĐ/Giờ)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Hoa hồng đối tác Sale (%)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" value={commissionRate} onChange={e => setCommissionRate(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-600 mb-1">Biên lợi nhuận mong muốn (%)</label>
                  <input type="number" className="w-full bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-700" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} />
                </div>
              </div>
            </div>

          </div>

          {/* CỘT KẾT QUẢ (RESULTS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* THẺ GIÁ BÁN */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-slate-300 font-semibold mb-1 relative z-10">GIÁ BÁO KHÁCH (ĐỀ XUẤT)</h3>
              <div className="text-4xl font-black text-emerald-400 mb-4 relative z-10">{formatCurrency(calc.suggestedPrice)}</div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-white/10 relative z-10">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Lợi nhuận ròng (Net Profit)</span>
                  <span className="font-bold text-emerald-300">{formatCurrency(calc.expectedProfit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Cắt phế cho Sale ({commissionRate}%)</span>
                  <span className="font-bold text-pink-300">{formatCurrency(calc.partnerCommission)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Phí duy trì thu từ năm 2</span>
                  <span className="font-bold text-white">{formatCurrency(calc.maintenanceFee)}/năm</span>
                </div>
              </div>
            </div>

            {/* THẺ PHÂN TÍCH GIÁ VỐN */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">Chi phí Giá Vốn (Năm 1)</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-32 h-32 shrink-0">
                  <Doughnut data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                    <span className="text-slate-600 flex-1">Setup (Dev)</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calc.setupCost)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-600 flex-1">Server/DB</span>
                    <span className="font-semibold text-slate-800">{formatCurrency((calc.monthlyInfra * 12) + domainCost)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-slate-600 flex-1">API/AI</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(calc.monthlyApi * 12)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-4">
                <h4 className="font-bold text-amber-800 text-sm mb-2">Cảnh báo "Đốt tiền" hàng tháng:</h4>
                <div className="flex justify-between items-center text-amber-700">
                  <span className="text-sm">Tổng chi phí mỗi tháng:</span>
                  <span className="text-xl font-black">{formatCurrency(calc.totalMonthlyCost)}</span>
                </div>
                <p className="text-xs text-amber-600 mt-2 leading-relaxed">
                  Với {activeUsers} User, mỗi tháng bạn đang tốn <b>{formatCurrency(calc.monthlyInfra)}</b> cho Server và <b>{formatCurrency(calc.monthlyApi)}</b> cho AI/Dịch vụ ngoài. Nhớ chốt phương án thu phí duy trì sau năm đầu!
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
