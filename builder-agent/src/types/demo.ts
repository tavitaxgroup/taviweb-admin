export type IndustryKey =
  | "phong_kham"
  | "quan_cafe"
  | "garage_oto"
  | "tham_my_vien"
  | "nha_hang"
  | "noi_that"
  | "spa"
  | "cong_ty_xay_dung"
  | "luat_su"
  | "dich_vu_ve_sinh"
  | "salon_toc"
  | "nha_khoa"
  | "studio_chup_anh"
  | "trung_tam_tieng_anh"
  | "phong_gym";

export type DemoStatus =
  | "pending"
  | "ready"
  | "failed"
  | "approved"
  | "sent"
  | "hidden";

export type OutreachStatus =
  | "not_sent"
  | "queued"
  | "sent"
  | "replied"
  | "bounced"
  | "do_not_contact";

export type BusinessLead = {
  id: string;
  place_id: string;
  industry: string | null;
  status?: string | null;
  name: string | null;
  formatted_address?: string | null;
  formatted_phone_number?: string | null;
  website?: string | null;
  image_url?: string | null;
  rating?: number | null;
  user_ratings_total?: number | null;
  facebook_url?: string | null;
  facebook_followers?: number | null;
  facebook_email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  demo_url?: string | null;
  demo_status?: DemoStatus | string | null;
  outreach_status?: OutreachStatus | string | null;
  notes?: string | null;
  template_data?: any;
};

export type DemoImage = {
  src: string;
  alt: string;
  source: "business" | "facebook" | "fallback";
};

export type DemoCTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type DemoService = {
  title?: string;
  name?: string;
  description?: string;
  category?: string;
  iconKey?: string;
  iconName?: string;
  icon?: string;
  [key: string]: any;
};

export type DemoReview = {
  author?: string;
  role?: string;
  content?: string;
  text?: string;
  quote?: string;
  rating?: number;
  source?: "google" | "facebook" | "fallback" | string;
  [key: string]: any;
};

export type DemoPageData = {
  business: {
    id: string;
    placeId: string;
    name: string;
    industry: string;
    address?: string;
    phone?: string;
    website?: string;
    facebookUrl?: string;
    email?: string;
    logoUrl?: string;
    aboutImageUrl?: string;
  };
  template: {
    key: IndustryKey;
    label: string;
    palette: TemplatePalette;
    customData?: Record<string, any>;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: DemoImage;
    images?: DemoImage[];
    primaryCta: DemoCTA;
    secondaryCta?: DemoCTA;
  };
  trust: {
    rating?: number;
    reviewCount?: number;
    followers?: number;
    badges: string[];
  };
  about: {
    title: string;
    body: string;
    highlights: string[];
  };
  services: DemoService[];
  gallery: DemoImage[];
  reviews: DemoReview[];
  contact: {
    phone?: string;
    email?: string;
    address?: string;
    mapQuery: string;
    facebookUrl?: string;
    primaryAction: DemoCTA;
    secondaryAction?: DemoCTA;
  };
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    noindex: boolean;
  };
};

export type DemoTemplateProps = {
  data: DemoPageData;
};

export type TemplatePalette = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
};

export type TemplateDefaults = {
  key: IndustryKey;
  label: string;
  shortLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutBody: string;
  services: DemoService[];
  highlights: string[];
  badges: string[];
  fallbackImages: DemoImage[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  palette: TemplatePalette;
};

export type WebsiteOverrides = {
  hero?: {
    title?: string;
    subtitle?: string;
    eyebrow?: string;
    badge?: string;
    image?: DemoImage;
  };
  hero_images?: string[];
  about?: {
    title?: string;
    body?: string;
    description?: string;
    highlights?: string[];
    image?: DemoImage;
  };
  about_image?: string;
  services?: any[];
  gallery?: any[];
  gallery_urls?: string[];
  reviews?: any[];
  trust?: {
    badges?: string[];
    rating?: number;
    reviewCount?: number;
    followers?: number;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
    mapQuery?: string;
    facebookUrl?: string;
    MessageCircle?: string;
    [key: string]: any;
  };
  [key: string]: any;
};
