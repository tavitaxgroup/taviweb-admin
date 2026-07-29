import AuditLogClient from './AuditLogClient';
import { AuditService } from '@/lib/audit.service';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
  let initialLogs: any[] = [];
  
  try {
    initialLogs = await AuditService.getAuditLogs({ limit: 100 });
  } catch (error) {
    console.error('Failed to fetch initial audit logs', error);
  }

  return <AuditLogClient initialLogs={initialLogs} />;
}
