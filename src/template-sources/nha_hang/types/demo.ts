export interface BusinessData {
  name: string;
  logo?: string;
  phone?: string;
  address?: string;
  email?: string;
  mapUrl?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface TemplateData {
  key: string;
  name: string;
}

export interface HeroData {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface TrustBadge {
  icon: string;
  label: string;
}

export interface TrustData {
  rating: number;
  reviewsCount: number;
  badges: TrustBadge[];
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutData {
  badge?: string;
  title: string;
  content: string;
  italicQuote?: string;
  experienceYears?: number;
  image: string;
  stats?: AboutStat[];
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface GalleryItem {
  title: string;
  subtitle?: string;
  image: string;
}

export interface ReviewItem {
  author: string;
  content: string;
  rating: number;
  date?: string;
}

export interface ContactData {
  title: string;
  phone: string;
  address: string;
  workingHours: string;
  mapImage: string;
  mapLocation?: string;
  socialLinks?: {
    website?: string;
    email?: string;
    MessageCircle?: string;
  };
}

export interface SeoData {
  title: string;
  description: string;
}

export interface DemoPageData {
  business: BusinessData;
  template: TemplateData;
  hero: HeroData;
  trust: TrustData;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contact: ContactData;
  seo: SeoData;
}
