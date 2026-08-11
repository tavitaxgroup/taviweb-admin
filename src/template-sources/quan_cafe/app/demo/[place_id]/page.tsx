import React, { use, useEffect, useState } from 'react';
import { buildDemoPageData } from '../../../lib/demo/buildDemoPageData';
import DemoTemplateRenderer from '../../../components/demo/DemoTemplateRenderer';
import { DemoPageData } from '../../../types/demo';

interface PageProps {
  params: { place_id: string } | Promise<{ place_id: string }>;
}

export default function DemoPage({ params }: PageProps) {
  const [resolvedPlaceId, setResolvedPlaceId] = useState<string>('quan-cafe-dep');
  const [pageData, setPageData] = useState<DemoPageData | null>(null);

  useEffect(() => {
    // Safely resolve params whether they are a Promise (Next.js 15+) or standard object (Next.js 13/14)
    if (params instanceof Promise) {
      params.then((res) => {
        setResolvedPlaceId(res.place_id);
      });
    } else if (params && params.place_id) {
      setResolvedPlaceId(params.place_id);
    }
  }, [params]);

  useEffect(() => {
    const data = buildDemoPageData(resolvedPlaceId);
    setPageData(data);
  }, [resolvedPlaceId]);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-[#fff8f5] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#553722] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#50453e] font-medium font-sans">Đang tải trang mẫu...</p>
      </div>
    );
  }

  return <DemoTemplateRenderer data={pageData} />;
}
