import { SEOInfo } from "../../types/demo";

/**
 * Dynamically updates document SEO metadata (title, meta description, and robot noindex rules).
 */
export function updateSEO(seo: SEOInfo) {
  if (typeof document === "undefined") return;

  // Set page title
  document.title = seo.title || "Văn Phòng Luật Sư Juris & Integrity";

  // Handle meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", seo.description || "");

  // As requested: "Demo page mặc định noindex."
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement("meta");
    metaRobots.setAttribute("name", "robots");
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute("content", "noindex, nofollow");
}
