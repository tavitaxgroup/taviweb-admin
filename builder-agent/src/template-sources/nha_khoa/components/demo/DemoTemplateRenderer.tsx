import { DemoPageData } from '../../types/demo';
import DentalTemplate from './templates/DentalTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template?.key?.toLowerCase();

  switch (templateKey) {
    case 'dental':
      return <DentalTemplate data={data} />;
    
    default:
      // Robust fall-back default rendering of DentalTemplate as requested
      return <DentalTemplate data={data} />;
  }
}
