import { DemoPageData } from '../../types/demo';

export interface TemplateRoute {
  key: string;
  name: string;
}

export function getTemplateRoute(templateKey?: string): TemplateRoute {
  const key = templateKey?.toLowerCase() || 'cafe';
  switch (key) {
    case 'cafe':
      return { key: 'cafe', name: 'Quán Cafe' };
    default:
      return { key: 'cafe', name: 'Quán Cafe (Fallback)' };
  }
}
