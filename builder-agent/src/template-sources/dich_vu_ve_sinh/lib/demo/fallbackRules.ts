import { DemoPageData } from "../../types/demo";
import { defaultTemplateData, DEFAULT_CLEANING_IMAGES } from "./templateDefaults";

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  // Use defaultTemplateData as base to prevent missing properties
  const base = JSON.parse(JSON.stringify(defaultTemplateData)) as DemoPageData;

  const business = {
    ...base.business,
    ...data.business,
  };

  const template = {
    ...base.template,
    ...data.template,
  };

  // Fallback images
  const heroImage = data.hero?.image?.src ? data.hero.image : {
    src: DEFAULT_CLEANING_IMAGES.hero,
    alt: data.hero?.image?.alt || "Dịch vụ vệ sinh công nghiệp",
  };

  // Contact CTA modifications if phone is missing
  let primaryAction = data.hero?.primaryAction || {
    label: "Gọi báo giá ngay",
    href: business.phone ? `tel:${business.phone.replace(/\s+/g, "")}` : "#contact",
  };

  if (!business.phone) {
    if (business.MessageCircle) {
      primaryAction = {
        label: "Liên hệ MessageCircle",
        href: business.MessageCircle,
      };
    } else if (business.email) {
      primaryAction = {
        label: "Gửi Email báo giá",
        href: `mailto:${business.email}`,
      };
    } else {
      primaryAction = {
        label: "Liên hệ chúng tôi",
        href: "#contact",
      };
    }
  } else {
    primaryAction = {
      label: "Gọi báo giá ngay",
      href: `tel:${business.phone.replace(/\s+/g, "")}`,
    };
  }

  const hero = {
    ...base.hero,
    ...data.hero,
    image: heroImage,
    primaryAction,
  };

  const trust = {
    badges: data.trust?.badges && data.trust.badges.length > 0 ? data.trust.badges : base.trust.badges,
  };

  const aboutImage = data.about?.image?.src ? data.about.image : {
    src: DEFAULT_CLEANING_IMAGES.about,
    alt: data.about?.image?.alt || "Giới thiệu CleanPro",
  };

  const about = {
    ...base.about,
    ...data.about,
    image: aboutImage,
    highlights: data.about?.highlights && data.about.highlights.length > 0 ? data.about.highlights : base.about.highlights,
  };

  const services = data.services && data.services.length > 0 ? data.services : base.services;

  const gallery = data.gallery && data.gallery.length > 0 ? data.gallery : base.gallery;

  const reviews = data.reviews && data.reviews.length > 0 ? data.reviews : base.reviews;

  // Contact section custom fallback
  const contact = {
    ...base.contact,
    ...data.contact,
    phoneValue: business.phone || base.contact.phoneValue,
  };

  const seo = {
    title: data.seo?.title || `${business.name} - Dịch vụ vệ sinh công nghiệp chuyên nghiệp`,
    description: data.seo?.description || `Sạch nhanh chóng, an tâm tuyệt đối với dịch vụ vệ sinh từ ${business.name}. Liên hệ tư vấn khảo sát ngay.`,
  };

  return {
    business,
    template,
    hero,
    trust,
    about,
    services,
    gallery,
    reviews,
    contact,
    seo,
  };
}
