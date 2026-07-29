export interface BusinessInfo {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  mapsUrl?: string;
  logoText?: string;
}

export interface TemplateConfig {
  key: string; // 'interior-design'
  theme?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  image: ImageAsset;
  primaryActionLabel?: string;
}

export interface TrustItem {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface TrustData {
  items: TrustItem[];
}

export interface AboutData {
  badge: string;
  title: string;
  description: string;
  image: ImageAsset;
  stats: {
    value: string;
    label: string;
  }[];
}

export interface ServiceItem {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  image: ImageAsset;
}

export interface ReviewItem {
  quote: string;
  author: string;
  role: string;
}

export interface ContactData {
  title: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon?: string;
  };
}

export interface SeoData {
  title: string;
  description: string;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: TemplateConfig;
  hero: HeroData;
  trust: TrustData;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contact: ContactData;
  seo: SeoData;
}
