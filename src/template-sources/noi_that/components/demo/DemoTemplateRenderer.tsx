import { DemoPageData } from '../../types/demo';
import InteriorDesignTemplate from './templates/InteriorDesignTemplate';

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const key = data?.template?.key || 'interior-design';

  switch (key) {
    case 'interior-design':
      return <InteriorDesignTemplate data={data} />;
    default:
      console.warn(`Unknown template key: "${key}". Falling back to "interior-design".`);
      return <InteriorDesignTemplate data={data} />;
  }
}
