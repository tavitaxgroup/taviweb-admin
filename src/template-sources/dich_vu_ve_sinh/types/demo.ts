export interface ImageAsset {
  src: string;
  alt: string;
}

export interface BusinessInfo {
  id: string;
  placeId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  rating?: number;
  reviewCount?: number;
}

export interface TemplateInfo {
  key: string;
  name: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  tagline?: string;
  image: ImageAsset;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export interface TrustData {
  badges: TrustItem[];
}

export interface AboutData {
  title: string;
  description: string;
  image: ImageAsset;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
  link?: string;
}

export interface GalleryItem {
  id: string;
  image: ImageAsset;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  role?: string;
  rating: number;
  comment: string;
  avatarLetter: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  phoneLabel?: string;
  phoneValue?: string;
  features: string[];
  secondaryAction?: {
    label: string;
    href: string;
  };
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
