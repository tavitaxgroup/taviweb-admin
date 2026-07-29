import type { BusinessLead, IndustryKey } from "@/types/demo";
import { getTemplateDefaults } from "./templateDefaults";

export function buildSeo(lead: BusinessLead, templateKey: IndustryKey) {
  const defaults = getTemplateDefaults(templateKey);
  const name = lead.name?.trim() || defaults.label;
  const address = lead.formatted_address?.trim();

  return {
    title: `${name} | Demo website ${defaults.label}`,
    description: address
      ? `Xem demo website cho ${name} tại ${address}. Trang demo được tạo tự động từ dữ liệu doanh nghiệp.`
      : `Xem demo website cho ${name}. Trang demo được tạo tự động từ dữ liệu doanh nghiệp.`,
    canonicalPath: `/demo/${encodeURIComponent(lead.place_id)}`,
    noindex: true
  };
}
