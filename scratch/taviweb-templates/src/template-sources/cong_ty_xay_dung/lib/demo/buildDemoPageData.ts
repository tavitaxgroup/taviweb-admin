import { RawBusiness } from "./mockDemoData";
import { DemoPageData, ImageAsset, CTAAction } from "../../types/demo";
import { templateDefaults } from "./templateDefaults";

export function buildDemoPageData(raw?: RawBusiness): DemoPageData {
  if (!raw) {
    return {
      business: templateDefaults.business,
      template: {
        key: "construction-company",
        name: "Công ty Xây dựng"
      },
      hero: templateDefaults.hero,
      trust: templateDefaults.trust,
      about: templateDefaults.about,
      services: templateDefaults.services,
      gallery: templateDefaults.gallery,
      whyChooseUs: templateDefaults.whyChooseUs,
      reviews: templateDefaults.reviews,
      contact: templateDefaults.contact,
      seo: templateDefaults.seo
    };
  }

  // Handle CTA adjustments when phone is missing
  const primaryCTA: CTAAction = raw.phone 
    ? { label: "Gọi tư vấn công trình", href: `tel:${raw.phone.replace(/\s+/g, '')}` }
    : (raw.email ? { label: "Gửi Email tư vấn", href: `mailto:${raw.email}` } : { label: "Liên hệ trực tiếp", href: "#contact" });

  const secondaryCTA: CTAAction = {
    label: "Xem dự án mẫu",
    href: "#gallery"
  };

  const services = raw.services && raw.services.length > 0 
    ? raw.services.map((srv, index) => ({
        id: `srv-${index + 1}`,
        title: srv.title,
        description: srv.description,
        isPopular: srv.isPopular || false,
        image: {
          src: srv.imageSrc || templateDefaults.services[0]?.image?.src || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
          alt: srv.title
        },
        highlights: srv.highlights
      }))
    : templateDefaults.services;

  const gallery = raw.gallery && raw.gallery.length > 0
    ? raw.gallery.map((item, index) => ({
        id: `project-${index + 1}`,
        title: item.title,
        location: item.location,
        category: item.category,
        image: {
          src: item.imageSrc,
          alt: item.title
        }
      }))
    : templateDefaults.gallery;

  const reviews = raw.reviews && raw.reviews.length > 0
    ? raw.reviews.map((rev, index) => {
        const initials = rev.authorName
          ? rev.authorName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
          : "KH";
        return {
          id: `rev-${index + 1}`,
          rating: rev.rating,
          text: rev.text,
          authorName: rev.authorName,
          authorInitials: initials,
          authorRole: rev.authorRole
        };
      })
    : templateDefaults.reviews;

  const contactCTA: CTAAction = raw.phone
    ? { label: "Nhận báo giá ngay", href: `tel:${raw.phone.replace(/\s+/g, '')}` }
    : (raw.email ? { label: "Gửi Email báo giá", href: `mailto:${raw.email}` } : { label: "Nhận báo giá ngay", href: "#contact" });

  return {
    business: {
      name: raw.name || templateDefaults.business.name,
      phone: raw.phone || undefined,
      email: raw.email || undefined,
      address: raw.address || undefined,
      rating: raw.rating || undefined,
      ratingCount: raw.ratingCount || undefined,
    },
    template: {
      key: raw.templateKey || "construction-company",
      name: raw.templateKey === "construction-company" ? "Công ty Xây dựng" : "Unknown Template"
    },
    hero: {
      title: raw.heroTitle || templateDefaults.hero.title,
      description: raw.heroDescription || templateDefaults.hero.description,
      image: templateDefaults.hero.image,
      primaryAction: primaryCTA,
      secondaryAction: secondaryCTA
    },
    trust: templateDefaults.trust,
    about: {
      tagline: raw.aboutTagline || templateDefaults.about.tagline,
      title: raw.aboutTitle || templateDefaults.about.title,
      description1: raw.aboutDescription1 || templateDefaults.about.description1,
      description2: raw.aboutDescription2 || templateDefaults.about.description2,
      yearsOfExperience: raw.yearsOfExperience || templateDefaults.about.yearsOfExperience,
      experienceLabel: templateDefaults.about.experienceLabel,
      mission: templateDefaults.about.mission,
      coreValues: templateDefaults.about.coreValues
    },
    services,
    gallery,
    whyChooseUs: templateDefaults.whyChooseUs,
    reviews,
    contact: {
      title: templateDefaults.contact.title,
      description: templateDefaults.contact.description,
      primaryAction: contactCTA
    },
    seo: {
      title: `${raw.name || templateDefaults.business.name} | Xây Dựng Uy Tín`,
      description: raw.heroDescription || templateDefaults.hero.description
    }
  };
}
