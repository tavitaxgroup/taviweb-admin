import { DemoPageData } from "../../types/demo";

export const SUPPORTED_TEMPLATES = {
  GYM_FITNESS: "gym-fitness"
};

export function isValidTemplate(key: string): boolean {
  return Object.values(SUPPORTED_TEMPLATES).includes(key);
}

export function getTemplateKeyOrDefault(data: Partial<DemoPageData>): string {
  const key = data.template?.key;
  if (key && isValidTemplate(key)) {
    return key;
  }
  return SUPPORTED_TEMPLATES.GYM_FITNESS;
}
