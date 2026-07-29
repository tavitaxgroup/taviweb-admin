import { DemoPageData } from '../../types/demo';
import { getMockBusinessByPlaceId } from './mockDemoData';

export function buildDemoPageData(placeId: string): DemoPageData {
  return getMockBusinessByPlaceId(placeId);
}
