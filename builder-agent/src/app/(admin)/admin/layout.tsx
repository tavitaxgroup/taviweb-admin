import { AuthProvider } from '@/modules/crm/contexts/AuthContext';
import { ClientLayout } from '@/components/layout/ClientLayout';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex overflow-hidden bg-slate-50 w-full">
      <AuthProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </AuthProvider>
    </div>
  );
}
