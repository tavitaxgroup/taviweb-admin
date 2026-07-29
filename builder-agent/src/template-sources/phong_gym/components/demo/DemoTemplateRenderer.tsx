import React from "react";
import { DemoPageData } from "../../types/demo";
import GymFitnessTemplate from "./templates/GymFitnessTemplate";

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template?.key || "gym-fitness";

  switch (templateKey) {
    case "gym-fitness":
      return <GymFitnessTemplate data={data} />;
    default:
      // Fallback safely to GymFitnessTemplate
      return <GymFitnessTemplate data={data} />;
  }
}
