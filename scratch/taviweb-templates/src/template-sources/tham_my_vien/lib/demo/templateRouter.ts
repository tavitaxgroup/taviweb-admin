import { DemoPageData } from "../../types/demo";

export interface RegisteredTemplate {
  key: string;
  name: string;
  category: string;
}

export const REGISTERED_TEMPLATES: RegisteredTemplate[] = [
  {
    key: "aesthetic-clinic",
    name: "Aesthetic Clinic Premium Template",
    category: "Thẩm mỹ viện / Spa"
  }
];

export function getTemplateByKey(key: string): RegisteredTemplate | undefined {
  return REGISTERED_TEMPLATES.find(t => t.key === key);
}

export function isTemplateSupported(key: string): boolean {
  return REGISTERED_TEMPLATES.some(t => t.key === key);
}
