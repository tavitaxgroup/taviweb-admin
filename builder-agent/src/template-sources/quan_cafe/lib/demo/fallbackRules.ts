import { DemoPageData } from '../../types/demo';
import { DEFAULT_CAFE_FALLBACKS, defaultDemoPageData } from './templateDefaults';

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  const base = { ...defaultDemoPageData };

  const business = {
    ...base.business,
    ...data.business,
  };

  // If phone is missing, swap phone action to map or MessageCircle
  let heroPrimaryAction = data.hero?.primaryAction || { ...base.hero.primaryAction };
  let heroSecondaryAction = data.hero?.secondaryAction || { ...base.hero.secondaryAction };

  if (!business.phone) {
    heroSecondaryAction = {
      label: 'Nhắn MessageCircle',
      href: business.facebookUrl || DEFAULT_CAFE_FALLBACKS.facebookUrl
    };
  }

  const hero = {
    ...base.hero,
    ...data.hero,
    backgroundImage: {
      src: data.hero?.backgroundImage?.src || DEFAULT_CAFE_FALLBACKS.heroImage,
      alt: data.hero?.backgroundImage?.alt || business.name,
    },
    primaryAction: heroPrimaryAction,
    secondaryAction: heroSecondaryAction,
  };

  const trust = {
    ...base.trust,
    ...data.trust,
  };

  const about = {
    ...base.about,
    ...data.about,
    image: {
      src: data.about?.image?.src || DEFAULT_CAFE_FALLBACKS.aboutImage,
      alt: data.about?.image?.alt || `Về ${business.name}`,
    }
  };

  const services = data.services && data.services.length > 0 ? data.services : base.services;
  const gallery = data.gallery && data.gallery.length > 0 ? data.gallery : base.gallery;
  const whyChooseUs = data.whyChooseUs || base.whyChooseUs;
  const reviews = data.reviews && data.reviews.length > 0 ? data.reviews : base.reviews;

  const contact = {
    ...base.contact,
    ...data.contact,
    addressValue: business.address || base.contact.addressValue,
    hoursValue: business.openHours || base.contact.hoursValue,
    emailValue: business.email || base.contact.emailValue,
  };

  // Adjust contact primary/secondary actions if phone is missing
  if (!business.phone) {
    contact.secondaryAction = {
      label: 'Nhắn MessageCircle',
      href: business.facebookUrl || DEFAULT_CAFE_FALLBACKS.facebookUrl
    };
  } else {
    contact.secondaryAction = {
      label: 'Gọi điện thoại',
      href: `tel:${business.phone}`
    };
  }

  const seo = {
    title: data.seo?.title || `${business.name} - ${hero.title}`,
    description: data.seo?.description || hero.subtitle,
  };

  return {
    business,
    template: data.template || base.template,
    hero,
    trust,
    about,
    services,
    gallery,
    whyChooseUs,
    reviews,
    contact,
    seo
  };
}
