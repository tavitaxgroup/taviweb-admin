import { SEOData } from "../../types/demo";

export function updateSEO(seo: SEOData) {
  if (typeof window === "undefined") return;

  // Set page title
  document.title = seo.title || "Thẩm Mỹ Viện Premium";

  // Update or create meta description tag
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", seo.description || "Website thẩm mỹ viện cao cấp.");

  // Enforce noindex for demo environments as requested by instructions
  let metaNoIndex = document.querySelector('meta[name="robots"]');
  if (!metaNoIndex) {
    metaNoIndex = document.createElement("meta");
    metaNoIndex.setAttribute("name", "robots");
    document.head.appendChild(metaNoIndex);
  }
  metaNoIndex.setAttribute("content", "noindex, nofollow");
}
