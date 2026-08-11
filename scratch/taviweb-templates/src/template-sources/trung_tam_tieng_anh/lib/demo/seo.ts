import { SeoData } from '../../types/demo';

/**
 * Dynamically updates document title and description meta tag for client-side SEO
 */
export function updateSeoMetadata(seo: SeoData): void {
  if (typeof window === 'undefined') return;

  // Update Title
  document.title = seo.title || 'English Center - Học Tiếng Anh Theo Lộ Trình';

  // Update Meta Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', seo.description || 'Landing page chuẩn quốc tế cho trung tâm tiếng Anh.');

  // Add NoIndex directive to prevent search engine indexing of demo/preview routes
  let noIndexMeta = document.querySelector('meta[name="robots"]');
  if (!noIndexMeta) {
    noIndexMeta = document.createElement('meta');
    noIndexMeta.setAttribute('name', 'robots');
    document.head.appendChild(noIndexMeta);
  }
  noIndexMeta.setAttribute('content', 'noindex, nofollow');
}
