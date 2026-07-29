import { DemoPageData } from "../../types/demo";

export interface TemplateRoute {
  key: string;
  name: string;
}

export const templates: TemplateRoute[] = [
  {
    key: "construction-company",
    name: "Công ty Xây dựng"
  }
];

export function getTemplateByKey(key: string): TemplateRoute | undefined {
  return templates.find(t => t.key === key);
}
