import React, { useState, useEffect } from 'react';
import { CRMService } from '../api/crm.service';
import { useAuth } from '../contexts/AuthContext';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

type Package = {
  id: string;
  name: string;
  tier: number;
  price_prod: number;
  price_test: number;
  added_quota: number;
  features: string[];
  is_recommended: boolean;
};

export default function AdminPanel() {

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'kpis' | 'integrations' | 'quota'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [quotaInfo, setQuotaInfo] = useState<{used: number, total: number, packageName: string, expiresAt?: string | null} | null>(null);
  const [originUrl, setOriginUrl] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [checkoutPackage, setCheckoutPackage] = useState<{name: string, price: string, amount: number, transactionId?: string, transactionCode?: string} | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isCreatingTx, setIsCreatingTx] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [duration, setDuration] = useState<number>(1);

  useEffect(() => {
    setOriginUrl(window.location.origin);
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    if (activeTab === 'users') {
       try {
         const u = await CRMService.getUsers(user.tenant_id);
         setUsers(u);
       } catch (e) {
         console.error(e);
       }
    } else if (activeTab === 'products') {
       try {
         const p = await CRMService.getProducts(user.tenant_id);
         setProducts(p);
       } catch (e) {
         console.error(e);
       }
    } else if (activeTab === 'quota') {
       fetchQuotaInfo();
    }
  };

  const fetchQuotaInfo = async () => {
    if (!user?.tenant_id) return;
    try {
      const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.from('tenants').select('ai_quota, ai_used, package_name, package_expires_at').eq('id', user.tenant_id).single();
         if (data && !error) {
           const total = data.ai_quota || 50000;
           setQuotaInfo({ 
             total, 
             used: data.ai_used || 0,
             packageName: data.package_name || 'Gói Cơ Bản',
             expiresAt: data.package_expires_at || null
           });
         } else {
           // Fallback Mock Data
           setQuotaInfo({
             total: 50000,
             used: Math.floor(Math.random() * 45000) + 1000,
             packageName: 'Gói Tiêu Chuẩn'
           });
         }
       } catch (e) {
         console.error(e);
         setQuotaInfo({
           total: 50000,
           used: 24500,
           packageName: 'Gói Tiêu Chuẩn'
         });
       }
  };

  useEffect(() => {
    if (user?.tenant_id) {
      fetchQuotaInfo();
    }
  }, [user?.tenant_id]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.from('packages').select('*').order('tier');
        if (data && !error) {
          setPackages(data);
        }
      } catch (e) {
        console.error('Error fetching packages', e);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutPackage?.transactionId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/checkout/status?id=${checkoutPackage.transactionId}`);
          const data = await res.json();
          if (data.status === 'SUCCESS') {
            clearInterval(interval);
            setIsProcessingPayment(false);
            setPaymentSuccess(true);
            toast.success(`Giao dịch đối soát thành công! Tài khoản đã được nâng cấp lên ${checkoutPackage.name}.`);
            fetchQuotaInfo();
            loadData();
            
            // Tự động đóng modal sau 3 giây
            setTimeout(() => {
              setCheckoutPackage(null);
              setShowUpgradeModal(false);
              setPaymentSuccess(false);
            }, 3000);
          }
        } catch (e) {
          console.error(e);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [checkoutPackage]);

  const handleUpgrade = async (name: string, price: number) => {
    if (!user?.tenant_id) return;
    setIsCreatingTx(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tenant_id: user.tenant_id, 
          amount: price, 
          package_name: name,
          duration: duration 
        })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutPackage({
          name, price: `${(price / 1000).toLocaleString('vi-VN')}K`, amount: price,
          transactionId: data.transaction.id,
          transactionCode: data.transaction.transaction_code
        });
      } else {
        alert('Lỗi tạo giao dịch. Vui lòng thử lại sau.');
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối. Vui lòng thử lại sau.');
    }
    setIsCreatingTx(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Admin Panel</h2>
        <p className="text-sm text-slate-500">Quản lý nhân viên, bảng giá sản phẩm và kết nối hệ thống</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('users')} 
          className={`pb-3 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          👤 Quản lý Nhân sự
        </button>
        <button 
          onClick={() => setActiveTab('products')} 
          className={`pb-3 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'products' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          📦 Bảng Giá Dịch Vụ
        </button>
        <button 
          onClick={() => setActiveTab('kpis')} 
          className={`pb-3 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'kpis' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          🎯 Giao Chỉ Tiêu (KPI)
        </button>
        <button 
          onClick={() => setActiveTab('integrations')} 
          className={`pb-3 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'integrations' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          🔌 Tích Hợp (Webhook)
        </button>
        <button 
          onClick={() => setActiveTab('quota')} 
          className={`pb-3 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'quota' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          🤖 Gói AI & Token
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        {activeTab === 'users' && (
          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Danh sách Tài khoản</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  + Thêm Nhân Viên
                </button>
             </div>
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                   <th className="p-3 border-b border-slate-200">Tên</th>
                   <th className="p-3 border-b border-slate-200">Email</th>
                   <th className="p-3 border-b border-slate-200">Phân quyền</th>
                   <th className="p-3 border-b border-slate-200 text-right">Thao tác</th>
                 </tr>
               </thead>
               <tbody>
                 {users.map(u => (
                   <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50">
                     <td className="p-3 font-semibold text-slate-800">{u.name}</td>
                     <td className="p-3 text-slate-600">{u.email}</td>
                     <td className="p-3">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                         {u.role.toUpperCase()}
                       </span>
                     </td>
                     <td className="p-3 text-right">
                       <button className="text-indigo-600 text-xs font-bold mr-2 hover:underline">Sửa</button>
                       {u.role !== 'admin' && <button className="text-red-600 text-xs font-bold hover:underline">Khóa</button>}
                     </td>
                   </tr>
                 ))}
                 {users.length === 0 && (
                   <tr>
                     <td colSpan={4} className="p-6 text-center text-slate-500">Đang tải danh sách nhân sự...</td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Gói Dịch Vụ Mẫu</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  + Thêm Gói Mới
                </button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.id} className="border border-slate-200 p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-indigo-700">{p.name}</h4>
                       <span className="font-extrabold text-emerald-600">{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(p.price)}</span>
                    </div>
                    <p className="text-xs text-slate-500">{p.description}</p>
                    <div className="mt-3 flex gap-2">
                       <button className="text-xs bg-slate-100 px-3 py-1.5 rounded font-semibold hover:bg-slate-200">Sửa</button>
                       <button className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded font-semibold hover:bg-red-100">Xóa</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="text-center py-10">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Giao Chỉ Tiêu Tháng Này</h3>
            <p className="text-slate-500 mb-6">Tính năng kéo thả KPI cho từng nhân viên đang được cập nhật.</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold">
              Kích hoạt tính năng
            </button>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div>
             <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">Kết nối Inbound Leads (Webhook)</h3>
                <p className="text-sm text-slate-500">Sử dụng đường dẫn Webhook này để tự động nhận Khách hàng (Leads) từ Facebook Ads, LadiPage, Zalo, hoặc Zapier.</p>
             </div>
             
             <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL Webhook của bạn (Bảo mật)</label>
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     readOnly
                     value={`${originUrl}/api/webhook/leads?tenant=${user?.tenant_id || ''}`}
                     className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-700 outline-none"
                   />
                   <button 
                     onClick={() => {
                        navigator.clipboard.writeText(`${originUrl}/api/webhook/leads?tenant=${user?.tenant_id || ''}`);
                        alert('Đã copy!');
                     }}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                   >
                     Copy
                   </button>
                </div>
                <p className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1">
                   ⚠️ Không chia sẻ đường dẫn này công khai vì nó cấp quyền tạo Deal trực tiếp vào hệ thống của bạn.
                </p>
             </div>

             <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
               <h4 className="font-bold text-sm mb-3">Hướng dẫn gửi dữ liệu (POST Request)</h4>
               <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "name": "Nguyễn Văn A",
  "phone": "0987654321",
  "email": "nguyenvana@gmail.com",
  "source": "LadiPage Khuyến Mãi",
  "tinh_trang_rang": "Mẻ răng cửa", 
  "ngay_dat_hen": "2023-10-15"
}`}
               </pre>
               <p className="text-sm text-slate-600 mt-3">
                 Các trường <code className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">name</code>, <code className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">phone</code>, <code className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">email</code>, <code className="font-bold text-indigo-600 bg-indigo-50 px-1 rounded">source</code> là thông tin cơ bản. <br/>
                 Bất kỳ trường dữ liệu nào khác bạn gửi thêm (như ví dụ trên là <i>tinh_trang_rang</i>) sẽ được tự động lưu vào <b>Custom Fields</b> của Deal.
               </p>
             </div>
          </div>
        )}

        {activeTab === 'quota' && (
          <div>
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-1">Quản lý Hạn mức AI (Token)</h3>
              <p className="text-slate-500 text-sm">Kiểm tra lượng Token bạn đã sử dụng cho các tính năng Trợ lý AI và Chatbot tự động.</p>
            </div>
            
            {quotaInfo ? (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative overflow-hidden">
                {(() => {
                  if (quotaInfo.expiresAt) {
                    const daysLeft = Math.ceil((new Date(quotaInfo.expiresAt).getTime() - Date.now()) / (1000 * 3600 * 24));
                    if (daysLeft <= 0) {
                      return (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 shadow-sm">
                          <span className="text-xl">⚠️</span>
                          <div>
                            <p className="font-bold">Gói dịch vụ đã hết hạn!</p>
                            <p className="text-sm mt-0.5">Vui lòng gia hạn ngay để tiếp tục sử dụng các tính năng tự động hóa và AI.</p>
                          </div>
                        </div>
                      );
                    } else if (daysLeft <= 7) {
                      return (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 shadow-sm">
                          <span className="text-xl">⏳</span>
                          <div>
                            <p className="font-bold">Gói dịch vụ sắp hết hạn trong {daysLeft} ngày tới</p>
                            <p className="text-sm mt-0.5">Hạn cuối: {new Date(quotaInfo.expiresAt).toLocaleDateString('vi-VN')}. Hãy gia hạn sớm để không bị gián đoạn dịch vụ.</p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-lg mb-6 flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">✅</span>
                            <span className="text-sm font-bold">Gói dịch vụ đang hoạt động tốt</span>
                          </div>
                          <span className="text-xs font-bold bg-emerald-100 px-2 py-1 rounded">
                            Hạn sử dụng: {new Date(quotaInfo.expiresAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}

                <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4 relative z-10">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Gói hiện tại của bạn</p>
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
                      <span className="text-xl">🚀</span>
                      <span className="font-bold text-indigo-700 uppercase tracking-wide">{quotaInfo.packageName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">Tình trạng Token</p>
                    <span className={`text-lg font-bold ${(quotaInfo.used / quotaInfo.total) > 0.9 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {Math.min(100, Math.round((quotaInfo.used / quotaInfo.total) * 100))}% Đã dùng
                    </span>
                  </div>
                </div>
                
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden mb-4 shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      (quotaInfo.used / quotaInfo.total) > 0.9 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((quotaInfo.used / quotaInfo.total) * 100))}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm font-mono mt-4">
                  <div>
                    <p className="text-slate-500 mb-1">Đã sử dụng:</p>
                    <p className="font-bold text-rose-600 text-lg">{quotaInfo.used.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 mb-1">Tổng hạn mức:</p>
                    <p className="font-bold text-slate-800 text-lg">{quotaInfo.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all text-sm"
                  >
                    🚀 Nâng cấp Gói ngay
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-sm">Đang tải thông tin...</div>
            )}
          </div>
        )}
      </div>

      {/* MODAL BẢNG GIÁ NÂNG CẤP */}
       {showUpgradeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUpgradeModal(false)}
          >
            <div 
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
               onClick={() => setShowUpgradeModal(false)}
                className="sticky top-4 float-right right-4 text-slate-400 hover:text-slate-700 font-bold text-3xl px-4 z-50"
              >
                &times;
              </button>
            <div className="p-8 text-center border-b border-slate-100 relative">
              <h2 className="text-2xl font-black text-slate-800">Chọn Gói Phù Hợp Với Doanh Nghiệp Bạn</h2>
              <p className="text-slate-500 mt-2">Nâng cấp để nhận thêm Hạn mức AI Token và hàng loạt tính năng tự động hóa mạnh mẽ.</p>
              
              <div className="absolute top-8 right-8 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="testMode" 
                    checked={isTestMode} 
                    onChange={(e) => setIsTestMode(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="testMode" className="text-sm font-bold text-slate-600 cursor-pointer select-none">Môi trường Test (Giá ảo)</label>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 mb-[-10px] relative z-10">
                <div className="inline-flex bg-slate-200/50 p-1 rounded-xl shadow-inner">
                  <button onClick={() => setDuration(1)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${duration === 1 ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>1 Tháng</button>
                  <button onClick={() => setDuration(6)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${duration === 6 ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>6 Tháng <span className="text-xs text-rose-500 ml-1">-10%</span></button>
                  <button onClick={() => setDuration(12)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${duration === 12 ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>1 Năm <span className="text-xs text-rose-500 ml-1">-20%</span></button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50">
                {(() => {
                  let currentTier = 0;
                  const pName = (quotaInfo?.packageName || '').toLowerCase().trim();
                  if (pName.includes('cơ bản') || pName.includes('c bn') || pName.includes('cơ b')) currentTier = 1;
                  else if (pName.includes('tiêu chuẩn') || pName.includes('tiAu') || pName.includes('tiêu')) currentTier = 2;
                  else if (pName.includes('nâng cao') || pName.includes('nang') || pName.includes('nâng')) currentTier = 3;
                  else if (pName.includes('enterprise')) currentTier = 4;
                  
                  return (
                    <>
                    {packages.length === 0 ? (
                      <div className="col-span-1 md:col-span-4 text-center py-8 text-slate-500">Đang tải danh sách gói...</div>
                    ) : packages.map((pkg) => {
                      const basePrice = isTestMode ? pkg.price_test : pkg.price_prod;
                      let multiplier = 1;
                      if (duration === 6) multiplier = 6 * 0.9;
                      if (duration === 12) multiplier = 12 * 0.8;
                      const finalPrice = basePrice * multiplier;
                      const priceFormatted = (finalPrice / 1000).toLocaleString('vi-VN') + 'K';
                      
                      let containerClass = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col";
                      let titleClass = "font-bold text-slate-700 text-lg";
                      let priceClass = "text-2xl font-black text-indigo-600 my-4";
                      let featureListClass = "text-sm text-slate-600 space-y-3 mb-6 flex-1";
                      let buttonClass = `w-full font-bold py-2 rounded-lg transition-colors bg-slate-100 hover:bg-slate-200 text-slate-700`;
                      
                      if (pkg.is_recommended) {
                        containerClass = "bg-indigo-600 p-6 rounded-xl border border-indigo-700 shadow-lg text-white flex flex-col relative transform md:-translate-y-4";
                        titleClass = "font-bold text-indigo-100 text-lg";
                        priceClass = "text-2xl font-black text-white my-4";
                        featureListClass = "text-sm text-indigo-100 space-y-3 mb-6 flex-1";
                        buttonClass = `w-full font-bold py-2 rounded-lg transition-colors bg-white hover:bg-indigo-50 text-indigo-700`;
                      } else if (pkg.tier === 4) {
                        containerClass = "bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm text-white flex flex-col";
                        titleClass = "font-bold text-slate-300 text-lg";
                        priceClass = "text-2xl font-black text-white my-4";
                        featureListClass = "text-sm text-slate-400 space-y-3 mb-6 flex-1";
                        buttonClass = `w-full font-bold py-2 rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-500 text-white`;
                      }

                      let buttonText = 'Đăng ký ngay';
                      if (currentTier === pkg.tier) buttonText = 'Gia hạn gói';
                      else if (currentTier > pkg.tier) buttonText = 'Hạ cấp';
                      else buttonText = 'Nâng cấp ngay';

                      return (
                        <div key={pkg.id} className={containerClass}>
                          {pkg.is_recommended && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">ĐỀ XUẤT</div>}
                          <h3 className={titleClass}>{pkg.name}</h3>
                          <p className={priceClass}>{priceFormatted}<span className={`text-sm font-normal ${pkg.is_recommended ? 'text-indigo-200' : (pkg.tier === 4 ? 'text-slate-400' : 'text-slate-500')}`}>/{duration === 1 ? 'tháng' : duration + ' tháng'}</span></p>
                          <ul className={featureListClass}>
                            {pkg.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                          </ul>
                          <button 
                            disabled={isCreatingTx}
                            onClick={() => handleUpgrade(pkg.name, finalPrice)}
                            className={buttonClass}
                          >
                            {buttonText}
                          </button>
                        </div>
                      );
                    })}
                    </>
                  );
                })()}
            </div>
            
            <div className="p-6 bg-white text-center rounded-b-2xl border-t border-slate-100">
               <p className="text-slate-500 text-sm">Hoặc liên hệ Hotline/Zalo: <strong>0987.xxx.xxx</strong> (TaviWeb) để được tư vấn thiết kế gói riêng.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THANH TOÁN QUÉT MÃ QR */}
       {checkoutPackage && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => { setCheckoutPackage(null); setIsProcessingPayment(false); setPaymentSuccess(false); }}
          >
            <div 
              className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { setCheckoutPackage(null); setIsProcessingPayment(false); setPaymentSuccess(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-3xl z-50 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
              >
                &times;
              </button>
            
            {/* Cột Trái - QR Code */}
            <div className="w-full md:w-5/12 bg-indigo-50 p-10 flex flex-col items-center justify-center border-r border-indigo-100">
               <h2 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-wide">Quét mã thanh toán</h2>
               <div className="bg-white p-3 rounded-2xl shadow-xl mb-6 relative">
                  <img 
                    src={`https://img.vietqr.io/image/${(process.env.NEXT_PUBLIC_BANK_BIN || 'acb').toLowerCase()}-${process.env.NEXT_PUBLIC_BANK_ACCOUNT || '15946861'}-compact2.png?amount=${checkoutPackage.amount}&addInfo=${checkoutPackage.transactionCode}&accountName=TAVIWEB`} 
                    alt="QR Code" 
                    className="w-full max-w-[280px] mx-auto rounded-lg border-2 border-indigo-100 shadow-md"
                  />
               </div>
               <p className="text-sm text-indigo-700 text-center font-medium">
                  Mở App Ngân hàng và quét mã QR. Hệ thống sẽ tự động đối soát sau 1 phút.
               </p>
            </div>
            
            {/* Cột Phải - Thông tin & Xác nhận */}
            <div className="w-full md:w-7/12 p-10 flex flex-col justify-between bg-white relative">
               {paymentSuccess ? (
                 <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-10">
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Thanh toán thành công!</h2>
                    <p className="text-lg text-slate-600 mb-8">Hệ thống đã nhận được số tiền <strong className="text-indigo-600">{new Intl.NumberFormat('vi-VN').format(checkoutPackage.amount)} VNĐ</strong> và tự động nâng cấp gói <strong className="text-indigo-600">{checkoutPackage.name}</strong> cho doanh nghiệp của bạn.</p>
                    <button onClick={() => { setCheckoutPackage(null); setShowUpgradeModal(false); setPaymentSuccess(false); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
                      Trải nghiệm ngay
                    </button>
                 </div>
               ) : (
                 <>
                   {isProcessingPayment && (
                     <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                        <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <h3 className="text-xl font-bold text-slate-800">Hệ thống đang đối soát...</h3>
                        <p className="text-slate-500 mt-2">Vui lòng chờ giây lát.</p>
                     </div>
                   )}

                   <div>
                     <div className="inline-block px-3 py-1 bg-rose-100 text-rose-700 font-bold text-xs rounded-full mb-4">Mã giao dịch: {checkoutPackage.transactionCode}</div>
                     <h2 className="text-3xl font-black text-slate-900 mb-2">{checkoutPackage.name}</h2>
                     <p className="text-4xl font-black text-indigo-600 mb-8">{new Intl.NumberFormat('vi-VN').format(checkoutPackage.amount)} <span className="text-xl text-slate-500 font-medium">VNĐ</span></p>
                     
                     <div className="space-y-4">
                       <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <span className="text-slate-500 font-medium">Ngân hàng</span>
                         <span className="font-bold text-slate-800 text-lg uppercase">{process.env.NEXT_PUBLIC_BANK_BIN || 'ACB'}</span>
                       </div>
                       <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <span className="text-slate-500 font-medium">Số tài khoản</span>
                         <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-800 text-lg tracking-wider">{process.env.NEXT_PUBLIC_BANK_ACCOUNT || '15946861'}</span>
                            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md text-sm font-bold transition-colors" onClick={() => {navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BANK_ACCOUNT || '15946861'); toast.success("Đã copy STK")}}>Copy</button>
                         </div>
                       </div>
                       <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                         <span className="text-indigo-600 font-medium">Nội dung (Bắt buộc)</span>
                         <div className="flex items-center gap-3">
                            <span className="font-black text-indigo-800 text-lg">{checkoutPackage.transactionCode}</span>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm font-bold transition-colors shadow-sm" onClick={() => {navigator.clipboard.writeText(checkoutPackage.transactionCode || ''); toast.success("Đã copy nội dung")}}>Copy</button>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div className="mt-10">
                     <button 
                        onClick={() => {
                          setIsProcessingPayment(true);
                        }}
                        disabled={isProcessingPayment}
                        className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg flex justify-center items-center gap-3"
                     >
                       {isProcessingPayment ? 'Đang chờ đối soát...' : 'Tôi đã chuyển khoản thành công'}
                     </button>
                     <p className="text-xs text-slate-400 text-center mt-4">Sau khi chuyển khoản, click nút trên để hệ thống kiểm tra và kích hoạt gói ngay lập tức.</p>
                   </div>
                 </>
               )}

               </div>
            </div>
          </div>
      )}
    </div>
  );
}
