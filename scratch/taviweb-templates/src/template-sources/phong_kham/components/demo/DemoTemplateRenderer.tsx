import { DemoPageData } from '../../types/demo';
import GeneralClinicTemplate from './templates/GeneralClinicTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  // Select the appropriate template component based on template.key
  switch (data.template.key) {
    case 'general-clinic':
      return <GeneralClinicTemplate data={data} />;
    default:
      // Fallback safely to GeneralClinicTemplate
      return <GeneralClinicTemplate data={data} />;
  }
}
