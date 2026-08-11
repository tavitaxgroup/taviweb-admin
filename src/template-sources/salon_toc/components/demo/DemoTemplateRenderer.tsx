import { DemoPageData } from '../../types/demo';
import HairSalonTemplate from './templates/HairSalonTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  // Always default or route dynamically based on template key
  switch (data.template?.key) {
    case 'hair-salon':
      return <HairSalonTemplate data={data} />;
    default:
      // Unknown template_key fallback (requirement: fallback safely, no dev selection screens or crashing)
      return <HairSalonTemplate data={data} />;
  }
}
