import React from 'react';
import leadsData from '@/data/leads.json';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 sm:p-12 font-sans selection:bg-blue-200">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Hệ thống Builder Agent
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Giai đoạn 3: Tự động khởi tạo Website Demo từ dữ liệu quét được của Google Maps. Chọn một doanh nghiệp bên dưới để xem thành quả.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadsData.map((lead: any) => (
            <Link 
              href={`/demo/${lead.place_id}`} 
              key={lead.place_id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all group block hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {lead.name.charAt(0)}
              </div>
              <h2 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                {lead.name}
              </h2>
              <div className="space-y-1 text-sm text-slate-500 mb-4">
                <p>⭐ {lead.rating}/5 ({lead.user_ratings_total} đánh giá)</p>
                <p className="line-clamp-1">📍 {lead.formatted_address}</p>
              </div>
              <div className="text-blue-600 font-semibold flex items-center justify-between group-hover:text-blue-700">
                <span>Xem Demo</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
