import { DemoPageData } from '../../types/demo';

export function getTemplateKey(data: DemoPageData): string {
  if (data?.template?.key) {
    return data.template.key;
  }
  return 'interior-design'; // Safe fallback
}
