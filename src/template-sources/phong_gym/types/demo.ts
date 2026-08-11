export interface BusinessInfo {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  mapUrl?: string;
  workingHours?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
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

export interface TrustBarData {
  rating: number;
  ratingCount: number;
  badges: string[];
}

export interface AboutSectionData {
  title: string;
  badge?: string;
  description1: string;
  description2: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  image: ImageAsset;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or keyword
}

export interface GalleryItem {
  id: string;
  image: ImageAsset;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  membershipDuration?: string;
}

export interface ContactCTAData {
  title: string;
  subtitle: string;
  primaryAction: {
    label: string;
    href: string;
  };
  phoneAction?: {
    label: string;
    phone: string;
  };
  mapAction?: {
    label: string;
    href: string;
  };
}

export interface SEOData {
  title: string;
  description: string;
}

export interface TemplateData {
  key: string;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: TemplateData;
  hero: HeroSectionData;
  trust: TrustBarData;
  about: AboutSectionData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contact: ContactCTAData;
  seo: SEOData;
}
