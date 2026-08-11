export function getTemplateKey(key?: string): string {
  if (!key || key.toLowerCase() !== 'dental') {
    return 'dental'; // Fallback to 'dental' as default for this dental system
  }
  return 'dental';
}

export function isSupportedTemplate(key: string): boolean {
  return key === 'dental';
}
