import React from 'react';
import { DemoPageData } from '../../types/demo';
import { EnglishCenterTemplate } from './templates/EnglishCenterTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export const DemoTemplateRenderer: React.FC<DemoTemplateRendererProps> = ({ data }) => {
  const templateKey = data.template?.key || 'english-center';

  switch (templateKey) {
    case 'english-center':
      return <EnglishCenterTemplate data={data} />;
    
    default:
      // Unknown template_key safe fallback
      console.warn(`Template key "${templateKey}" is unknown, fallback to english-center.`);
      return <EnglishCenterTemplate data={data} />;
  }
};
export default DemoTemplateRenderer;
