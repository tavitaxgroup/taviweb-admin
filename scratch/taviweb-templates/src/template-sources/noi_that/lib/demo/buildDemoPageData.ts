import { DemoPageData } from '../../types/demo';
import { getMockBusinessByPlaceId } from './mockDemoData';

/**
 * Maps input business data to DemoPageData structure.
 * Handles fallbacks gracefully to ensure the page never breaks.
 */
export function buildDemoPageData(placeId: string, customData?: Partial<DemoPageData>): DemoPageData {
  const baseData = getMockBusinessByPlaceId(placeId);

  // Deep clone of the base data to prevent modifying the shared mock object
  const merged: DemoPageData = JSON.parse(JSON.stringify(baseData));

  // Apply custom data updates if provided
  if (customData) {
    if (customData.business) {
      merged.business = { ...merged.business, ...customData.business };
    }
    if (customData.template) {
      merged.template = { ...merged.template, ...customData.template };
    }
    if (customData.hero) {
      merged.hero = { ...merged.hero, ...customData.hero };
    }
    if (customData.trust) {
      merged.trust = { ...merged.trust, ...customData.trust };
    }
    if (customData.about) {
      merged.about = { ...merged.about, ...customData.about };
    }
    if (customData.services) {
      merged.services = customData.services;
    }
    if (customData.gallery) {
      merged.gallery = customData.gallery;
    }
    if (customData.reviews) {
      merged.reviews = customData.reviews;
    }
    if (customData.contact) {
      merged.contact = { ...merged.contact, ...customData.contact };
    }
    if (customData.seo) {
      merged.seo = { ...merged.seo, ...customData.seo };
    }
  }

  // Graceful Fallbacks for critical missing fields:
  // 1. Missing phone -> replace with email or maps callback
  if (!merged.business.phone) {
    if (merged.business.email) {
      merged.contact.primaryAction = {
        label: 'Gửi Email Tư Vấn',
        href: `mailto:${merged.business.email}`
      };
    } else {
      merged.contact.primaryAction = {
        label: 'Xem Bản Đồ Liên Hệ',
        href: merged.business.mapsUrl || 'https://maps.google.com'
      };
    }
  }

  // 2. Missing images -> fallback to high-quality placeholders (Picsum with seed or static safe link)
  const defaultFallbackImage = 'https://picsum.photos/seed/interior-fallback/1200/800';
  if (!merged.hero.image || !merged.hero.image.src) {
    merged.hero.image = {
      src: defaultFallbackImage,
      alt: 'Elegant interior visualization fallback'
    };
  }
  if (!merged.about.image || !merged.about.image.src) {
    merged.about.image = {
      src: defaultFallbackImage,
      alt: 'Premium materials detail fallback'
    };
  }

  // Validate gallery items
  merged.gallery = merged.gallery.map((item, index) => {
    if (!item.image || !item.image.src) {
      return {
        ...item,
        image: {
          src: `https://picsum.photos/seed/gallery-${index}/800/600`,
          alt: item.title || 'Selected architectural portfolio'
        }
      };
    }
    return item;
  });

  return merged;
}
