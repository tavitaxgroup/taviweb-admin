"use client";

import InteriorDesignTemplate from './templates/InteriorDesignTemplate';
import { buildDemoPageData } from '../../lib/demo/buildDemoPageData';

interface DemoTemplateRendererProps {
  data: any; // Receives the generic global DemoPageData
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  // Extract placeId for mock lookup (or fallback to atelier-ethos)
  const placeId = data?.business?.placeId || 'atelier-ethos';
  
  // Merge the global generic DemoPageData over the template-specific mock data structure.
  // This ensures all template-specific nested properties (e.g. trust.items, about.stats) are present
  // while overriding business name, phone, etc., with the real tenant data.
  const specificData = buildDemoPageData(placeId, data);

  return <InteriorDesignTemplate data={specificData as any} />;
}
