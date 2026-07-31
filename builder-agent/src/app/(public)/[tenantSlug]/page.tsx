import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getTemplateComponent } from "@/lib/templates/templateRegistry";
import { CompanyHome } from "@/components/company/CompanyHome";
import { buildDemoPageData } from "@/lib/demo/buildDemoPageData";
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
      // Build proper DemoPageData expected by the templates
      const mockLead = {
        id: tenant.id,
        place_id: tenant.id,
        industry: tenant.template_key,
        status: "mock",
        name: tenant.name,
        formatted_address: tenant.contact_info?.address || "Việt Nam",
        formatted_phone_number: tenant.contact_info?.phone || "0901234567",
        website: null,
        image_url: null,
        rating: 5,
        user_ratings_total: 100,
        facebook_url: null,
        facebook_followers: 1000,
        facebook_email: tenant.contact_info?.email || null,
        demo_status: "ready",
        outreach_status: "not_sent",
        demo_url: `/${tenant.slug}`,
        notes: "Generated from tenant"
      } as any;

      const data = buildDemoPageData(mockLead, tenant.template_key);
      
      return (
        <>
          <TemplateComponent data={data} />
          <ChatbotWidget tenantId={tenant.id} />
        </>
      );
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
