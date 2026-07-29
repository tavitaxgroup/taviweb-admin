import type { IndustryKey } from "@/types/demo";
import { templateDefaults } from "./templateDefaults";

export const DEFAULT_TEMPLATE_KEY: IndustryKey = "phong_kham";

export const INDUSTRY_KEYS = Object.keys(templateDefaults) as IndustryKey[];

export function routeTemplateByIndustry(industry?: string | null): IndustryKey {
  const normalized = industry?.trim().toLowerCase();
  if (!normalized) return DEFAULT_TEMPLATE_KEY;
  return INDUSTRY_KEYS.includes(normalized as IndustryKey)
    ? (normalized as IndustryKey)
    : DEFAULT_TEMPLATE_KEY;
}
