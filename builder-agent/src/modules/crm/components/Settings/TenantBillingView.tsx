import React, { useState } from 'react';
import { CreditCard, Zap, Clock, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TenantBillingView() {
  // Fake state for demo
  const [tokenBalance] = useState(150000);
  const [monthlyQuota] = useState(1000000);
  const [planName] = useState('Gói Nâng Cao (Business)');
  const [status] = useState<'active' | 'expiring' | 'suspended'>('active');
  const [expiryDate] = useState('2026-08-30');

  const usagePercent = Math.min(100, Math.max(0, ((monthlyQuota - tokenBalance) / monthlyQuota) * 100));
  
  // Progress bar color logic
  let progressColor = 'bg-indigo-500';
  if (usagePercent > 80) progressColor = 'bg-amber-500';
  if (usagePercent > 95) progressColor = 'bg-rose-500';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản Lý Gói & Hạn Mức AI</h2>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi lượng Token (chữ) đã sử dụng của Trợ lý AI và thanh toán gia hạn.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center shadow-sm">
          <CreditCard className="w-4 h-4 mr-2" />
          Nạp Thêm Token
        </button>
      </div>

      {/* Subscription Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100/50 -z-10" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Plan Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{planName}</h3>
                <div className="flex items-center text-sm mt-1">
                  {status === 'active' && (
                    <span className="flex items-center text-emerald-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Đang hoạt động
                    </span>
                  )}
                  {status === 'expiring' && (
                    <span className="flex items-center text-amber-600 font-medium">
                      <AlertTriangle className="w-4 h-4 mr-1" /> Sắp hết hạn
                    </span>
                  )}
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="text-slate-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Hết hạn: <strong className="ml-1 text-slate-700">{expiryDate}</strong>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">Token đã dùng tháng này</span>
                <span className="font-bold text-slate-800">
                  {new Intl.NumberFormat('vi-VN').format(monthlyQuota - tokenBalance)} / {new Intl.NumberFormat('vi-VN').format(monthlyQuota)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${progressColor} rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              
              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Khởi tạo lại vào ngày 1 hàng tháng</span>
                <span>Còn lại: <strong className={usagePercent > 90 ? 'text-rose-600' : 'text-emerald-600'}>{new Intl.NumberFormat('vi-VN').format(tokenBalance)} Token</strong></span>
              </div>
            </div>
          </div>

          {/* Upsell / Actions */}
          <div className="lg:w-1/3 bg-slate-50 rounded-lg p-5 border border-slate-100 flex flex-col justify-center">
            <h4 className="font-bold text-slate-800 mb-2">Chưa đủ Token?</h4>
            <p className="text-sm text-slate-600 mb-4">
              Nâng cấp lên Gói Doanh Nghiệp (Enterprise) để nhận 10.000.000 Token/tháng và các tính năng AI đặc quyền.
            </p>
            <button className="w-full py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition flex items-center justify-center group">
              Xem Các Gói Cước
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Transaction History (Mock) */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Lịch sử thanh toán</h3>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-medium">
              <tr>
                <th className="px-4 py-3">Mã GD</th>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Nội dung</th>
                <th className="px-4 py-3">Số tiền</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs">TXN-001</td>
                <td className="px-4 py-3">01/07/2026</td>
                <td className="px-4 py-3">Gia hạn Gói Nâng Cao</td>
                <td className="px-4 py-3 font-medium text-slate-800">1.490.000 đ</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Thành công</span></td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs">TXN-002</td>
                <td className="px-4 py-3">15/07/2026</td>
                <td className="px-4 py-3">Mua thêm 500,000 Token</td>
                <td className="px-4 py-3 font-medium text-slate-800">200.000 đ</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">Thành công</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
