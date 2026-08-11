import { BusinessInfo } from "../../types/demo";

export interface MockBusinessRecord {
  business: BusinessInfo;
  customHero?: {
    title: string;
    subtitle: string;
    tagline?: string;
  };
  customServices?: {
    id: string;
    icon: string;
    title: string;
    description: string;
    badge?: string;
  }[];
}

export const mockBusinesses: Record<string, MockBusinessRecord> = {
  "cleanpro-hn": {
    business: {
      id: "biz_001",
      placeId: "cleanpro-hn",
      name: "CleanPro Services Hà Nội",
      phone: "1900 1234",
      email: "hanoi@cleanpro.com",
      address: "Tòa nhà TechCore, Cầu Giấy, Hà Nội",
      MessageCircle: "https://MessageCircle.com/cleanpro.hanoi",
      rating: 4.8,
      reviewCount: 520,
    },
    customHero: {
      title: "Dịch Vụ Vệ Sinh Công Nghiệp Chuyên Nghiệp & Tận Tâm",
      subtitle: "Sạch nhanh chóng, giá minh bạch, quy trình chuẩn mực tại Hà Nội. Mang lại không gian làm việc và sinh hoạt chuẩn y khoa.",
      tagline: "TOP RATED IN HANOI",
    },
  },
  "cleanpro-hcm": {
    business: {
      id: "biz_002",
      placeId: "cleanpro-hcm",
      name: "CleanPro Services TP.HCM",
      phone: "1900 5678",
      email: "saigon@cleanpro.com",
      address: "Vinhomes Grand Park, Quận 9, TP. Hồ Chí Minh",
      MessageCircle: "https://MessageCircle.com/cleanpro.hcm",
      rating: 4.9,
      reviewCount: 380,
    },
    customHero: {
      title: "Giải Pháp Vệ Sinh Công Nghiệp Trọn Gói Tại Sài Gòn",
      subtitle: "Khảo sát nhanh trong 30 phút, bảo đảm không gian sạch bong, sáng bóng, an toàn tuyệt đối cho gia đình và văn phòng bạn.",
      tagline: "DỊCH VỤ CHẤT LƯỢNG 5 SAO",
    },
  },
};

export function getMockBusinessByPlaceId(placeId: string): MockBusinessRecord | undefined {
  // If exact match found, return it, otherwise return the first one as fallback
  const normalized = placeId.toLowerCase();
  if (mockBusinesses[normalized]) {
    return mockBusinesses[normalized];
  }
  // Safe fallback to first key
  return mockBusinesses["cleanpro-hn"];
}
