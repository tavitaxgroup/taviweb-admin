import { DemoPageData } from "../../types/demo";
import { FALLBACK_SPA_SERVICES, FALLBACK_SPA_GALLERY, FALLBACK_SPA_REVIEWS } from "./templateDefaults";

export function applyFallbackRules(data: DemoPageData): DemoPageData {
  const result = { ...data };

  // 1. Check services
  if (!result.services || result.services.length === 0) {
    result.services = FALLBACK_SPA_SERVICES;
  }

  // 1.5 Check about features
  if (!result.about.features || result.about.features.length === 0) {
    result.about.features = [
      "Không gian yên tĩnh: Tách biệt hoàn toàn với tiếng ồn đô thị, mang lại sự bình yên tuyệt đối.",
      "Kỹ thuật viên tận tâm: Đội ngũ được đào tạo bài bản, thấu hiểu từng nhu cầu của khách hàng.",
      "Sản phẩm cao cấp: Cam kết sử dụng các dòng mỹ phẩm hữu cơ và công nghệ hàng đầu thế giới."
    ];
  }

  // 2. Check gallery
  if (!result.gallery || result.gallery.length === 0) {
    result.gallery = FALLBACK_SPA_GALLERY;
  }

  // 3. Check reviews
  if (!result.reviews || result.reviews.length === 0) {
    result.reviews = FALLBACK_SPA_REVIEWS;
  }

  // 4. Fallback phone & email
  if (!result.contact.phone) {
    // If phone is missing, update CTA links to point to MessageCircle/Email or a fallback
    result.contact.primaryAction = {
      label: "Nhắn tin tư vấn",
      href: result.contact.MessageCircle || `mailto:${result.contact.email}`
    };
    if (result.hero.primaryAction.href.startsWith("tel:")) {
      result.hero.primaryAction = {
        label: "Tìm hiểu dịch vụ",
        href: "#services"
      };
    }
  }

  return result;
}
