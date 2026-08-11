import { DemoPageData } from "../../types/demo";
import { buildDemoPageData } from "./buildDemoPageData";

export function getTemplateDataByPlaceId(placeId: string): DemoPageData {
  return buildDemoPageData(placeId);
}
