import type { BusinessLead, IndustryKey } from "@/types/demo";
import { getTemplateDefaults } from "./templateDefaults";

export function buildSeo(lead: BusinessLead, templateKey: IndustryKey) {
  const defaults = getTemplateDefaults(templateKey);
  const name = lead.name?.trim() || defaults.label;
  const address = lead.formatted_address?.trim();

  // Safely parse template_data JSON if present
  let customData: Record<string, any> | undefined = undefined;
  if (lead.template_data) {
    try {
      customData = typeof lead.template_data === "string"
        ? JSON.parse(lead.template_data)
        : lead.template_data;
    } catch (e) {
      console.error("Failed to parse template_data JSON in buildSeo:", e);
    }
  }

  const customTitle = customData?.["seo.title"] ?? customData?.seo?.title;
  const customDescription = customData?.["seo.description"] ?? customData?.seo?.description;
  const customNoindex = customData?.["seo.noindex"] ?? customData?.seo?.noindex;

  return {
    title: customTitle || `${name} | Demo website ${defaults.label}`,
    description: customDescription || (address
      ? `Xem demo website cho ${name} tại ${address}. Trang demo được tạo tự động từ dữ liệu doanh nghiệp.`
      : `Xem demo website cho ${name}. Trang demo được tạo tự động từ dữ liệu doanh nghiệp.`),
    canonicalPath: `/demo/${encodeURIComponent(lead.place_id)}`,
    noindex: customNoindex !== undefined ? !!customNoindex : true
  };
}
