import { DemoPageData } from "../../types/demo";
import { buildDemoPageData as internalBuilder } from "./mockDemoData";

export function buildDemoPageData(businessRawData: any): DemoPageData {
  return internalBuilder(businessRawData);
}
