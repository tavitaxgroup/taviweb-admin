import React from 'react';
import { DemoPageData } from '../../types/demo';
import WeddingStudioTemplate from './templates/WeddingStudioTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template.key;

  switch (templateKey) {
    case 'wedding-studio':
      return <WeddingStudioTemplate data={data} />;
    default:
      // Fallback safely to WeddingStudioTemplate if key is unrecognized or missing
      return <WeddingStudioTemplate data={data} />;
  }
}
