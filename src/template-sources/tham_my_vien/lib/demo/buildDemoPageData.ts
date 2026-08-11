import { DemoPageData } from "../../types/demo";
import { getMockDemoData } from "./mockDemoData";
import { resolveContactCTA, getFallbackImage } from "./fallbackRules";
import { DEFAULT_CLINIC_TEMPLATE_DATA } from "./templateDefaults";

export function buildDemoPageData(placeId: string): DemoPageData {
  const baseData = getMockDemoData(placeId);
  
  if (!baseData) {
    return DEFAULT_CLINIC_TEMPLATE_DATA;
  }

  // Deep clone / fill standard fallback rules
  const business = { ...baseData.business };
  
  // Gracefully handle missing phone/CTA fields
  const resolvedCTA = resolveContactCTA(business);

  const hero = {
    ...baseData.hero,
    image: baseData.hero?.image?.src ? baseData.hero.image : getFallbackImage(0)
  };

  const about = {
    ...baseData.about,
    image: baseData.about?.image?.src ? baseData.about.image : getFallbackImage(1)
  };

  return {
    ...baseData,
    business,
    hero,
    about,
    contact: {
      ...baseData.contact,
      primaryAction: baseData.contact?.primaryAction?.href 
        ? baseData.contact.primaryAction 
        : { label: resolvedCTA.label, href: resolvedCTA.href },
      phoneAction: baseData.contact?.phoneAction?.href
        ? baseData.contact.phoneAction
        : { label: resolvedCTA.label, href: resolvedCTA.href }
    }
  };
}
