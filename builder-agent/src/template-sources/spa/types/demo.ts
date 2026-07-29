export interface ImageAsset {
  src: string;
  alt: string;
}

export interface ActionButton {
  label: string;
  href: string;
}

export interface BusinessInfo {
  name: string;
  description?: string;
  logoUrl?: string;
  socials?: {
    MessageCircle?: string;
    Camera?: string;
  };
}

export interface TemplateInfo {
  key: string;
  theme?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  bgImage: ImageAsset;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
}

export interface TrustData {
  rating?: {
    score: string;
    label: string;
  };
  followers?: {
    count: string;
    label: string;
  };
}

export interface AboutData {
  title: string;
  description: string;
  image?: ImageAsset;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: ImageAsset;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface ReviewItem {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface ContactData {
  address: string;
  phone?: string;
  email: string;
  MessageCircle?: string;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
}

export interface SEOData {
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
  seo: SEOData;
}
