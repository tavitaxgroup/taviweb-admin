import { DemoPageData } from '../../types/demo';
import { getMockDemoData } from './mockDemoData';
import { applyFallbackRules } from './fallbackRules';

/**
 * Builds DemoPageData from a business ID or partial data structure.
 * This function handles mapping and default configurations.
 */
export function buildDemoPageData(placeId: string, partialData?: Partial<DemoPageData>): DemoPageData {
  // If we have precise partial data, merge it. Otherwise, look up the mock database.
  const sourceData = partialData || getMockDemoData(placeId);
  return applyFallbackRules(sourceData);
}
