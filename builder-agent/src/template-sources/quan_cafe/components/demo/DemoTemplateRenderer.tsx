import React from 'react';
import { DemoPageData } from '../../types/demo';
import CafeTemplate from './templates/CafeTemplate';

interface RendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: RendererProps) {
  const templateKey = data.template.key?.toLowerCase() || 'cafe';

  switch (templateKey) {
    case 'cafe':
      return <CafeTemplate data={data} />;
    default:
      // Fallback gracefully to the Cafe template as specified by guidelines
      return <CafeTemplate data={data} />;
  }
}
