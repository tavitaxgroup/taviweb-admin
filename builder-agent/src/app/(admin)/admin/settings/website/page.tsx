import { Metadata } from 'next';
import { WebsiteSettingsView } from '@/modules/crm/components/Settings/WebsiteSettingsView';

export const metadata: Metadata = {
  title: 'Cài đặt Website | TAVI SaaS',
};

export default function WebsiteSettingsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Cài đặt Website</h1>
        <p className="text-slate-500 mt-2">
          Tuỳ chỉnh nội dung và hình ảnh hiển thị trên trang web của bạn.
        </p>
      </div>

      <WebsiteSettingsView />
    </div>
  );
}
