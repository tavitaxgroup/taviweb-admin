import { DemoPageData } from '../../types/demo';
import { getMockBusinessByPlaceId } from './mockDemoData';
import { applyFallbackRules } from './fallbackRules';

export function buildDemoPageData(placeId: string): DemoPageData {
  const mockData = getMockBusinessByPlaceId(placeId);
  return applyFallbackRules(mockData);
}
