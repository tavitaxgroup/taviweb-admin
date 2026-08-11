import { DemoPageData } from "../../types/demo";
import { mockBusinesses } from "./mockDemoData";
import { defaultGymFitnessData } from "./templateDefaults";
import { applyFallbackRules } from "./fallbackRules";

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  // If the place ID exists in mock data, use it; otherwise, use the default "elite-strength"
  const rawData = mockBusinesses[placeId] || mockBusinesses["elite-strength"] || defaultGymFitnessData;
  return buildDemoPageData(rawData);
}

export function buildDemoPageData(rawData: Partial<DemoPageData>): DemoPageData {
  // Deep merge raw data with template defaults
  const merged: DemoPageData = {
    ...defaultGymFitnessData,
    ...rawData,
    business: {
      ...defaultGymFitnessData.business,
      ...rawData.business
    },
    template: {
      ...defaultGymFitnessData.template,
      ...rawData.template
    },
    hero: {
      ...defaultGymFitnessData.hero,
      ...rawData.hero
    },
    trust: {
      ...defaultGymFitnessData.trust,
      ...rawData.trust
    },
    about: {
      ...defaultGymFitnessData.about,
      ...rawData.about
    },
    services: rawData.services && rawData.services.length > 0 ? rawData.services : defaultGymFitnessData.services,
    gallery: rawData.gallery && rawData.gallery.length > 0 ? rawData.gallery : defaultGymFitnessData.gallery,
    reviews: rawData.reviews && rawData.reviews.length > 0 ? rawData.reviews : defaultGymFitnessData.reviews,
    contact: {
      ...defaultGymFitnessData.contact,
      ...rawData.contact
    },
    seo: {
      ...defaultGymFitnessData.seo,
      ...rawData.seo
    }
  };

  // Apply fallback/safeguard rules programmatic checks
  return applyFallbackRules(merged);
}
