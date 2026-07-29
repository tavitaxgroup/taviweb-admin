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
  title: string;
  description: string;
  iconKey?: string;
};

export type DemoReview = {
  author: string;
  content: string;
  rating: number;
  source: "google" | "facebook" | "fallback";
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
  };
  template: {
    key: IndustryKey;
    label: string;
    palette: TemplatePalette;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: DemoImage;
    primaryCta: DemoCTA;
    secondaryCta?: DemoCTA;
    primaryAction?: DemoCTA;
    secondaryAction?: DemoCTA;
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
    image?: DemoImage;
    description1?: string;
    description2?: string;
    stats?: { value: string, label: string }[];
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
