"use client";

import type { ComponentType, CSSProperties } from "react";
import type { DemoPageData, IndustryKey } from "@/types/demo";
import AestheticClinicTemplate from "@/template-sources/tham_my_vien/components/demo/templates/AestheticClinicTemplate";
import AutoGarageTemplate from "@/template-sources/garage_oto/components/demo/templates/AutoGarageTemplate";
import CafeTemplate from "@/template-sources/quan_cafe/components/demo/templates/CafeTemplate";
import { CleaningServiceTemplate } from "@/template-sources/dich_vu_ve_sinh/components/demo/templates/CleaningServiceTemplate";
import { ConstructionCompanyTemplate } from "@/template-sources/cong_ty_xay_dung/components/demo/templates/ConstructionCompanyTemplate";
import DentalTemplate from "@/template-sources/nha_khoa/components/demo/templates/DentalTemplate";
import EnglishCenterTemplate from "@/template-sources/trung_tam_tieng_anh/components/demo/templates/EnglishCenterTemplate";
import FineDiningRestaurantTemplate from "@/template-sources/nha_hang/components/demo/templates/FineDiningRestaurantTemplate";
import GeneralClinicTemplate from "@/template-sources/phong_kham/components/demo/templates/GeneralClinicTemplate";
import GymFitnessTemplate from "@/template-sources/phong_gym/components/demo/templates/GymFitnessTemplate";
import HairSalonTemplate from "@/template-sources/salon_toc/components/demo/templates/HairSalonTemplate";
import InteriorDesignTemplate from "@/template-sources/noi_that/components/demo/templates/InteriorDesignTemplate";
import LawFirmTemplate from "@/template-sources/luat_su/components/demo/templates/LawFirmTemplate";
import SpaTemplate from "@/template-sources/spa/components/demo/templates/SpaTemplate";
import WeddingStudioTemplate from "@/template-sources/studio_chup_anh/components/demo/templates/WeddingStudioTemplate";

import { buildDemoPageData as buildConstructionBase } from "@/template-sources/cong_ty_xay_dung/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildCleaningBase } from "@/template-sources/dich_vu_ve_sinh/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildGarageBase } from "@/template-sources/garage_oto/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildLawFirmBase } from "@/template-sources/luat_su/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildRestaurantBase } from "@/template-sources/nha_hang/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildDentalBase } from "@/template-sources/nha_khoa/lib/demo/buildDemoPageData";
import { getMockDemoData as getDentalRawBase } from "@/template-sources/nha_khoa/lib/demo/mockDemoData";
import { buildDemoPageData as buildInteriorBase } from "@/template-sources/noi_that/lib/demo/buildDemoPageData";
import { getMockBusinessByPlaceId as getGymBase } from "@/template-sources/phong_gym/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildClinicBase } from "@/template-sources/phong_kham/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildCafeBase } from "@/template-sources/quan_cafe/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildSalonBase } from "@/template-sources/salon_toc/lib/demo/buildDemoPageData";
import { getMockDemoData as getSpaBase } from "@/template-sources/spa/lib/demo/mockDemoData";
import { buildDemoPageData as buildWeddingBase } from "@/template-sources/studio_chup_anh/lib/demo/buildDemoPageData";
import { getDefaultBusiness as getWeddingRawBase } from "@/template-sources/studio_chup_anh/lib/demo/mockDemoData";
import { getMockDemoData as getAestheticBase } from "@/template-sources/tham_my_vien/lib/demo/mockDemoData";
import { buildDemoPageData as buildEnglishBase } from "@/template-sources/trung_tam_tieng_anh/lib/demo/buildDemoPageData";

type StudioTemplateProps = {
  data: unknown;
};

const studioTemplateRegistry: Record<IndustryKey, ComponentType<StudioTemplateProps>> = {
  phong_kham: GeneralClinicTemplate as ComponentType<StudioTemplateProps>,
  quan_cafe: CafeTemplate as ComponentType<StudioTemplateProps>,
  garage_oto: AutoGarageTemplate as ComponentType<StudioTemplateProps>,
  tham_my_vien: AestheticClinicTemplate as ComponentType<StudioTemplateProps>,
  nha_hang: FineDiningRestaurantTemplate as ComponentType<StudioTemplateProps>,
  noi_that: InteriorDesignTemplate as ComponentType<StudioTemplateProps>,
  spa: SpaTemplate as ComponentType<StudioTemplateProps>,
  cong_ty_xay_dung: ConstructionCompanyTemplate as ComponentType<StudioTemplateProps>,
  luat_su: LawFirmTemplate as ComponentType<StudioTemplateProps>,
  dich_vu_ve_sinh: CleaningServiceTemplate as ComponentType<StudioTemplateProps>,
  salon_toc: HairSalonTemplate as ComponentType<StudioTemplateProps>,
  nha_khoa: DentalTemplate as ComponentType<StudioTemplateProps>,
  studio_chup_anh: WeddingStudioTemplate as ComponentType<StudioTemplateProps>,
  trung_tam_tieng_anh: EnglishCenterTemplate as ComponentType<StudioTemplateProps>,
  phong_gym: GymFitnessTemplate as ComponentType<StudioTemplateProps>
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function asTelHref(phone?: string) {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#contact";
}

function normalizeExternalHref(value?: string) {
  let url = value?.trim();
  if (!url) return undefined;
  url = url.replace(/^https?:\/\//i, "");
  url = url.replace(/^https?:\/+/i, "");
  url = url.replace(/^https\/+/i, "");
  url = url.replace(/^http\/+/i, "");
  url = url.replace(/^\/+/, "");
  return `https://${url}`;
}

function normalizeFacebookLabel(label?: string, fallback = "Liên hệ Facebook") {
  return (label || fallback).replace(/MessageCircle/g, "Facebook");
}

function shouldUseFacebookAction(action?: { label?: string; href?: string }) {
  const label = action?.label ?? "";
  const href = action?.href ?? "";
  return /facebook|messagecircle/i.test(`${label} ${href}`);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripBusinessNameFromHeroTitle(title?: string, names: Array<string | undefined> = [], fallback?: string) {
  let output = title?.replace(/\s+/g, " ").trim() ?? "";

  for (const name of names) {
    const normalizedName = name?.replace(/\s+/g, " ").trim();
    if (!normalizedName) continue;
    const escapedName = escapeRegExp(normalizedName);
    output = output
      .replace(new RegExp(`^${escapedName}\\s*[-|–—:]\\s*`, "i"), "")
      .replace(new RegExp(`\\s*[-|–—:]\\s*${escapedName}$`, "i"), "")
      .replace(new RegExp(`\\s+(tại|tai|at)\\s+${escapedName}$`, "i"), "")
      .replace(new RegExp(`\\s+(tại|tai|at)\\s+${escapedName}\\s*,?\\s*`, "i"), " $1 ")
      .replace(new RegExp(`\\b${escapedName}\\b`, "i"), "")
      .replace(new RegExp(`^${escapedName}$`, "i"), "")
      .replace(/\s+,/g, ",")
      .replace(/,\s*$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (output) return output;
  if (fallback && fallback !== title) return stripBusinessNameFromHeroTitle(fallback, names);
  return fallback?.trim() || title?.trim() || "";
}

function getDisplayName(name: string, maxLength = 72) {
  const normalized = name.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const words = normalized.split(" ");
  let output = "";

  for (const word of words) {
    const next = output ? `${output} ${word}` : word;
    if (next.length > maxLength - 3) break;
    output = next;
  }

  return `${output || normalized.slice(0, maxLength - 3)}...`;
}

function getOriginalStudioData(templateKey: IndustryKey): Record<string, any> {
  const fallbackPlaceId = "__template_preview__";

  switch (templateKey) {
    case "phong_kham":
      return clone(buildClinicBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "quan_cafe":
      return clone(buildCafeBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "garage_oto":
      return clone(buildGarageBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "tham_my_vien":
      return clone(getAestheticBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "nha_hang":
      return clone(buildRestaurantBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "noi_that":
      return clone(buildInteriorBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "spa":
      return clone(getSpaBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "cong_ty_xay_dung":
      return clone(buildConstructionBase() as unknown as Record<string, any>);
    case "luat_su":
      return clone(buildLawFirmBase() as unknown as Record<string, any>);
    case "dich_vu_ve_sinh":
      return clone(buildCleaningBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "salon_toc":
      return clone(buildSalonBase(fallbackPlaceId) as unknown as Record<string, any>);
    case "nha_khoa":
      return clone(buildDentalBase(getDentalRawBase(fallbackPlaceId)) as unknown as Record<string, any>);
    case "studio_chup_anh":
      return clone(buildWeddingBase(getWeddingRawBase()) as unknown as Record<string, any>);
    case "trung_tam_tieng_anh":
      return clone(buildEnglishBase({}) as unknown as Record<string, any>);
    case "phong_gym":
      return clone(getGymBase(fallbackPlaceId) as unknown as Record<string, any>);
    default:
      return clone(buildClinicBase(fallbackPlaceId) as unknown as Record<string, any>);
  }
}

function replaceTextDeep(value: unknown, replacements: Array<[string | undefined, string | undefined]>): unknown {
  if (typeof value === "string") {
    return replacements.reduce((current, [from, to]) => {
      if (!from || !to || from === to) return current;
      return current.split(from).join(to);
    }, value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceTextDeep(item, replacements));
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      output[key] = replaceTextDeep(nested, replacements);
    }
    return output;
  }

  return value;
}

function applyLeadIdentity(baseData: Record<string, any>, leadData: DemoPageData) {
  const originalBusiness = baseData.business ?? {};
  const originalHeroTitle = baseData.hero?.title;
  const lead = leadData.business;
  const fullName = lead.name;
  const rating = leadData.trust.rating;
  const reviewCount = leadData.trust.reviewCount;
  const followers = leadData.trust.followers;

  const replaced = replaceTextDeep(baseData, [
    [originalBusiness.name, fullName],
    [originalBusiness.logoText, fullName],
    ["AURA CLINIC", fullName],
    ["Aura Clinic", fullName],
    ["Lumina Spa", fullName],
    [originalBusiness.phone, lead.phone],
    [originalBusiness.address, lead.address],
    [originalBusiness.email, lead.email],
    [originalBusiness.facebook, lead.facebookUrl],
    [originalBusiness.facebookUrl, lead.facebookUrl],
    [originalBusiness.MessageCircle, lead.facebookUrl]
  ]) as Record<string, any>;

  replaced.business = {
    ...(replaced.business ?? {}),
    id: lead.id,
    placeId: lead.placeId,
    place_id: lead.placeId,
    name: fullName,
    fullName,
    phone: lead.phone ?? replaced.business?.phone,
    phoneAlt: lead.phone ?? replaced.business?.phoneAlt,
    email: lead.email ?? replaced.business?.email,
    logoText: fullName,
    address: lead.address ?? replaced.business?.address,
    facebook: lead.facebookUrl ?? replaced.business?.facebook,
    facebookUrl: lead.facebookUrl ?? replaced.business?.facebookUrl,
    MessageCircle: lead.facebookUrl ?? replaced.business?.MessageCircle,
    rating: rating ?? replaced.business?.rating,
    reviewCount: reviewCount ?? replaced.business?.reviewCount,
    followers: followers ?? replaced.business?.followers,
    facebookFollowers: followers ?? replaced.business?.facebookFollowers
  };

  replaced.template = {
    ...(replaced.template ?? {}),
    key: leadData.template.key,
    name: replaced.template?.name ?? leadData.template.label,
    label: leadData.template.label
  };

  if (replaced.hero) {
    replaced.hero.title = stripBusinessNameFromHeroTitle(replaced.hero.title, [
      fullName,
      originalBusiness.name,
      originalBusiness.logoText,
      originalHeroTitle,
      "AURA CLINIC",
      "Aura Clinic",
      "Lumina Spa"
    ], leadData.hero.title);
  }

  if (replaced.contact) {
    replaced.contact = {
      ...replaced.contact,
      phone: lead.phone ?? replaced.contact.phone,
      phoneAlt: lead.phone ?? replaced.contact.phoneAlt,
      email: lead.email ?? replaced.contact.email,
      address: lead.address ?? replaced.contact.address,
      facebook: lead.facebookUrl ?? replaced.contact.facebook,
      facebookUrl: lead.facebookUrl ?? replaced.contact.facebookUrl,
      MessageCircle: lead.facebookUrl ?? replaced.contact.MessageCircle
    };

    if (lead.phone && replaced.contact.primaryAction) {
      replaced.contact.primaryAction = {
        ...replaced.contact.primaryAction,
        href: asTelHref(lead.phone)
      };
    }

    if (lead.phone && replaced.contact.phoneAction) {
      replaced.contact.phoneAction = {
        ...replaced.contact.phoneAction,
        href: asTelHref(lead.phone)
      };
    }
  }

  replaced.seo = {
    ...(replaced.seo ?? {}),
    title: leadData.seo.title,
    description: leadData.seo.description,
    noindex: leadData.seo.noindex
  };

  return addCompatibilityFields(replaced, leadData);
}

function firstImageFrom(baseData: Record<string, any>) {
  return (
    baseData.hero?.image ??
    baseData.hero?.bgImage ??
    baseData.about?.image ??
    baseData.gallery?.[0]?.image ??
    baseData.gallery?.[0] ??
    undefined
  );
}

function addCompatibilityFields(baseData: Record<string, any>, leadData: DemoPageData) {
  const firstImage = firstImageFrom(baseData);
  const rating = leadData.trust.rating ?? baseData.business?.rating ?? 4.8;
  const reviewCount = leadData.trust.reviewCount ?? baseData.business?.reviewCount ?? 120;
  const followers = leadData.trust.followers ?? baseData.business?.followers ?? 1200;
  const facebookHref =
    normalizeExternalHref(
      leadData.business.facebookUrl ??
        baseData.business?.facebookUrl ??
        baseData.business?.facebook ??
        baseData.business?.MessageCircle ??
        baseData.contact?.facebookUrl ??
        baseData.contact?.facebook ??
        baseData.contact?.MessageCircle
    );
  const statValues = [
    { value: Number(rating).toFixed(1), label: "Google rating" },
    { value: `${reviewCount}+`, label: "reviews" },
    { value: `${Number(followers).toLocaleString("vi-VN")}+`, label: "followers" }
  ];

  if (baseData.hero) {
    const primaryAction =
      baseData.hero.primaryAction ??
      baseData.hero.primaryCta ??
      leadData.hero.primaryCta ??
      leadData.contact.primaryAction;
    const secondaryAction =
      baseData.hero.secondaryAction ??
      baseData.hero.secondaryCta ??
      leadData.hero.secondaryCta ??
      leadData.contact.secondaryAction;

    baseData.hero.bgImage ??= baseData.hero.image ?? firstImage;
    baseData.hero.backgroundImage ??=
      leadData.template.key === "quan_cafe" ? baseData.hero.image ?? firstImage : baseData.hero.image?.src ?? firstImage?.src;
    baseData.hero.primaryAction = {
      label: primaryAction?.label || leadData.contact.primaryAction.label,
      href: primaryAction?.href || leadData.contact.primaryAction.href
    };
    baseData.hero.secondaryAction =
      facebookHref && shouldUseFacebookAction(secondaryAction)
        ? {
            label: normalizeFacebookLabel(secondaryAction?.label, "Liên hệ Facebook"),
            href: facebookHref
          }
        : secondaryAction
          ? {
              label: secondaryAction.label || leadData.contact.secondaryAction?.label || "Xem thêm",
              href: secondaryAction.href || leadData.contact.secondaryAction?.href || "#contact"
            }
          : undefined;
    baseData.hero.primaryCta ??= baseData.hero.primaryAction;
    baseData.hero.secondaryCta ??= baseData.hero.secondaryAction;
    baseData.hero.primaryCtaText ??= baseData.hero.primaryAction.label;
    baseData.hero.secondaryCtaText ??= baseData.hero.secondaryAction?.label ?? "Xem dịch vụ";
    baseData.hero.stats ??= {
      badge: "Thông tin nổi bật",
      title: leadData.template.label,
      values: statValues
    };
  }

  if (baseData.trust) {
    baseData.trust.metrics ??= statValues.map((item) => ({ value: item.value, label: item.label.toUpperCase() }));
    baseData.trust.items ??= [
      { icon: "Star", value: statValues[0].value, label: "Google rating" },
      { icon: "MessageCircle", value: `${reviewCount}+`, label: "Đánh giá" },
      { icon: "Users", value: `${Number(followers).toLocaleString("vi-VN")}+`, label: "Theo dõi" }
    ];
    baseData.trust.achievements ??= leadData.trust.badges;
  }

  if (baseData.about) {
    baseData.about.stats ??= statValues;
    baseData.about.points ??= baseData.about.points ?? baseData.about.features ?? leadData.about.highlights;
    baseData.about.features ??= baseData.about.features ?? baseData.about.points ?? leadData.about.highlights;
    baseData.about.content ??= [baseData.about.description, baseData.about.description1, baseData.about.description2]
      .filter(Boolean)
      .join("\n\n");
  }

  if (Array.isArray(baseData.services)) {
    baseData.services = baseData.services.map((service: Record<string, any>, index: number) => ({
      ...service,
      id: service.id ?? `service-${index}`,
      icon: service.icon ?? service.iconName ?? "Sparkles",
      iconName: service.iconName ?? service.icon ?? "Sparkles"
    }));
  }

  if (Array.isArray(baseData.gallery)) {
    baseData.gallery = baseData.gallery.map((item: Record<string, any>, index: number) => ({
      ...item,
      id: item.id ?? `gallery-${index}`,
      title: item.title ?? item.caption ?? item.image?.alt ?? `Gallery ${index + 1}`,
      category: item.category ?? item.caption ?? item.image?.alt ?? "Gallery"
    }));
  }

  if (Array.isArray(baseData.reviews)) {
    baseData.reviews = baseData.reviews.map((review: Record<string, any>, index: number) => {
      const author = review.authorName ?? review.author ?? "Khách hàng";
      return {
        ...review,
        id: review.id ?? `review-${index}`,
        author,
        authorName: author,
        authorInitials:
          review.authorInitials ??
          author
            .split(" ")
            .map((part: string) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        text: review.text ?? review.content,
        content: review.content ?? review.text,
        role: review.role ?? review.authorRole ?? "Khách hàng",
        vehicle: review.vehicle ?? leadData.business.industry
      };
    });
  }

  if (baseData.contact) {
    const primaryAction =
      baseData.contact.primaryAction ??
      leadData.contact.primaryAction ??
      baseData.hero?.primaryAction;
    const secondaryAction =
      baseData.contact.secondaryAction ??
      leadData.contact.secondaryAction ??
      baseData.hero?.secondaryAction;

    baseData.contact.features ??= leadData.about.highlights;
    baseData.contact.location ??= baseData.contact.address ?? getDisplayName(leadData.business.name);
    baseData.contact.hours ??= ["Thứ 2 - Thứ 6: 8:00 - 17:00", "Thứ 7: 8:00 - 11:30", "Chủ nhật: Nghỉ"];
    baseData.contact.mapImage ??= leadData.template.key === "garage_oto" ? firstImage : firstImage?.src;
    baseData.contact.primaryAction = {
      label: primaryAction?.label || leadData.contact.primaryAction.label,
      href: primaryAction?.href || leadData.contact.primaryAction.href
    };
    baseData.contact.secondaryAction =
      facebookHref
        ? {
            label: shouldUseFacebookAction(secondaryAction) ? normalizeFacebookLabel(secondaryAction?.label, "Liên hệ Facebook") : "Liên hệ Facebook",
            href: facebookHref
          }
        : secondaryAction
          ? {
              label: secondaryAction.label || leadData.contact.secondaryAction?.label || "Xem bản đồ",
              href: secondaryAction.href || leadData.contact.secondaryAction?.href || "#contact"
            }
          : undefined;
  }

  baseData.stats ??= statValues;
  baseData.hours ??= baseData.contact?.hours;
  baseData.whyChooseUs ??= {
    items: leadData.about.highlights.map((item, index) => ({
      id: `why-${index}`,
      icon: ["ShieldCheck", "Sparkles", "MapPin"][index % 3],
      title: item,
      description: "Thông tin này được tự động cá nhân hóa theo ngành và dữ liệu lead."
    }))
  };

  return baseData;
}

function toStudioTemplateData(data: DemoPageData) {
  const originalTemplateData = getOriginalStudioData(data.template.key);
  return applyLeadIdentity(originalTemplateData, data);
}

function getTemplateThemeStyle(templateKey: IndustryKey): CSSProperties {
  const sharedSpa = {
    "--color-primary": "#9a3b54",
    "--color-on-primary": "#ffffff",
    "--color-primary-container": "#b9536c",
    "--color-on-primary-container": "#fffbff",
    "--color-secondary": "#6f5a4c",
    "--color-on-secondary": "#ffffff",
    "--color-secondary-container": "#f7dac8",
    "--color-on-secondary-container": "#745e50",
    "--color-tertiary": "#4a624c",
    "--color-on-tertiary": "#ffffff",
    "--color-tertiary-container": "#637b64",
    "--color-on-tertiary-container": "#f7fff3",
    "--color-background": "#fdf9f5",
    "--color-on-background": "#1c1c19",
    "--color-surface": "#fdf9f5",
    "--color-on-surface": "#1c1c19",
    "--color-surface-container-low": "#f7f3ef",
    "--color-surface-container": "#f1ede9",
    "--color-surface-container-high": "#ebe7e4",
    "--color-surface-container-highest": "#e5e2de",
    "--color-surface-container-lowest": "#ffffff",
    "--color-outline": "#887275",
    "--color-outline-variant": "#dac0c4"
  } as CSSProperties;

  if (templateKey === "noi_that") {
    return {
      "--color-brand-primary": "#0a1422",
      "--color-brand-secondary": "#725a43",
      "--color-brand-accent": "#6b7a40",
      "--color-brand-bg": "#fcf9f4",
      "--color-brand-bg-card": "#ffffff",
      "--color-brand-bg-container": "#f2ede5",
      "--color-brand-bg-low": "#f8f4ed",
      "--color-brand-outline": "#d8cbbb"
    } as CSSProperties;
  }

  if (templateKey === "studio_chup_anh") {
    return {
      "--color-brand-primary": "#834767",
      "--color-brand-secondary": "#6c5962",
      "--color-brand-accent": "#e1c292",
      "--color-brand-bg": "#fff8f8",
      "--color-brand-bg-card": "#ffffff",
      "--color-brand-bg-container": "#fef0f4",
      "--color-brand-bg-low": "#fff8f8",
      "--color-brand-outline": "#e1c292"
    } as CSSProperties;
  }

  if (templateKey === "spa") return sharedSpa;

  return {
    "--color-brand-primary": "#60233f",
    "--color-brand-secondary": "#6f595e",
    "--color-brand-accent": "#4a3602",
    "--color-brand-accent-light": "#ffdf9e",
    "--color-brand-bg": "#fff8fa",
    "--color-brand-bg-card": "#ffffff",
    "--color-brand-bg-container": "#f3ecee",
    "--color-brand-bg-low": "#f9f2f4",
    "--color-brand-outline": "#d6c1c7",
    ...sharedSpa
  } as CSSProperties;
}

export function StudioTemplateRenderer({ data }: { data: DemoPageData }) {
  const Template = studioTemplateRegistry[data.template.key] ?? GeneralClinicTemplate;
  return (
    <div className="template-render-root" style={getTemplateThemeStyle(data.template.key)}>
      <Template data={toStudioTemplateData(data)} />
    </div>
  );
}
