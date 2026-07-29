import { Target, Users, CalendarDays, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { CRMService } from '@/modules/crm/api/crm.service';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';
const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export default async function DashboardHome() {
  let dealsCount = 0;
  let pipelineCount = 0;
  let conversionRate = '0%';
  let totalRevenue = 0;
  let activitiesCount = 0;
  let userName = 'Sếp TAVI';
  let canViewAll = false;
  let recentDeals: any[] = [];
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const { data: user } = await supabase
        .from('crm_users')
        .select('id, name, role, role_id, role_data:crm_roles(*)')
        .eq('id', decoded.id)
        .single();
        
      if (user) {
        userName = user.name;
        const roleData = Array.isArray(user.role_data) ? user.role_data[0] : user.role_data;
        const permissions = roleData?.permissions || [];
        canViewAll = user.role_id ? permissions.includes('view_all_deals') : (user.role === 'admin');

        // Lấy tất cả Deals liên quan
        let dealsQuery = supabase.from('crm_deals').select('id, value, stage_id, created_at, title').eq('tenant_id', decoded.tenant_id);
        if (!canViewAll) {
          dealsQuery = dealsQuery.eq('assignee_id', user.id);
        }
        const { data: allDeals } = await dealsQuery;
        
        if (allDeals && allDeals.length > 0) {
          dealsCount = allDeals.length;
          
          // Lấy tất cả stages để biết stage nào là stage "Thành công/Chốt"
          const { data: stages } = await supabase.from('crm_stages').select('id, name').eq('tenant_id', decoded.tenant_id).order('order', { ascending: false });
          
          // Tạm coi các stage có tên chứa 'Thành công', 'Chốt', 'Hoàn thành', 'Won' là win
          const wonStageIds = stages?.filter(s => 
            s.name.toLowerCase().includes('thành công') || 
            s.name.toLowerCase().includes('chốt') || 
            s.name.toLowerCase().includes('hoàn thành') || 
            s.name.toLowerCase().includes('won')
          ).map(s => s.id) || [];
          
          let wonDealsCount = 0;
          allDeals.forEach(deal => {
            if (wonStageIds.includes(deal.stage_id)) {
              wonDealsCount++;
              totalRevenue += (deal.value || 0);
            }
          });
          
          conversionRate = ((wonDealsCount / dealsCount) * 100).toFixed(1) + '%';
          
          // Lấy deal mới nhất làm hoạt động gần đây
          recentDeals = [...allDeals].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
        }
        
        // Lấy số lượng tương tác/activities
        let activitiesQuery = supabase.from('crm_activities').select('id', { count: 'exact' }).eq('tenant_id', decoded.tenant_id);
        if (!canViewAll) {
           activitiesQuery = activitiesQuery.eq('user_id', user.id);
        }
        const { count: aCount } = await activitiesQuery;
        activitiesCount = aCount || 0;
      }
    }
  } catch (e) {
    console.error(e);
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (decoded.tenant_id) {
        const pipelines = await CRMService.getPipelines(decoded.tenant_id);
        pipelineCount = pipelines.length;
      }
    }
  } catch (e) {}

  const stats = [
    { name: canViewAll ? 'Tổng số Cơ hội (Deals)' : 'Cơ hội của tôi', value: dealsCount.toString(), change: 'Thực tế', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Tương tác / Ghi chú', value: activitiesCount.toString(), change: 'Thực tế', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Quy trình CRM', value: pipelineCount.toString(), change: 'Đang hoạt động', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Tỉ lệ chuyển đổi', value: conversionRate, change: 'Thực tế', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return 'Vừa xong';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            👋 Chào mừng trở lại, {userName}!
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Dưới đây là tổng quan về hoạt động kinh doanh hôm nay.</p>
        </div>
        <div className="text-right">
           <p className="text-sm font-semibold text-slate-500 mb-1">Doanh thu tạm tính (Deals chốt)</p>
           <p className="text-2xl font-black text-emerald-600">
             {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
           </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 font-medium text-sm mb-1 relative z-10">{stat.name}</h3>
            <p className="text-3xl font-extrabold text-slate-800 relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts / Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-500"/> Biểu đồ (Minh họa)</h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-3 py-1.5 text-sm font-medium outline-none focus:border-indigo-500 transition-colors">
              <option>7 ngày qua</option>
              <option>Tháng này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 relative overflow-hidden">
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-100/50 to-transparent"></div>
             <p className="text-slate-400 font-medium flex items-center gap-2 z-10"><Activity className="w-5 h-5"/> Khu vực biểu đồ sẽ sớm được cập nhật dữ liệu thật...</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">Deals mới cập nhật</h3>
          <div className="flex-1 space-y-6">
            {recentDeals.length > 0 ? recentDeals.map((deal, i) => (
              <div key={deal.id} className="flex gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full ring-4 ring-indigo-50 relative z-10"></div>
                  {i !== recentDeals.length - 1 && <div className="absolute top-3 left-1.5 -ml-px w-0.5 h-10 bg-slate-100"></div>}
                </div>
                <div className="-mt-1.5">
                  <p className="text-sm font-bold text-slate-800 line-clamp-1" title={deal.title}>{deal.title}</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">{getTimeAgo(deal.created_at)}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 italic">Chưa có hoạt động nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
