export interface BusinessData {
  name: string;
  phone?: string;
  address?: string;
  facebookUrl?: string;
  mapUrl?: string;
  email?: string;
  logoText: string;
}

export interface TemplateData {
  key: string;
  themeName: string;
}

export interface HeroData {
  title: string;
  italicSubtitle: string;
  description: string;
  backgroundImage: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface TrustData {
  rating: string;
  followers: string;
  certifiedText: string;
}

export interface AboutData {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  learnMoreLink: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category?: string;
}

export interface GalleryItem {
  id: string;
  imageSrc: string;
  alt: string;
  caption?: string;
}

export interface ReviewItem {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
}

export interface ContactData {
  title: string;
  facebookCtaText: string;
  callCtaText: string;
  bookCtaText: string;
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
