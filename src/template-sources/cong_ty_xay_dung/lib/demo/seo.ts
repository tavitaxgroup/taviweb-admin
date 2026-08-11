import { DemoPageData } from "../../types/demo";

export function updatePageSEO(seoData: DemoPageData["seo"]): void {
  if (typeof document !== "undefined") {
    // Update title
    document.title = seoData.title || "Công Ty Xây Dựng";

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", seoData.description || "");

    // Add noindex for demo preview pages to prevent indexation of demo templates
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
  }
}
