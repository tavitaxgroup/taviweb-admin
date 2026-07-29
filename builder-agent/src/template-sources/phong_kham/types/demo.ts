export interface BusinessData {
  name: string;
  phone?: string;
  address?: string;
  workingHours?: string;
}

export interface TemplateData {
  key: string;
  name: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  badge?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

export interface TrustData {
  rating: number;
  reviewCount: number;
  achievements: string[];
}

export interface AboutData {
  title: string;
  description: string;
  stats: {
    value: string;
    label: string;
    description: string;
  }[];
  image: {
    src: string;
    alt: string;
  };
  ctaLabel?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  avatarSrc: string;
  avatarAlt: string;
}

export interface ContactData {
  title: string;
  phone: string;
  address: string;
  workingHours: string;
  mapEmbedUrl?: string;
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
