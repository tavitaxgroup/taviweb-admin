import React from 'react';
import { Star, MapPin, Phone, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';

export default function StudioChupAnhTemplate({ lead }: { lead: any }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-slate-50 to-slate-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-6">
              <Star size={16} className="fill-current" />
              Chuyên nghiệp & Uy tín
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              {lead.name}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 mt-2">
                Lưu Giữ Khoảnh Khắc
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Lưu lại những thước phim và khung hình đẹp nhất của cuộc đời. Chúng tôi tự hào mang đến trải nghiệm tuyệt vời nhất cho bạn.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2">
                <Calendar size={20} /> Đặt lịch ngay
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-bold shadow-sm border border-slate-200 transition-all flex items-center gap-2">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-purple-300 rounded-[3rem] rotate-3 opacity-20 scale-105 blur-lg"></div>
            <img 
              src={lead.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"} 
              alt={lead.name}
              className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-purple-600 font-bold uppercase tracking-wider mb-2">Dịch vụ của chúng tôi</h3>
            <h2 className="text-4xl font-black text-slate-900">Giải pháp hoàn hảo cho bạn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { title: "Chụp ảnh cưới", desc: "Dịch vụ chất lượng cao, thực hiện bởi đội ngũ chuyên nghiệp." },
              { title: "Chụp chân dung", desc: "Giải pháp toàn diện đáp ứng mọi nhu cầu của bạn." },
              { title: "Chụp sản phẩm", desc: "Cam kết mang lại sự hài lòng tuyệt đối cho mọi khách hàng." }
            ].map((srv, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h4>
                <p className="text-slate-600 mb-6">{srv.desc}</p>
                <a href="#" className="text-purple-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Xem chi tiết <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
