import React from "react";
import { DemoPageData } from "../../types/demo";
import AestheticClinicTemplate from "./templates/AestheticClinicTemplate";

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template?.key;

  switch (templateKey) {
    case "aesthetic-clinic":
      return <AestheticClinicTemplate data={data} />;
    default:
      // Unknown template_key falls back safely to our premium clinic template!
      return <AestheticClinicTemplate data={data} />;
  }
}
