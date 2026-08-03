import React from 'react';
import { 
  Scissors, Utensils, Stethoscope, Dumbbell, Camera, SprayCan, Wrench, Briefcase, Coffee, Building, Paintbrush, Calendar, Sparkles
} from 'lucide-react';

export function getBookingConfig(templateKey: string) {
  switch (templateKey) {
    case 'nha_khoa':
    case 'phong_kham':
      return {
        resourceLabel: 'bác sĩ',
        resourceTitle: 'NHÂN SỰ (BÁC SĨ)',
        resourceDescription: 'Danh sách bác sĩ/y tá phục vụ',
        resourcePlaceholder: 'Bác sĩ A',
        resourceRolePlaceholder: 'Bác sĩ chuyên khoa',
        serviceLabel: 'dịch vụ y tế',
        serviceDescription: 'Danh sách các dịch vụ khám/chữa bệnh',
        servicePlaceholder: 'Khám tổng quát',
        icon: <Stethoscope className="w-6 h-6" />,
        smallIcon: <Stethoscope className="w-4 h-4" />,
        color: 'bg-emerald-100 border-emerald-200 text-emerald-600',
        iconColor: 'text-emerald-500'
      };
    case 'spa':
    case 'tham_my_vien':
      return {
        resourceLabel: 'chuyên viên',
        resourceTitle: 'CHUYÊN VIÊN / KỸ THUẬT VIÊN',
        resourceDescription: 'Danh sách chuyên viên chăm sóc',
        resourcePlaceholder: 'Chuyên viên B',
        resourceRolePlaceholder: 'Kỹ thuật viên trưởng',
        serviceLabel: 'gói trị liệu',
        serviceDescription: 'Danh sách các gói dịch vụ làm đẹp/trị liệu',
        servicePlaceholder: 'Chăm sóc da mặt',
        icon: <Sparkles className="w-6 h-6" />,
        smallIcon: <Sparkles className="w-4 h-4" />,
        color: 'bg-pink-100 border-pink-200 text-pink-600',
        iconColor: 'text-pink-500'
      };
    case 'salon_toc':
      return {
        resourceLabel: 'thợ làm tóc',
        resourceTitle: 'NHÂN SỰ (THỢ)',
        resourceDescription: 'Danh sách thợ chính/phụ',
        resourcePlaceholder: 'Nguyễn Văn A',
        resourceRolePlaceholder: 'Senior Barber',
        serviceLabel: 'dịch vụ làm tóc',
        serviceDescription: 'Danh sách dịch vụ cắt/uốn/nhuộm',
        servicePlaceholder: 'Cắt tóc nam',
        icon: <Scissors className="w-6 h-6" />,
        smallIcon: <Scissors className="w-4 h-4" />,
        color: 'bg-rose-100 border-rose-200 text-rose-600',
        iconColor: 'text-rose-500'
      };
    case 'phong_gym':
      return {
        resourceLabel: 'PT / máy tập',
        resourceTitle: 'TÀI NGUYÊN (PT/MÁY TẬP)',
        resourceDescription: 'Danh sách Huấn luyện viên hoặc Máy tập đặc biệt',
        resourcePlaceholder: 'PT. Tuấn',
        resourceRolePlaceholder: 'Huấn luyện viên',
        serviceLabel: 'gói tập',
        serviceDescription: 'Danh sách các gói tập / lớp học',
        servicePlaceholder: 'Gói PT 1 kèm 1',
        icon: <Dumbbell className="w-6 h-6" />,
        smallIcon: <Dumbbell className="w-4 h-4" />,
        color: 'bg-zinc-100 border-zinc-200 text-zinc-600',
        iconColor: 'text-zinc-500'
      };
    case 'studio_chup_anh':
      return {
        resourceLabel: 'phòng chụp / thợ ảnh',
        resourceTitle: 'TÀI NGUYÊN (PHÒNG / THỢ ẢNH)',
        resourceDescription: 'Danh sách thợ chụp hoặc phòng studio',
        resourcePlaceholder: 'Thợ ảnh Minh',
        resourceRolePlaceholder: 'Nhiếp ảnh gia',
        serviceLabel: 'gói chụp ảnh',
        serviceDescription: 'Danh sách các gói chụp ảnh/quay phim',
        servicePlaceholder: 'Gói chụp chân dung',
        icon: <Camera className="w-6 h-6" />,
        smallIcon: <Camera className="w-4 h-4" />,
        color: 'bg-purple-100 border-purple-200 text-purple-600',
        iconColor: 'text-purple-500'
      };
    case 'dich_vu_ve_sinh':
      return {
        resourceLabel: 'nhân viên',
        resourceTitle: 'NHÂN VIÊN (ĐỘI VỆ SINH)',
        resourceDescription: 'Danh sách nhân sự đội vệ sinh',
        resourcePlaceholder: 'Nhân viên C',
        resourceRolePlaceholder: 'Nhân viên',
        serviceLabel: 'gói vệ sinh',
        serviceDescription: 'Danh sách dịch vụ dọn dẹp',
        servicePlaceholder: 'Vệ sinh tổng thể',
        icon: <SprayCan className="w-6 h-6" />,
        smallIcon: <SprayCan className="w-4 h-4" />,
        color: 'bg-cyan-100 border-cyan-200 text-cyan-600',
        iconColor: 'text-cyan-500'
      };
    case 'garage_oto':
      return {
        resourceLabel: 'khoang / thợ',
        resourceTitle: 'TÀI NGUYÊN (KHOANG / THỢ)',
        resourceDescription: 'Danh sách thợ sửa chữa hoặc khoang dịch vụ',
        resourcePlaceholder: 'Khoang sửa chữa 1',
        resourceRolePlaceholder: 'Thợ chính',
        serviceLabel: 'dịch vụ sửa chữa',
        serviceDescription: 'Danh sách các dịch vụ bảo dưỡng/sửa xe',
        servicePlaceholder: 'Bảo dưỡng định kỳ',
        icon: <Wrench className="w-6 h-6" />,
        smallIcon: <Wrench className="w-4 h-4" />,
        color: 'bg-slate-100 border-slate-200 text-slate-600',
        iconColor: 'text-slate-500'
      };
    case 'nha_hang':
    case 'quan_cafe':
      const isRestaurant = templateKey === 'nha_hang';
      return {
        resourceLabel: 'bàn',
        resourceTitle: 'TÀI NGUYÊN (BÀN)',
        resourceDescription: 'Danh sách bàn hoặc phòng VIP',
        resourcePlaceholder: 'Bàn VIP 1',
        resourceRolePlaceholder: '4 khách',
        serviceLabel: 'combo / set menu',
        serviceDescription: 'Danh sách combo đặt trước',
        servicePlaceholder: isRestaurant ? 'Set Lẩu Bò' : 'Combo Trà Bánh',
        icon: isRestaurant ? <Utensils className="w-6 h-6" /> : <Coffee className="w-6 h-6" />,
        smallIcon: isRestaurant ? <Utensils className="w-4 h-4" /> : <Coffee className="w-4 h-4" />,
        color: 'bg-orange-100 border-orange-200 text-orange-600',
        iconColor: 'text-orange-500'
      };
    case 'luat_su':
      return {
        resourceLabel: 'luật sư',
        resourceTitle: 'NHÂN SỰ (LUẬT SƯ)',
        resourceDescription: 'Danh sách luật sư tư vấn',
        resourcePlaceholder: 'Luật sư D',
        resourceRolePlaceholder: 'Luật sư Hình sự',
        serviceLabel: 'dịch vụ tư vấn',
        serviceDescription: 'Danh sách các gói tư vấn pháp lý',
        servicePlaceholder: 'Tư vấn hợp đồng',
        icon: <Briefcase className="w-6 h-6" />,
        smallIcon: <Briefcase className="w-4 h-4" />,
        color: 'bg-blue-100 border-blue-200 text-blue-600',
        iconColor: 'text-blue-500'
      };
    case 'noi_that':
    case 'cong_ty_xay_dung':
      const isInterior = templateKey === 'noi_that';
      return {
        resourceLabel: 'kỹ sư / KTS',
        resourceTitle: 'NHÂN SỰ (KỸ SƯ/KTS)',
        resourceDescription: 'Danh sách chuyên gia tư vấn',
        resourcePlaceholder: 'KTS. Hoàng',
        resourceRolePlaceholder: 'Kiến trúc sư',
        serviceLabel: 'gói dịch vụ',
        serviceDescription: 'Danh sách dịch vụ tư vấn/thiết kế',
        servicePlaceholder: isInterior ? 'Thiết kế trọn gói' : 'Thi công phần thô',
        icon: isInterior ? <Paintbrush className="w-6 h-6" /> : <Building className="w-6 h-6" />,
        smallIcon: isInterior ? <Paintbrush className="w-4 h-4" /> : <Building className="w-4 h-4" />,
        color: 'bg-yellow-100 border-yellow-200 text-yellow-600',
        iconColor: 'text-yellow-500'
      };
    default:
      return {
        resourceLabel: 'tài nguyên',
        resourceTitle: 'TÀI NGUYÊN',
        resourceDescription: 'Danh sách tài nguyên phục vụ lịch hẹn',
        resourcePlaceholder: 'Tài nguyên 1',
        resourceRolePlaceholder: 'Chi tiết tài nguyên',
        serviceLabel: 'dịch vụ',
        serviceDescription: 'Danh sách dịch vụ cung cấp',
        servicePlaceholder: 'Tên dịch vụ',
        icon: <Calendar className="w-6 h-6" />,
        smallIcon: <Calendar className="w-4 h-4" />,
        color: 'bg-indigo-100 border-indigo-200 text-indigo-600',
        iconColor: 'text-indigo-500'
      };
  }
}
