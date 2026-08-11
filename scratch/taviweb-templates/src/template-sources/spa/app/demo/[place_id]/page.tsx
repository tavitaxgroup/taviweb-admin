import React, { use } from "react";
import { getMockBusinessByPlaceId } from "../../../lib/demo/mockDemoData";
import { DemoTemplateRenderer } from "../../../components/demo/DemoTemplateRenderer";

interface DemoPageProps {
  params: Promise<{ place_id: string }> | { place_id: string };
}

export default function DemoPage({ params }: DemoPageProps) {
  // Support both Next.js Promise-based params (React 19+) and direct params
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const placeId = resolvedParams?.place_id || "lumina-spa";

  // Fetch static mock business parameters
  const pageData = getMockBusinessByPlaceId(placeId);

  return <DemoTemplateRenderer data={pageData} />;
}
