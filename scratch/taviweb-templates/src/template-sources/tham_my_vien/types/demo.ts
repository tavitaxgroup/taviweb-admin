export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Action {
  label: string;
  href: string;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  MessageCircle?: string;
  Camera?: string;
  mapsUrl?: string;
  logoText?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image: ImageAsset;
  primaryAction: Action;
  secondaryAction: Action;
}

export interface TrustItem {
  icon: string;
  value: string;
  label: string;
}

export interface TrustData {
  items: TrustItem[];
}

export interface AboutData {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  image: ImageAsset;
  experienceYears: number;
  experienceLabel: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  image: ImageAsset;
  aspect?: string; // e.g. 'md:col-span-2 md:row-span-2' for grid styling
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  text: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface ContactData {
  title: string;
  description: string;
  primaryAction: Action;
  phoneAction: Action;
}

export interface SEOData {
  title: string;
  description: string;
}

export interface TemplateInfo {
  key: string;
  name: string;
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
  seo: SEOData;
}
