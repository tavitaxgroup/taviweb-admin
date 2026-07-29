import { DemoPageData } from '../../types/demo';
import { applyFallbackRules } from './fallbackRules';

/**
 * Normalizes any database entity format or raw business properties into the standard DemoPageData shape
 */
export function buildDemoPageData(rawBusiness: any): DemoPageData {
  if (!rawBusiness) {
    return applyFallbackRules({});
  }

  // Convert custom raw fields if they exist, map to schema
  const mappedData: Partial<DemoPageData> = {
    business: {
      id: rawBusiness.id || rawBusiness.place_id || 'default',
      name: rawBusiness.name || rawBusiness.title || 'English Center',
      logoUrl: rawBusiness.logo_url || rawBusiness.logo,
      phone: rawBusiness.phone_number || rawBusiness.phone,
      email: rawBusiness.email,
      address: rawBusiness.address || rawBusiness.location,
      MessageCircle: rawBusiness.facebook_url || rawBusiness.MessageCircle,
      rating: rawBusiness.rating,
      followers: rawBusiness.followers_count || rawBusiness.followers,
      students: rawBusiness.students_count || rawBusiness.students,
    },
    template: {
      key: rawBusiness.template_key || 'english-center',
      themeName: rawBusiness.theme_name || 'Academic Vitality',
    },
    hero: rawBusiness.hero || undefined,
    trust: rawBusiness.trust || undefined,
    about: rawBusiness.about || undefined,
    services: rawBusiness.services || undefined,
    gallery: rawBusiness.gallery || undefined,
    reviews: rawBusiness.reviews || undefined,
    contact: rawBusiness.contact || undefined,
    seo: rawBusiness.seo || undefined,
  };

  return applyFallbackRules(mappedData);
}
