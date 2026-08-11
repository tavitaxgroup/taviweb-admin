import { SeoData } from '../../types/demo';

export function updatePageMetadata(seo: SeoData): void {
  if (typeof document === 'undefined') return;

  // Update Title
  document.title = seo.title || 'Quán Cafe Đẹp - Bình yên giữa lòng phố';

  // Update or Create Meta Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', seo.description || '');

  // Add NoIndex as requested by prompt ("Demo page mặc định noindex")
  let noindexMeta = document.querySelector('meta[name="robots"]');
  if (!noindexMeta) {
    noindexMeta = document.createElement('meta');
    noindexMeta.setAttribute('name', 'robots');
    noindexMeta.setAttribute('content', 'noindex, nofollow');
    document.head.appendChild(noindexMeta);
  }
}
