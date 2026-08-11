import { DemoPageData, ServiceItem, GalleryItem, ReviewItem } from "../../types/demo";
import { RawBusinessData } from "./mockDemoData";
import { defaultLawFirmData, DEFAULT_HERO_IMAGE, DEFAULT_ABOUT_IMAGE } from "./templateDefaults";
import { applyFallbackRules } from "./fallbackRules";

/**
 * Maps a raw business record (e.g. from Supabase or mock) to the well-structured DemoPageData.
 */
export function buildDemoPageData(raw?: RawBusinessData): DemoPageData {
  if (!raw) {
    return defaultLawFirmData;
  }

  // Map raw data with default fallback values
  const mappedData: DemoPageData = {
    business: {
      name: raw.name || defaultLawFirmData.business.name,
      phone: raw.phone, // can be undefined to trigger fallback
      email: raw.email || defaultLawFirmData.business.email,
      address: raw.address || defaultLawFirmData.business.address,
      rating: raw.rating, // can be undefined
      reviewCount: raw.reviewCount || 0
    },
    template: {
      key: raw.templateKey || "law-firm",
      name: raw.templateKey === "law-firm" ? "Law Firm Template" : "Standard Template"
    },
    hero: {
      title: raw.customHeroTitle || defaultLawFirmData.hero.title,
      subtitle: raw.customHeroSubtitle || defaultLawFirmData.hero.subtitle,
      image: {
        src: raw.customHeroImage || DEFAULT_HERO_IMAGE,
        alt: `Văn phòng của ${raw.name}`
      },
      primaryAction: {
        label: raw.phone ? "Đặt lịch tư vấn" : "Gửi email tư vấn",
        href: raw.phone ? "#contact" : (raw.email ? `mailto:${raw.email}` : "#contact")
      },
      secondaryAction: {
        label: "Tìm hiểu thêm",
        href: "#about"
      }
    },
    trust: defaultLawFirmData.trust, // Keeps standard security trust factors
    about: {
      title: raw.customAboutTitle || `Về ${raw.name}`,
      description1: raw.customAboutText1 || defaultLawFirmData.about.description1,
      description2: raw.customAboutText2 || defaultLawFirmData.about.description2,
      image: {
        src: raw.customAboutImage || DEFAULT_ABOUT_IMAGE,
        alt: `Đội ngũ luật sư của ${raw.name}`
      },
      stats: [
        { value: "15+", label: "Năm kinh nghiệm" },
        { value: "500+", label: "Dự án hoàn thành" }
      ]
    },
    services: raw.customServices ? raw.customServices.map(s => ({
      icon: s.icon,
      title: s.title,
      description: s.description,
      href: "#contact"
    })) : defaultLawFirmData.services,
    gallery: raw.customGallery ? raw.customGallery.map(src => ({
      src,
      alt: "Không gian làm việc chuyên nghiệp"
    })) : defaultLawFirmData.gallery,
    reviews: raw.customReviews ? raw.customReviews.map(r => ({
      author: r.author,
      rating: r.rating,
      content: r.content,
      role: r.role || "Khách hàng",
      date: r.date || "Gần đây"
    })) : defaultLawFirmData.reviews,
    contact: {
      title: "Liên hệ tư vấn",
      description: "Để lại thông tin hoặc liên hệ trực tiếp với chúng tôi để nhận được sự hỗ trợ pháp lý kịp thời nhất.",
      phone: raw.phone,
      email: raw.email || defaultLawFirmData.contact.email,
      address: raw.address || defaultLawFirmData.contact.address,
      primaryAction: {
        label: "Gửi yêu cầu tư vấn",
        href: "#contact"
      }
    },
    seo: {
      title: `${raw.name} | Tư vấn pháp lý chuyên nghiệp`,
      description: `Văn phòng luật sư uy tín hỗ trợ tư vấn doanh nghiệp, soạn thảo hợp đồng, giải quyết tranh chấp.`
    }
  };

  // Apply visual, functional, and safety fallback rules
  return applyFallbackRules(mappedData);
}
