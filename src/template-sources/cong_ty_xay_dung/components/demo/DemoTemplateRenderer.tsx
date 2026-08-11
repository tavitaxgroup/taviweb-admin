import React from "react";
import { DemoPageData } from "../../types/demo";
import { ConstructionCompanyTemplate } from "./templates/ConstructionCompanyTemplate";

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template.key;

  switch (templateKey) {
    case "construction-company":
      return <ConstructionCompanyTemplate data={data} />;
    
    default:
      // Fallback safely to our construction company template
      return <ConstructionCompanyTemplate data={data} />;
  }
}
