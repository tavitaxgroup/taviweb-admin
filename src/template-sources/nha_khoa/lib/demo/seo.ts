import { SeoInfo } from '../../types/demo';

export function generateSeoData(businessName: string, area?: string): SeoInfo {
  const locationText = area ? ` tại ${area}` : "";
  return {
    title: `${businessName} - Nha Khoa Chuyên Nghiệp, Thẩm Mỹ Uy Tín${locationText}`,
    description: `Khám phá các dịch vụ nha khoa chất lượng cao tại ${businessName}${locationText}. Đội ngũ bác sĩ tận tâm, trang thiết bị chuẩn quốc tế, bảo vệ nụ cười khỏe đẹp của bạn và gia đình. Đặt lịch tư vấn ngay!`,
    noindex: true // Default to noindex as requested for preview demos
  };
}
