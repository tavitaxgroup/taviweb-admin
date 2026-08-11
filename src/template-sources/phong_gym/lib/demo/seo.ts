import { SEOData } from "../../types/demo";

export function updatePageSEO(seo: SEOData) {
  if (typeof window === "undefined") return;

  // Set page title
  document.title = seo.title || "Elite Strength Gym - Bứt Phá Giới Hạn";

  // Set or update description meta tag
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", seo.description || "Hệ thống phòng tập cao cấp 24/7.");
}
