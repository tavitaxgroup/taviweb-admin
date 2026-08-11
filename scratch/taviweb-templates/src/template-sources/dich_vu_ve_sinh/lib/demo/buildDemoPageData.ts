import { DemoPageData } from "../../types/demo";
import { getMockBusinessByPlaceId } from "./mockDemoData";
import { applyFallbackRules } from "./fallbackRules";

export function buildDemoPageData(placeId: string): DemoPageData {
  const mockRecord = getMockBusinessByPlaceId(placeId);

  if (!mockRecord) {
    // If no record found, build with default
    return applyFallbackRules({});
  }

  const { business, customHero, customServices } = mockRecord;

  // Adapt the specific business info into our DemoPageData
  const partialData: Partial<DemoPageData> = {
    business,
    seo: {
      title: `${business.name} - Vệ Sinh Công Nghiệp Sạch & Sáng`,
      description: `Đơn vị vệ sinh công nghiệp uy tín hàng đầu tại khu vực. Gọi ngay hotline ${business.phone || ""} để nhận khảo sát miễn phí.`,
    },
  };

  if (customHero) {
    partialData.hero = {
      title: customHero.title,
      subtitle: customHero.subtitle,
      tagline: customHero.tagline,
      // The rest of the properties will be populated by fallbackRules
      image: { src: "", alt: "" },
      primaryAction: { label: "", href: "" },
    };
  }

  if (customServices) {
    partialData.services = customServices.map((srv) => ({
      id: srv.id,
      icon: srv.icon,
      title: srv.title,
      description: srv.description,
      badge: srv.badge,
    }));
  }

  return applyFallbackRules(partialData);
}
