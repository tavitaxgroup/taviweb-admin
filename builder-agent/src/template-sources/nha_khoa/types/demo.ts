export interface BusinessInfo {
  name: string;
  phone?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  placeId: string;
  area?: string;
  logoUrl?: string;
}

export interface TemplateInfo {
  key: string;
  name: string;
  theme?: string;
}

export interface ImageObject {
  src: string;
  alt: string;
}

export interface ActionButton {
  label: string;
  href: string;
  type?: 'primary' | 'secondary' | 'tel' | 'link';
}

export interface HeroInfo {
  badge?: string;
  title: string;
  subtitle: string;
  image: ImageObject;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface TrustInfo {
  metrics: TrustMetric[];
  ratingText?: string;
  reviewCountText?: string;
}

export interface AboutInfo {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  image: ImageObject;
  features?: string[];
}

export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name, e.g. "Stethoscope", "Sparkles", etc.
}

export interface GalleryItem {
  id: string;
  image: ImageObject;
  caption?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google' | 'MessageCircle' | 'Clinic';
  rating: number;
  text: string;
  date?: string;
  serviceUsed?: string;
}

export interface ContactInfo {
  title: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
}

export interface SeoInfo {
  title: string;
  description: string;
  noindex: boolean;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: TemplateInfo;
  hero: HeroInfo;
  trust: TrustInfo;
  about: AboutInfo;
  services: ServiceInfo[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contact: ContactInfo;
  seo: SeoInfo;
}
