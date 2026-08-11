import React from "react";
import { DemoPageData } from "../../types/demo";
import FineDiningRestaurantTemplate from "./templates/FineDiningRestaurantTemplate";

interface RendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: RendererProps) {
  // Select template based on key
  switch (data.template.key) {
    case "fine-dining-restaurant":
      return <FineDiningRestaurantTemplate data={data} />;
    
    default:
      // Fallback template
      return <FineDiningRestaurantTemplate data={data} />;
  }
}
