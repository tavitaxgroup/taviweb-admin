import type { BusinessLead, DemoCTA, DemoImage, DemoPageData, IndustryKey } from "@/types/demo";
import { buildSeo } from "./seo";
import { getTemplateDefaults } from "./templateDefaults";
import { routeTemplateByIndustry } from "./templateRouter";

function clean(value?: string | null) {
  return value?.trim() || undefined;
}

function externalHref(value?: string | null) {
  let url = clean(value);
  if (!url) return undefined;
  url = url
    .replace(/^https?:\/\//i, "")
    .replace(/^https?:\/+/i, "")
    .replace(/^https\/+/i, "")
    .replace(/^http\/+/i, "")
    .replace(/^\/+/, "");
  return `https://${url}`;
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function mapHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function createPrimaryAction(lead: BusinessLead, defaults: ReturnType<typeof getTemplateDefaults>): DemoCTA {
  const phone = clean(lead.formatted_phone_number);
  if (phone) return { label: defaults.primaryCtaLabel, href: telHref(phone), variant: "primary" };

  const facebookUrl = externalHref(lead.website) ?? externalHref(lead.facebook_url);
  if (facebookUrl) return { label: "Nhắn Facebook", href: facebookUrl, variant: "primary" };

  const email = clean(lead.facebook_email);
  if (email) return { label: "Gửi email", href: `mailto:${email}`, variant: "primary" };

  const query = clean(lead.formatted_address) || clean(lead.name) || defaults.label;
  return { label: defaults.secondaryCtaLabel, href: mapHref(query), variant: "primary" };
}

function businessImage(lead: BusinessLead, fallback: DemoImage): DemoImage {
  const src = clean(lead.image_url);
  if (!src) return fallback;
  return {
    src,
    alt: `Hình ảnh của ${clean(lead.name) || "doanh nghiệp"}`,
    source: "business"
  };
}

export function buildDemoPageData(lead: BusinessLead, forcedTemplateKey?: IndustryKey): DemoPageData {
  const templateKey = forcedTemplateKey ?? routeTemplateByIndustry(lead.industry);
  const defaults = getTemplateDefaults(templateKey);

  // Safely parse template_data JSON
  let customData: Record<string, any> | undefined = undefined;
  if (lead.template_data) {
    try {
      customData = typeof lead.template_data === "string" 
        ? JSON.parse(lead.template_data) 
        : lead.template_data;
    } catch (e) {
      console.error("Failed to parse template_data JSON:", e);
    }
  }

  const isMockPreview = lead.place_id?.startsWith("mock-");

  const name = isMockPreview ? "[business.name]" : (clean(lead.name) || defaults.label);
  const address = isMockPreview ? "[contact.address]" : clean(lead.formatted_address);
  const phone = isMockPreview ? "[contact.phone]" : clean(lead.formatted_phone_number);
  const email = isMockPreview ? "[contact.email]" : clean(lead.facebook_email);
  const website = isMockPreview ? "https://[contact.website]" : externalHref(lead.website);
  const facebookUrl = isMockPreview ? "https://[contact.MessageCircle]" : (website ?? externalHref(lead.facebook_url));
  const heroImage = isMockPreview
    ? { src: `https://placehold.co/1200x600/073b8e/ffffff?text=[hero_image]`, alt: "[hero_image]", source: "fallback" as const }
    : businessImage(lead, defaults.fallbackImages[0]);
  const mapQuery = address || name;
  const primaryAction = createPrimaryAction(lead, defaults);
  const secondaryAction: DemoCTA = {
    label: defaults.secondaryCtaLabel,
    href: mapHref(mapQuery),
    variant: "secondary"
  };

  const dbGalleryUrls = Array.isArray((lead as any).gallery_urls) ? (lead as any).gallery_urls : [];
  const gallery = isMockPreview
    ? [
        { src: `https://placehold.co/600x400/073b8e/ffffff?text=[gallery_urls[0]]`, alt: "[gallery_urls[0]]", source: "fallback" as const },
        { src: `https://placehold.co/600x400/073b8e/ffffff?text=[gallery_urls[1]]`, alt: "[gallery_urls[1]]", source: "fallback" as const },
        { src: `https://placehold.co/600x400/073b8e/ffffff?text=[gallery_urls[2]]`, alt: "[gallery_urls[2]]", source: "fallback" as const },
        { src: `https://placehold.co/600x400/073b8e/ffffff?text=[gallery_urls[3]]`, alt: "[gallery_urls[3]]", source: "fallback" as const }
      ]
    : (dbGalleryUrls.length > 0
        ? dbGalleryUrls.map((url: string, index: number) => ({
            src: url,
            alt: `Hình ảnh hoạt động ${index + 1} của ${name}`,
            source: "business" as const
          }))
        : [
            heroImage,
            ...defaults.fallbackImages.filter((item) => item.src !== heroImage.src)
          ].slice(0, 4));

  // Assemble highlights from individual database fields if present
  const dbHighlights: string[] = [];
  const ht1 = clean((lead as any).highlight_title_1);
  const hd1 = clean((lead as any).highlight_desc_1);
  if (ht1) dbHighlights.push(`${ht1}${hd1 ? `: ${hd1}` : ""}`);
  
  const ht2 = clean((lead as any).highlight_title_2);
  const hd2 = clean((lead as any).highlight_desc_2);
  if (ht2) dbHighlights.push(`${ht2}${hd2 ? `: ${hd2}` : ""}`);

  const ht3 = clean((lead as any).highlight_title_3);
  const hd3 = clean((lead as any).highlight_desc_3);
  if (ht3) dbHighlights.push(`${ht3}${hd3 ? `: ${hd3}` : ""}`);

  const finalHighlights = dbHighlights.length > 0 
    ? dbHighlights 
    : (Array.isArray((lead as any).highlights) ? (lead as any).highlights : defaults.highlights);

  return {
    business: {
      id: lead.id,
      placeId: lead.place_id,
      name,
      industry: defaults.label,
      address,
      phone,
      website,
      facebookUrl,
      email,
      logoUrl: isMockPreview 
        ? `https://placehold.co/120x120/073b8e/ffffff?text=[logo_url]` 
        : clean((lead as any).logo_url),
      aboutImageUrl: isMockPreview 
        ? `https://placehold.co/600x400/073b8e/ffffff?text=[about_image]` 
        : clean((lead as any).about_image_url)
    },
    template: {
      key: defaults.key,
      label: defaults.label,
      palette: defaults.palette,
      customData
    },
    hero: {
      eyebrow: isMockPreview ? "[hero.eyebrow]" : `Demo website ${defaults.label}`,
      title: isMockPreview ? "[hero.title]" : defaults.heroTitle,
      subtitle: isMockPreview ? "[hero.subtitle]" : defaults.heroSubtitle,
      image: heroImage,
      primaryCta: isMockPreview ? { label: "[hero.primaryCta.label]", href: "#" } : primaryAction,
      secondaryCta: isMockPreview ? { label: "[hero.secondaryCta.label]", href: "#" } : secondaryAction
    },
    trust: {
      rating: isMockPreview ? 5.0 : (typeof lead.rating === "number" ? lead.rating : undefined),
      reviewCount: isMockPreview ? 999 : (typeof lead.user_ratings_total === "number" ? lead.user_ratings_total : undefined),
      followers: isMockPreview ? 9999 : (typeof lead.facebook_followers === "number" ? lead.facebook_followers : undefined),
      badges: isMockPreview 
        ? ["[trust.badges[0]]", "[trust.badges[1]]", "[trust.badges[2]]"] 
        : (defaults.badges ?? [])
    },
    about: {
      title: isMockPreview ? "[about.title]" : defaults.aboutTitle,
      body: isMockPreview ? "[about.body]" : defaults.aboutBody,
      highlights: isMockPreview 
        ? [
            "[about.highlights[0]]",
            "[about.highlights[1]]",
            "[about.highlights[2]]"
          ] 
        : finalHighlights
    },
    services: isMockPreview
      ? [
          { 
            id: "s1", 
            title: "[services[0].title]", 
            name: "[services[0].title]", 
            category: "[services[0].category]", 
            description: "[services[0].description]", 
            icon: "Target", 
            iconName: "Target",
            image: { src: "https://placehold.co/300x200/073b8e/ffffff?text=[services[0].image]", alt: "s1" } 
          } as any,
          { 
            id: "s2", 
            title: "[services[1].title]", 
            name: "[services[1].title]", 
            category: "[services[1].category]", 
            description: "[services[1].description]", 
            icon: "Sparkles", 
            iconName: "Sparkles",
            image: { src: "https://placehold.co/300x200/073b8e/ffffff?text=[services[1].image]", alt: "s2" } 
          } as any
        ]
      : defaults.services,
    gallery,
    reviews: isMockPreview
      ? [
          { 
            id: "r1", 
            author: "[reviews[0].author]", 
            content: "[reviews[0].text]", 
            text: "[reviews[0].text]", 
            rating: 5, 
            source: "google" as const, 
            role: "[reviews[0].role]" 
          } as any
        ]
      : (typeof lead.rating === "number" && (lead.user_ratings_total ?? 0) > 0
          ? [
              {
                author: "Khách hàng Google Maps",
                content: `${name} đang có đánh giá tích cực trên Google Maps. Phần review chi tiết có thể bổ sung sau khi dữ liệu được xác thực.`,
                rating: Math.round(lead.rating),
                source: "google"
              }
            ]
          : []),
    contact: {
      phone,
      email,
      address,
      mapQuery: isMockPreview ? "[contact.mapQuery]" : mapQuery,
      facebookUrl,
      primaryAction: isMockPreview ? { label: "[contact.primaryAction.label]", href: "#" } : primaryAction,
      secondaryAction: isMockPreview ? { label: "[contact.secondaryAction.label]", href: "#" } : secondaryAction
    },
    seo: isMockPreview
      ? { title: "[seo.title]", description: "[seo.description]", canonicalPath: "#", noindex: true }
      : buildSeo(lead, defaults.key)
  };
}
