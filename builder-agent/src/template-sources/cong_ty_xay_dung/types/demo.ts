export interface BusinessInfo {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  rating?: number;
  ratingCount?: number;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface CTAAction {
  label: string;
  href: string;
}

export interface DemoPageData {
  business: BusinessInfo;
  template: {
    key: string;
    name: string;
  };
  hero: {
    title: string;
    description: string;
    image: ImageAsset;
    primaryAction: CTAAction;
    secondaryAction: CTAAction;
  };
  trust: {
    badges: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  about: {
    tagline: string;
    title: string;
    description1: string;
    description2: string;
    yearsOfExperience: string;
    experienceLabel: string;
    mission: string;
    coreValues: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    isPopular?: boolean;
    image: ImageAsset;
    highlights?: string[];
  }>;
  gallery: Array<{
    id: string;
    title: string;
    location: string;
    category: string;
    image: ImageAsset;
  }>;
  whyChooseUs: {
    tagline: string;
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  reviews: Array<{
    id: string;
    rating: number;
    text: string;
    authorName: string;
    authorInitials: string;
    authorRole: string;
  }>;
  contact: {
    title: string;
    description: string;
    primaryAction: CTAAction;
  };
  seo: {
    title: string;
    description: string;
  };
}
