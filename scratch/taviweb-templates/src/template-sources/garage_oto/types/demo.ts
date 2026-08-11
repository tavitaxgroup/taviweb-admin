export interface BusinessInfo {
  name: string;
  phone: string;
  phoneAlt?: string;
  email: string;
  address: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface ActionButton {
  label: string;
  href: string;
}

export interface TemplateInfo {
  key: string;
  name: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  image: ImageAsset;
  primaryAction: ActionButton;
  stats?: {
    badge: string;
    title: string;
    values: Array<{ value: string; label: string }>;
  };
}

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export interface TrustData {
  badges: TrustBadge[];
}

export interface AboutData {
  label: string;
  title: string;
  description1: string;
  description2: string;
  points: string[];
  image: ImageAsset;
  badge: {
    label: string;
    value: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface GalleryItem {
  image: ImageAsset;
  caption: string;
  size?: 'large' | 'normal';
}

export interface ReviewItem {
  id: string;
  author: string;
  authorInitials: string;
  vehicle: string;
  text: string;
  rating: number;
}

export interface ContactData {
  title: string;
  address: string;
  phone: string;
  phoneAlt?: string;
  hours: string[];
  mapImage: ImageAsset;
  location: string;
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
