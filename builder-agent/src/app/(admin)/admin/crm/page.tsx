import CRMView from '@/modules/crm/components/CRMView';

export const metadata = {
  title: 'CRM - Webbuider',
};

export default function CRMPage() {
  return (
    <main className="min-h-screen">
      <CRMView />
    </main>
  );
}
