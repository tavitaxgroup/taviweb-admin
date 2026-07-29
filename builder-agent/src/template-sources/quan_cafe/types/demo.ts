export interface BusinessData {
  name: string;
  phone?: string;
  address?: string;
  email?: string;
  facebookUrl?: string;
  mapUrl?: string;
  rating?: number;
  ratingCount?: number;
  openHours?: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

export interface TrustData {
  ratingText: string;
  customerCountText: string;
  checkInCountText: string;
}

export interface AboutData {
  badge: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsData {
  badge: string;
  title: string;
  items: WhyChooseUsItem[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole?: string;
  authorInitials: string;
  rating: number;
  text: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  addressLabel: string;
  addressValue: string;
  hoursLabel: string;
  hoursValue: string;
  emailLabel: string;
  emailValue: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

export interface SeoData {
  title: string;
  description: string;
}

export interface DemoPageData {
  business: BusinessData;
  template: {
    key: string;
    name: string;
  };
  hero: HeroData;
  trust: TrustData;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  whyChooseUs?: WhyChooseUsData;
  reviews: ReviewItem[];
  contact: ContactData;
  seo: SeoData;
}
