import { DemoPageData } from "../../types/demo";

export function resolveTemplateComponent(data: DemoPageData) {
  const key = data.template.key?.toLowerCase() || "spa";
  
  // Here we return the template key, letting the renderer select SpaTemplate or other styles
  if (key === "spa") {
    return "SpaTemplate";
  }
  
  // Safe default fallback
  return "SpaTemplate";
}
