import { SeoData } from '../../types/demo';

export function updateSeo(seoData: SeoData): void {
  if (typeof document === 'undefined') return;

  // Update document title
  document.title = seoData.title || 'Luxe Studio | Hair Salon';

  // Update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', seoData.description || '');

  // Add noindex meta as per specifications ("Demo page mặc định noindex")
  let noindexMeta = document.querySelector('meta[name="robots"]');
  if (!noindexMeta) {
    noindexMeta = document.createElement('meta');
    noindexMeta.setAttribute('name', 'robots');
    document.head.appendChild(noindexMeta);
  }
  noindexMeta.setAttribute('content', 'noindex, nofollow');
}
