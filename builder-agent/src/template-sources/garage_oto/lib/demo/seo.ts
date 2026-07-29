import { SeoData } from '../../types/demo';

/**
 * Dynamically updates document head attributes for SEO
 * in our single page application container context.
 */
export function updateDocumentSEO(seo: SeoData): void {
  if (typeof document === 'undefined') return;

  // Update Title
  document.title = seo.title || 'AutoGarage | Dịch Vụ Sửa Chữa Ô Tô Đáng Tin Cậy';

  // Update Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', seo.description || '');

  // Add noindex meta tag to ensure these demo-only landing pages are kept private from public search engines
  let noindexMeta = document.querySelector('meta[name="robots"]');
  if (!noindexMeta) {
    noindexMeta = document.createElement('meta');
    noindexMeta.setAttribute('name', 'robots');
    document.head.appendChild(noindexMeta);
  }
  noindexMeta.setAttribute('content', 'noindex, nofollow');
}
