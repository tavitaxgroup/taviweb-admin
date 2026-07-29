import { AuthProvider } from '@/modules/crm/contexts/AuthContext';

export default function BookingAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
