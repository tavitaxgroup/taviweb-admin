import { DemoPageData } from "../../types/demo";
import { fineDiningDefaults } from "./templateDefaults";

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  const merged = { ...fineDiningDefaults, ...data } as DemoPageData;

  // Rule: Ensure we have fallback images if any images are empty strings or missing
  if (!merged.hero.backgroundImage) {
    merged.hero.backgroundImage = fineDiningDefaults.hero!.backgroundImage;
  }
  if (!merged.about.image) {
    merged.about.image = fineDiningDefaults.about!.image;
  }
  
  // Fill in any empty service images
  merged.services = (merged.services || []).map((s, index) => ({
    ...s,
    image: s.image || (fineDiningDefaults.services?.[index]?.image || fineDiningDefaults.services?.[0]?.image || "")
  }));

  // Fill in any empty gallery images
  merged.gallery = (merged.gallery || []).map((g, index) => ({
    ...g,
    image: g.image || (fineDiningDefaults.gallery?.[index]?.image || fineDiningDefaults.gallery?.[0]?.image || "")
  }));

  // Handle missing phone or address safely in primary/secondary CTAs
  if (!merged.business.phone) {
    // If phone is missing, update the CTAs that might rely on it to use Map/Email or Social
    if (merged.hero.secondaryCta.href.startsWith("tel:")) {
      merged.hero.secondaryCta.label = "Gửi email";
      merged.hero.secondaryCta.href = `mailto:${merged.business.email || "info@lechelle.vn"}`;
    }
  }

  return merged;
}
