import type { Metadata } from "next";
import { notFound } from "next/navigation";
export const dynamic = 'force-dynamic';
import { supabase } from "@/lib/supabase";
import { getTemplateComponent } from "@/lib/templates/templateRegistry";
import { CompanyHome } from "@/components/company/CompanyHome";
import ChatbotWidget from "@/components/ChatbotWidget";

type Props = {
  params: Promise<{ tenantSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: tenant } = await supabase
    .from('tenants')
    .select('name, theme_config')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) return { title: 'Not Found' };

  return {
    title: `${tenant.name} - Powered by TAVI SaaS`,
  };
}

import { LivePreviewWrapper } from "@/components/LivePreviewWrapper";

export default async function TenantHomePage({ params }: Props) {
  const resolvedParams = await params;
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) {
    notFound();
  }

  // If the tenant has a template_key, render the specific template
  if (tenant.template_key) {
    const TemplateComponent = getTemplateComponent(tenant.template_key);
    
    if (TemplateComponent) {
      // Lazy load the data builder to avoid circular dependencies if any
      const { getTemplateDataBuilder } = await import("@/lib/templates/templateDataRegistry");
      const buildData = getTemplateDataBuilder(tenant.template_key);

      if (buildData) {
        // Build proper DemoPageData expected by the templates
        // We pass the tenant details as `partialData` so it overrides the mock data
        const overrides = tenant.theme_config?.website_overrides || {};
        const partialData: any = {
          business: {
            id: tenant.id,
            placeId: tenant.id,
            name: tenant.name,
            address: tenant.contact_info?.address || "Việt Nam",
            phone: tenant.contact_info?.phone || "0901234567",
            email: tenant.contact_info?.email || undefined,
          },
          ...overrides
        };

        const data = buildData(tenant.id, partialData);
        
        return (
          <>
            <LivePreviewWrapper initialData={data} templateKey={tenant.template_key} />
            <ChatbotWidget tenantId={tenant.id} />
          </>
        );
      }
    }
  }

  // Fallback to the default CompanyHome for the 'tavi' main site
  if (tenant.slug === 'tavi') {
    return (
      <>
        <CompanyHome />
        <ChatbotWidget tenantId={tenant.id} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{tenant.name}</h1>
          <p className="text-gray-500">Website đang trong quá trình xây dựng.</p>
        </div>
      </div>
      <ChatbotWidget tenantId={tenant.id} />
    </>
  );
}
