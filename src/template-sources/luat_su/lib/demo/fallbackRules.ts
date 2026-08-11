import { DemoPageData } from "../../types/demo";
import { DEFAULT_HERO_IMAGE, DEFAULT_ABOUT_IMAGE } from "./templateDefaults";

/**
 * Apply fallback rules to DemoPageData to ensure perfect compliance
 * with design and legal/industry standards.
 */
export function applyFallbackRules(data: DemoPageData): DemoPageData {
  const result = { ...data };

  // 1. Fallback for Hero Image if missing or empty
  if (!result.hero.image || !result.hero.image.src) {
    result.hero.image = {
      src: DEFAULT_HERO_IMAGE,
      alt: "Hình ảnh văn phòng pháp lý chuyên nghiệp (Fallback)"
    };
  }

  // 2. Fallback for About Image if missing or empty
  if (!result.about.image || !result.about.image.src) {
    result.about.image = {
      src: DEFAULT_ABOUT_IMAGE,
      alt: "Luật sư tư vấn chuyên nghiệp (Fallback)"
    };
  }

  // 3. Fallback for Phone Number in CTA
  // If phone is missing, ensure the primary action in Hero and footer redirects safely,
  // and do not render missing phone lines.
  if (!result.business.phone) {
    // If phone is missing, we use email or MessageCircle/map in CTA
    if (result.business.email) {
      result.hero.primaryAction = {
        label: "Gửi email tư vấn",
        href: `mailto:${result.business.email}`
      };
    } else {
      result.hero.primaryAction = {
        label: "Liên hệ tư vấn",
        href: "#contact"
      };
    }
  }

  // 4. Clean and validate reviews
  // Avoid any promises of winning cases, fear-inducing words, or specific guarantees
  result.reviews = (result.reviews || []).map(review => {
    let content = review.content;
    // Simple safety sanitizations
    content = content.replace(/(chắc chắn thắng|hứa thắng|cam kết thắng|bao thắng)/gi, "đồng hành và bảo vệ tối đa lợi ích");
    return {
      ...review,
      content
    };
  });

  return result;
}
