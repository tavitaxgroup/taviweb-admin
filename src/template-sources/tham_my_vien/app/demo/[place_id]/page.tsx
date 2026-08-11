import React from "react";
import { buildDemoPageData } from "../../../lib/demo/buildDemoPageData";
import DemoTemplateRenderer from "../../../components/demo/DemoTemplateRenderer";

interface PageProps {
  params: {
    place_id: string;
  };
}

/**
 * Next.js-compliant landing page component for demo route /demo/[place_id]
 */
export default function DemoPage({ params }: PageProps) {
  const { place_id } = params;

  // 1. Build the dynamic landing page payload (fetching & mapping with fallbacks)
  const pageData = buildDemoPageData(place_id);

  // 2. Pass the data directly into the renderer
  return <DemoTemplateRenderer data={pageData} />;
}
