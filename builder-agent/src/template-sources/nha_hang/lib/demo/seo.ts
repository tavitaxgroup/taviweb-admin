import { SeoData } from "../../types/demo";

export function updatePageSeo(seo: SeoData) {
  if (typeof window === "undefined") return;
  
  // Set page title
  document.title = seo.title || "Fine Dining Restaurant";

  // Set meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", seo.description || "");

  // Set noindex for demo environments
  let metaNoIndex = document.querySelector('meta[name="robots"]');
  if (!metaNoIndex) {
    metaNoIndex = document.createElement("meta");
    metaNoIndex.setAttribute("name", "robots");
    metaNoIndex.setAttribute("content", "noindex, nofollow");
    document.head.appendChild(metaNoIndex);
  }
}
