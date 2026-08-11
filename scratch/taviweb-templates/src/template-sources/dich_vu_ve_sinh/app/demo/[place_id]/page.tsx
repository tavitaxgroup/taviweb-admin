import { useEffect } from "react";
import { buildDemoPageData } from "../../../lib/demo/buildDemoPageData";
import { updateDocumentSEO } from "../../../lib/demo/seo";
import { DemoTemplateRenderer } from "../../../components/demo/DemoTemplateRenderer";

interface DemoPageProps {
  placeId: string;
}

export default function DemoPage({ placeId }: DemoPageProps) {
  const pageData = buildDemoPageData(placeId);

  useEffect(() => {
    // Update SEO headers (title, description, robots)
    updateDocumentSEO(pageData.seo);
  }, [pageData]);

  return <DemoTemplateRenderer data={pageData} />;
}
