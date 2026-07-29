import { DemoPageData } from '../../types/demo';

export interface TemplateRouteInfo {
  key: string;
  name: string;
  industry: string;
}

export const SUPPORTED_TEMPLATES: TemplateRouteInfo[] = [
  {
    key: 'hair-salon',
    name: 'Hair Salon Elegant Template',
    industry: 'hair-salon',
  },
];

export function getTemplateByKey(key: string): TemplateRouteInfo | undefined {
  return SUPPORTED_TEMPLATES.find((t) => t.key === key);
}
