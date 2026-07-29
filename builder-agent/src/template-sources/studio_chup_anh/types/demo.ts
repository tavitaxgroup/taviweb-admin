export interface ImageAsset {
  src: string;
  alt: string;
}

export interface PrimarySecondaryAction {
  label: string;
  href: string;
}

export interface BusinessInfo {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  logoUrl?: string;
}

export interface TemplateInfo {
  key: string;
}

export interface HeroInfo {
  title: string;
  subtitle: string;
  image: ImageAsset;
  primaryAction: PrimarySecondaryAction;
}

export interface TrustInfo {
  facebookFollowers?: string;
  ratingText?: string;
  ratingValue?: number;
}

export interface AboutInfo {
  badge: string;
  title: string;
  description: string;
  image: ImageAsset;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  category: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface WhyChooseUsInfo {
  badge: string;
  title: string;
  items: WhyChooseUsItem[];
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  date: string;
  rating: number;
}

export interface ContactInfo {
  title: string;
  description: string;
  primaryAction: PrimarySecondaryAction;
  secondaryAction?: PrimarySecondaryAction;
}

export interface SEOInfo {
  title: string;
  description: string;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: TemplateInfo;
  hero: HeroInfo;
  trust: TrustInfo;
  about: AboutInfo;
  services: ServiceItem[];
  gallery: GalleryItem[];
  whyChooseUs: WhyChooseUsInfo;
  reviews: ReviewItem[];
  contact: ContactInfo;
  seo: SEOInfo;
}
