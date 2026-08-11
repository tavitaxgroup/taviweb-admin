import React from "react";
import { getMockBusinessByPlaceId } from "../../../lib/demo/buildDemoPageData";
import DemoTemplateRenderer from "../../../components/demo/DemoTemplateRenderer";

interface PageProps {
  params: {
    place_id: string;
  };
}

export default function Page({ params }: PageProps) {
  // 1. Fetch data by place_id
  const data = getMockBusinessByPlaceId(params.place_id);

  // 2. Render directly
  return <DemoTemplateRenderer data={data} />;
}
export { Page };
