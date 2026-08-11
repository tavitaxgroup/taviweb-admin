import React from 'react';
import { DemoPageData } from '../../types/demo';
import AutoGarageTemplate from './templates/AutoGarageTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  // Select the appropriate template component based on key
  switch (data.template?.key) {
    case 'auto-garage':
      return <AutoGarageTemplate data={data} />;
    default:
      // Robust Fallback Rule: If unknown key, render AutoGarageTemplate
      return <AutoGarageTemplate data={data} />;
  }
}
