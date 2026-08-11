import { SeoData } from '../../types/demo';

export function updatePageSeo(seo: SeoData) {
  if (typeof document !== 'undefined') {
    document.title = seo.title || 'MedCore Clinic - Chăm Sóc Sức Khỏe Toàn Diện';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description || '');

    // Default noindex as requested by user
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }
}
