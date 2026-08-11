import { DemoPageData } from '../../types/demo';
import { defaultAutoGarageData } from './templateDefaults';

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  const base = { ...defaultAutoGarageData };

  // Helper deep merges to avoid overwriting complete structures with undefined keys
  const merged: DemoPageData = {
    business: {
      name: data.business?.name || base.business.name,
      phone: data.business?.phone || '', // Keep empty if not provided, so sections can selectively hide/adjust
      phoneAlt: data.business?.phoneAlt || base.business.phoneAlt,
      email: data.business?.email || base.business.email,
      address: data.business?.address || base.business.address,
    },
    template: {
      key: data.template?.key || base.template.key,
      name: data.template?.name || base.template.name,
    },
    hero: {
      title: data.hero?.title || base.hero.title,
      subtitle: data.hero?.subtitle || base.hero.subtitle,
      image: {
        src: data.hero?.image?.src || base.hero.image.src,
        alt: data.hero?.image?.alt || base.hero.image.alt,
      },
      primaryAction: {
        label: data.hero?.primaryAction?.label || base.hero.primaryAction.label,
        href: data.hero?.primaryAction?.href || base.hero.primaryAction.href,
      },
      stats: data.hero?.stats || base.hero.stats,
    },
    trust: {
      badges: data.trust?.badges && data.trust.badges.length > 0 
        ? data.trust.badges 
        : base.trust.badges,
    },
    about: {
      label: data.about?.label || base.about.label,
      title: data.about?.title || base.about.title,
      description1: data.about?.description1 || base.about.description1,
      description2: data.about?.description2 || base.about.description2,
      points: data.about?.points && data.about.points.length > 0
        ? data.about.points
        : base.about.points,
      image: {
        src: data.about?.image?.src || base.about.image.src,
        alt: data.about?.image?.alt || base.about.image.alt,
      },
      badge: {
        label: data.about?.badge?.label || base.about.badge.label,
        value: data.about?.badge?.value || base.about.badge.value,
      },
    },
    services: data.services && data.services.length > 0 
      ? data.services 
      : base.services,
    gallery: data.gallery && data.gallery.length > 0 
      ? data.gallery 
      : base.gallery,
    reviews: data.reviews && data.reviews.length > 0 
      ? data.reviews 
      : base.reviews,
    contact: {
      title: data.contact?.title || base.contact.title,
      address: data.contact?.address || base.contact.address,
      phone: data.contact?.phone || '',
      phoneAlt: data.contact?.phoneAlt || base.contact.phoneAlt,
      hours: data.contact?.hours && data.contact.hours.length > 0
        ? data.contact.hours
        : base.contact.hours,
      mapImage: {
        src: data.contact?.mapImage?.src || base.contact.mapImage.src,
        alt: data.contact?.mapImage?.alt || base.contact.mapImage.alt,
      },
      location: data.contact?.location || base.contact.location,
      primaryAction: {
        label: data.contact?.primaryAction?.label || base.contact.primaryAction.label,
        href: data.contact?.primaryAction?.href || base.contact.primaryAction.href,
      },
    },
    seo: {
      title: data.seo?.title || base.seo.title,
      description: data.seo?.description || base.seo.description,
    },
  };

  // Rule: If phone number is entirely missing, fallback CTAs to email, map or web links
  if (!merged.business.phone && !merged.contact.phone) {
    merged.hero.primaryAction = {
      label: 'Liên hệ qua Email',
      href: `mailto:${merged.business.email}`,
    };
    merged.contact.primaryAction = {
      label: 'Gửi Email Hỗ Trợ',
      href: `mailto:${merged.business.email}`,
    };
  } else {
    // Ensure accurate telephone links
    const phoneToUse = merged.business.phone || merged.contact.phone || base.business.phone;
    const formattedPhone = phoneToUse.replace(/\s+/g, '');
    merged.hero.primaryAction.href = `tel:${formattedPhone}`;
  }

  return merged;
}
