import { DemoPageData } from "../../types/demo";
import { getMockBusinessByPlaceId } from "./mockDemoData";
import { applyFallbackRules } from "./fallbackRules";

export function buildDemoPageData(placeId: string): DemoPageData {
  // Retrieve the mock restaurant data
  const rawData = getMockBusinessByPlaceId(placeId);
  
  // Apply the domain/industry fallback rules
  return applyFallbackRules(rawData);
}
