export interface BusinessInfo {
  id: string;
  name: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  rating?: number;
  followers?: string;
  students?: string;
}

export interface TemplateInfo {
  key: string;
  themeName?: string;
}

export interface ActionButton {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  image: ImageAsset;
  primaryAction: ActionButton;
  secondaryAction: ActionButton;
}

export interface TrustData {
  studentsCount: string;
  rating: number;
  followersCount: string;
}

export interface AboutFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutData {
  title: string;
  description: string;
  image: ImageAsset;
  features?: AboutFeature[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface ContactData {
  title: string;
  description: string;
  phone: string;
  facebookUrl?: string;
  mapImageUrl?: string;
  mapLocation?: string;
  primaryAction: ActionButton;
}

export interface SeoData {
  title: string;
  description: string;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: TemplateInfo;
  hero: HeroData;
  trust: TrustData;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contact: ContactData;
  seo: SeoData;
}
