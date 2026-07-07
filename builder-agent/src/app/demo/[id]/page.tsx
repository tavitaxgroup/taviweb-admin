import React from 'react';
import { notFound } from 'next/navigation';
import { Phone } from 'lucide-react';
import { getLeadById } from '@/lib/data';

// Dynamic Template Imports
import NhaKhoaTemplate from '@/templates/NhaKhoaTemplate';
import SpaTemplate from '@/templates/SpaTemplate';
import ThamMyVienTemplate from '@/templates/ThamMyVienTemplate';
import NoiThatTemplate from '@/templates/NoiThatTemplate';
import LuatSuTemplate from '@/templates/LuatSuTemplate';
import TrungTamTiengAnhTemplate from '@/templates/TrungTamTiengAnhTemplate';
import PhongKhamTemplate from '@/templates/PhongKhamTemplate';
import StudioChupAnhTemplate from '@/templates/StudioChupAnhTemplate';
import NhaHangTemplate from '@/templates/NhaHangTemplate';
import QuanCafeTemplate from '@/templates/QuanCafeTemplate';
import SalonTocTemplate from '@/templates/SalonTocTemplate';
import CongTyXayDungTemplate from '@/templates/CongTyXayDungTemplate';
import DichVuVeSinhTemplate from '@/templates/DichVuVeSinhTemplate';
import GarageOtoTemplate from '@/templates/GarageOtoTemplate';
import PhongGymTemplate from '@/templates/PhongGymTemplate';

const templatesMap: Record<string, any> = {
  nha_khoa: NhaKhoaTemplate,
  spa: SpaTemplate,
  tham_my_vien: ThamMyVienTemplate,
  noi_that: NoiThatTemplate,
  luat_su: LuatSuTemplate,
  trung_tam_tieng_anh: TrungTamTiengAnhTemplate,
  phong_kham: PhongKhamTemplate,
  studio_chup_anh: StudioChupAnhTemplate,
  nha_hang: NhaHangTemplate,
  quan_cafe: QuanCafeTemplate,
  salon_toc: SalonTocTemplate,
  cong_ty_xay_dung: CongTyXayDungTemplate,
  dich_vu_ve_sinh: DichVuVeSinhTemplate,
  garage_oto: GarageOtoTemplate,
  phong_gym: PhongGymTemplate
};

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const place_id = resolvedParams.id;
  const lead = await getLeadById(place_id);

  if (!lead) {
    notFound();
  }

  const TemplateComponent = templatesMap[lead.industry] || NhaKhoaTemplate;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {lead.name.charAt(0)}
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 truncate max-w-[200px] sm:max-w-md">
              {lead.name}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">Dịch vụ</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">Về chúng tôi</a>
            <div className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              <Phone size={18} />
              <span>{lead.formatted_phone_number || 'Liên hệ ngay'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Template Content */}
      <TemplateComponent lead={lead} />

      {/* Global Footer with Map */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-12 lg:col-span-4">
            <h2 className="text-2xl font-bold text-white mb-6">{lead.name}</h2>
            <p className="mb-6 leading-relaxed text-slate-400">
              Đồng hành cùng bạn với chất lượng dịch vụ chuyên nghiệp và tận tâm nhất. 
              Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">fb</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">tw</div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">ig</div>
            </div>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-bold text-white text-lg mb-6">Liên kết nhanh</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Trang chủ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dịch vụ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bảng giá</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-8 lg:col-span-6">
            <h3 className="font-bold text-white text-lg mb-6">Bản đồ vị trí</h3>
            <div className="w-full h-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner relative">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }} 
                src={`https://maps.google.com/maps?width=100%25&height=600&hl=vi&q=${encodeURIComponent((lead.formatted_address || "TP HCM") + " (" + (lead.name || "") + ")")}&t=&z=15&ie=UTF8&iwloc=B&output=embed`} 
                allowFullScreen
                title="Bản đồ địa điểm"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2026 {lead.name}. All rights reserved.</p>
          <p className="mt-2 text-xs">Được tạo tự động bởi Builder Agent</p>
        </div>
      </footer>
    </div>
  );
}
