export interface BusinessInfo {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  logo?: string;
  rating?: number;
  reviewCount?: number;
}

export interface TemplateInfo {
  key: string;
  name: string;
}

export interface HeroInfo {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
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

export interface TrustInfo {
  items: TrustItem[];
}

export interface AboutInfo {
  title: string;
  description1: string;
  description2?: string;
  image: {
    src: string;
    alt: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  content: string;
  role?: string;
  date?: string;
}

export interface ContactInfo {
  title: string;
  description: string;
  phone?: string;
  email?: string;
  address?: string;
  primaryAction: {
    label: string;
    href: string;
  };
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
  reviews: ReviewItem[];
  contact: ContactInfo;
  seo: SEOInfo;
}
