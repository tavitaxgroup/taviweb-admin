import { DemoPageData } from "../../types/demo";

export interface TemplateRouterConfig {
  key: string;
  name: string;
}

export const registeredTemplates: TemplateRouterConfig[] = [
  {
    key: "fine-dining-restaurant",
    name: "Fine Dining Restaurant Template"
  }
];

export function getTemplateByKey(key: string): TemplateRouterConfig {
  const template = registeredTemplates.find(t => t.key === key);
  return template || registeredTemplates[0]; // fallback to first registered
}
