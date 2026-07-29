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
  const name = clean(lead.name) || defaults.label;
  const address = clean(lead.formatted_address);
  const phone = clean(lead.formatted_phone_number);
  const email = clean(lead.facebook_email);
  const website = externalHref(lead.website);
  const facebookUrl = website ?? externalHref(lead.facebook_url);
  const heroImage = businessImage(lead, defaults.fallbackImages[0]);
  const mapQuery = address || name;
  const primaryAction = createPrimaryAction(lead, defaults);
  const secondaryAction: DemoCTA = {
    label: defaults.secondaryCtaLabel,
    href: mapHref(mapQuery),
    variant: "secondary"
  };

  const gallery = [
    heroImage,
    ...defaults.fallbackImages.filter((item) => item.src !== heroImage.src)
  ].slice(0, 4);

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
      email
    },
    template: {
      key: defaults.key,
      label: defaults.label,
      palette: defaults.palette
    },
    hero: {
      eyebrow: `Demo website ${defaults.label}`,
      title: defaults.heroTitle,
      subtitle: defaults.heroSubtitle,
      image: heroImage,
      primaryCta: primaryAction,
      secondaryCta: secondaryAction,
      primaryAction: primaryAction, // Alias for older templates
      secondaryAction: secondaryAction // Alias for older templates
    },
    trust: {
      rating: typeof lead.rating === "number" ? lead.rating : undefined,
      reviewCount: typeof lead.user_ratings_total === "number" ? lead.user_ratings_total : undefined,
      followers: typeof lead.facebook_followers === "number" ? lead.facebook_followers : undefined,
      badges: defaults.badges
    },
    about: {
      title: defaults.aboutTitle,
      body: defaults.aboutBody,
      highlights: defaults.highlights,
      image: defaults.fallbackImages[1] || heroImage,
      description1: defaults.aboutBody, // Alias for older templates
      description2: defaults.highlights.join(", "), // Alias for older templates
      stats: [ // Dummy stats for older templates
        { value: "10+", label: "Năm kinh nghiệm" },
        { value: "1000+", label: "Khách hàng" }
      ]
    },
    services: defaults.services,
    gallery,
    reviews:
      typeof lead.rating === "number" && (lead.user_ratings_total ?? 0) > 0
        ? [
            {
              author: "Khách hàng Google Maps",
              content: `${name} đang có đánh giá tích cực trên Google Maps. Phần review chi tiết có thể bổ sung sau khi dữ liệu được xác thực.`,
              rating: Math.round(lead.rating),
              source: "google"
            }
          ]
        : [],
    contact: {
      phone,
      email,
      address,
      mapQuery,
      facebookUrl,
      primaryAction,
      secondaryAction
    },
    seo: buildSeo(lead, defaults.key)
  };
}
