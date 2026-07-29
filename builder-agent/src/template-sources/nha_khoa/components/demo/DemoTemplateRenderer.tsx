"use client";

import DentalTemplate from './templates/DentalTemplate';
import { buildDemoPageData } from '../../lib/demo/buildDemoPageData';
import { RawBusinessData } from '../../lib/demo/mockDemoData';

interface DemoTemplateRendererProps {
  data: any; // Receives the generic global DemoPageData
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  // Map the generic data to local RawBusinessData expected by nha_khoa
  const rawData: RawBusinessData = {
    placeId: data?.business?.placeId || 'nha-khoa-123',
    name: data?.business?.name || 'Nha Khoa Smile',
    address: data?.business?.address || '',
    phone: data?.business?.phone || '',
    email: data?.business?.email || '',
    rating: data?.trust?.rating || 4.9,
    reviewCount: data?.trust?.reviewCount || 120,
    area: data?.business?.address || 'Việt Nam',
  };

  // Build template-specific data that fully conforms to nha_khoa's local types (e.g. includes trust.metrics)
  const specificData = buildDemoPageData(rawData);

  return <DentalTemplate data={specificData as any} />;
}
