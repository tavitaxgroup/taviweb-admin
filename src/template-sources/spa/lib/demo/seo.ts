import { SEOData } from "../../types/demo";

export function updateSEO(seo: SEOData) {
  if (typeof window === "undefined") return;

  // Set document title
  if (seo.title) {
    document.title = seo.title;
  }

  // Set meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  
  if (seo.description) {
    metaDescription.setAttribute("content", seo.description);
  }

  // Inject a noindex tag as requested for preview templates
  let metaNoIndex = document.querySelector('meta[name="robots"]');
  if (!metaNoIndex) {
    metaNoIndex = document.createElement("meta");
    metaNoIndex.setAttribute("name", "robots");
    metaNoIndex.setAttribute("content", "noindex, nofollow");
    document.head.appendChild(metaNoIndex);
  }
}
