import type { BusinessLead, IndustryKey } from "@/types/demo";
import { INDUSTRY_KEYS } from "./templateRouter";
import { templateDefaults } from "./templateDefaults";

function lead(industry: IndustryKey, index: number): BusinessLead {
  const defaults = templateDefaults[industry];
  return {
    id: `mock-${industry}`,
    place_id: `mock-${industry}`,
    industry,
    status: "mock",
    name: `${defaults.shortLabel} Demo ${index}`,
    formatted_address: `${index + 10} Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh`,
    formatted_phone_number: `090 ${100 + index} ${200 + index} ${300 + index}`,
    website: null,
    image_url: defaults.fallbackImages[0]?.src ?? null,
    rating: 4.6 + (index % 3) * 0.1,
    user_ratings_total: 80 + index * 17,
    facebook_url: "https://facebook.com/",
    facebook_followers: 1200 + index * 250,
    facebook_email: `demo-${industry}@example.com`,
    demo_status: "ready",
    outreach_status: "not_sent",
    demo_url: `/demo/mock-${industry}`,
    notes: "Mock data dùng để preview khi chưa kết nối Supabase."
  };
}

export const mockLeads: BusinessLead[] = INDUSTRY_KEYS.map((industry, index) =>
  lead(industry, index + 1)
);

export function getMockLeadByPlaceId(placeId: string): BusinessLead | null {
  return mockLeads.find((item) => item.place_id === placeId) ?? null;
}
