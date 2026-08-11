import { useEffect, useState } from 'react';
import { buildDemoPageData } from '../../../lib/demo/buildDemoPageData';
import DemoTemplateRenderer from '../../../components/demo/DemoTemplateRenderer';
import { DemoPageData } from '../../../types/demo';

interface PageProps {
  placeId: string;
}

export default function DemoPage({ placeId }: PageProps) {
  const [pageData, setPageData] = useState<DemoPageData | null>(null);

  useEffect(() => {
    // 1. Fetch & build page data based on placeId
    const data = buildDemoPageData(placeId);
    setPageData(data);
  }, [placeId]);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-sm font-semibold tracking-widest text-[#855316] uppercase animate-pulse">
          Đang tải thông tin salon...
        </div>
      </div>
    );
  }

  // 2. Render the template renderer with prepared data
  return <DemoTemplateRenderer data={pageData} />;
}
