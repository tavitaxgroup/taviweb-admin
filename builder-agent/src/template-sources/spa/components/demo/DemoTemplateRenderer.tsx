import React from "react";
import { DemoPageData } from "../../types/demo";
import { SpaTemplate } from "./templates/SpaTemplate";

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template?.key?.toLowerCase() || "spa";

  switch (templateKey) {
    case "spa":
      return <SpaTemplate data={data} />;
    
    default:
      // Unknown template_key maps gracefully to SpaTemplate default fallback
      return <SpaTemplate data={data} />;
  }
}
export default DemoTemplateRenderer;
