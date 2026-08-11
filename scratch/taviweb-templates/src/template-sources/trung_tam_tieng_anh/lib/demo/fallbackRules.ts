import { DemoPageData, BusinessInfo, ImageAsset } from '../../types/demo';
import { ENGLISH_CENTER_DEFAULTS, DEFAULT_IMAGES } from './templateDefaults';

/**
 * Applies strict fallback rules on any incoming business/page data
 */
export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  // Deep clone defaults to avoid mutating original
  const base = JSON.parse(JSON.stringify(ENGLISH_CENTER_DEFAULTS)) as DemoPageData;

  if (!data) return base;

  // 1. Business Fallbacks
  const business: BusinessInfo = {
    ...base.business,
    ...data.business,
  };

  // Ensure fallback values if empty strings are passed
  business.phone = business.phone?.trim() ? business.phone : undefined;
  business.email = business.email?.trim() ? business.email : undefined;
  business.MessageCircle = business.MessageCircle?.trim() ? business.MessageCircle : undefined;
  business.address = business.address?.trim() ? business.address : undefined;

  // 2. Image Fallbacks helper
  const safeImage = (img: Partial<ImageAsset> | undefined, defaultSrc: string, altText: string): ImageAsset => {
    return {
      src: img?.src?.trim() ? img.src : defaultSrc,
      alt: img?.alt?.trim() ? img.alt : altText,
    };
  };

  // 3. Hero Fallbacks
  const hero = {
    title: data.hero?.title?.trim() ? data.hero.title : base.hero.title,
    subtitle: data.hero?.subtitle?.trim() ? data.hero.subtitle : base.hero.subtitle,
    image: safeImage(data.hero?.image, DEFAULT_IMAGES.hero, 'Lớp học tiếng Anh hiện đại'),
    primaryAction: {
      label: data.hero?.primaryAction?.label?.trim() ? data.hero.primaryAction.label : base.hero.primaryAction.label,
      href: data.hero?.primaryAction?.href?.trim() ? data.hero.primaryAction.href : base.hero.primaryAction.href,
    },
    secondaryAction: {
      label: data.hero?.secondaryAction?.label?.trim() ? data.hero.secondaryAction.label : base.hero.secondaryAction.label,
      href: data.hero?.secondaryAction?.href?.trim() ? data.hero.secondaryAction.href : base.hero.secondaryAction.href,
    },
  };

  // 4. Trust Fallbacks
  const trust = {
    studentsCount: data.trust?.studentsCount?.trim() ? data.trust.studentsCount : (business.students || base.trust.studentsCount),
    rating: data.trust?.rating !== undefined ? data.trust.rating : (business.rating !== undefined ? business.rating : base.trust.rating),
    followersCount: data.trust?.followersCount?.trim() ? data.trust.followersCount : (business.followers || base.trust.followersCount),
  };

  // 5. About Fallbacks
  const about = {
    title: data.about?.title?.trim() ? data.about.title : `${base.about.title} ${business.name !== 'English Center' ? business.name : ''}`,
    description: data.about?.description?.trim() ? data.about.description : base.about.description,
    image: safeImage(data.about?.image, DEFAULT_IMAGES.about, 'Học viên học tập tương tác'),
    features: data.about?.features && data.about.features.length > 0 ? data.about.features : base.about.features,
  };

  // 6. Services Fallbacks (Filter out empty/invalid services, or fallback to default)
  const services = data.services && data.services.length > 0
    ? data.services.map((s, index) => ({
        id: s.id || `service-${index}`,
        title: s.title || `Khóa học ${index + 1}`,
        description: s.description || 'Chương trình học chuẩn hóa, phù hợp cho học viên.',
        icon: s.icon || 'GraduationCap',
      }))
    : base.services;

  // 7. Gallery Fallbacks
  const gallery = data.gallery && data.gallery.length > 0
    ? data.gallery.map((g, index) => {
        const defaultG = base.gallery[index % base.gallery.length];
        return {
          id: g.id || `gallery-${index}`,
          src: g.src?.trim() ? g.src : defaultG.src,
          alt: g.alt?.trim() ? g.alt : defaultG.alt,
          caption: g.caption?.trim() ? g.caption : undefined,
        };
      })
    : base.gallery;

  // 8. Reviews Fallbacks
  const reviews = data.reviews && data.reviews.length > 0
    ? data.reviews.map((r, index) => {
        const defaultR = base.reviews[index % base.reviews.length];
        return {
          id: r.id || `review-${index}`,
          name: r.name || 'Học viên ẩn danh',
          role: r.role || 'Học viên',
          rating: r.rating !== undefined ? r.rating : 5,
          content: r.content || 'Trải nghiệm học tập tại trung tâm rất tuyệt vời và hữu ích.',
          avatar: r.avatar?.trim() ? r.avatar : defaultR.avatar,
        };
      })
    : base.reviews;

  // 9. Contact Fallbacks
  const contact = {
    title: data.contact?.title?.trim() ? data.contact.title : base.contact.title,
    description: data.contact?.description?.trim() ? data.contact.description : base.contact.description,
    phone: business.phone || base.contact.phone,
    facebookUrl: business.MessageCircle || base.contact.facebookUrl,
    mapImageUrl: data.contact?.mapImageUrl?.trim() ? data.contact.mapImageUrl : DEFAULT_IMAGES.map,
    mapLocation: business.address || base.contact.mapLocation,
    primaryAction: {
      label: data.contact?.primaryAction?.label?.trim() ? data.contact.primaryAction.label : base.contact.primaryAction.label,
      href: data.contact?.primaryAction?.href?.trim() ? data.contact.primaryAction.href : base.contact.primaryAction.href,
    },
  };

  // 10. SEO Fallbacks
  const seo = {
    title: data.seo?.title?.trim() ? data.seo.title : `${business.name} - Học Tiếng Anh Theo Lộ Trình`,
    description: data.seo?.description?.trim() ? data.seo.description : `${business.name} - ${base.seo.description}`,
  };

  return {
    business,
    template: data.template || base.template,
    hero,
    trust,
    about,
    services,
    gallery,
    reviews,
    contact,
    seo,
  };
}
