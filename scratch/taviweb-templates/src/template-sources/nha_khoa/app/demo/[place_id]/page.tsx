import { getMockDemoData } from '../../../lib/demo/mockDemoData';
import { buildDemoPageData } from '../../../lib/demo/buildDemoPageData';
import DemoTemplateRenderer from '../../../components/demo/DemoTemplateRenderer';

interface DemoPageProps {
  placeId: string;
}

export default function DemoPage({ placeId }: DemoPageProps) {
  // 1. Fetch raw business data (from mock system for now, easily swappable with Supabase fetch later)
  const rawBusiness = getMockDemoData(placeId);

  // 2. Map data to the standard DemoPageData shape
  const demoData = buildDemoPageData(rawBusiness);

  // 3. Render the correct template through the master renderer
  return <DemoTemplateRenderer data={demoData} />;
}
