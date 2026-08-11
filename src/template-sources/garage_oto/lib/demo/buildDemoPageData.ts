import { DemoPageData } from '../../types/demo';
import { mockDemoData, defaultPlaceId } from './mockDemoData';
import { applyFallbackRules } from './fallbackRules';

/**
 * Simulates fetching business data by place_id.
 * If the place_id does not exist, it falls back gracefully.
 */
export function getMockBusinessByPlaceId(placeId: string): Partial<DemoPageData> {
  if (mockDemoData[placeId]) {
    return mockDemoData[placeId];
  }
  
  // Return empty or partial data to test full automatic fallback generation
  return {};
}

/**
 * Combines fetched business data with defaults and industry rules.
 */
export function buildDemoPageData(placeId: string): DemoPageData {
  const rawData = getMockBusinessByPlaceId(placeId || defaultPlaceId);
  return applyFallbackRules(rawData);
}
