import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateComponent } from "@/lib/templates/templateRegistry";
import { getMockLeadByPlaceId } from "@/lib/demo/mockDemoData";
import { routeTemplateByIndustry } from "@/lib/demo/templateRouter";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ place_id: string }>;
};

// Mock function until server supabase is implemented
const getBusinessByPlaceId = async (placeId: string) => null;

async function resolveLead(placeId: string) {
  const leadFromSupabase = await getBusinessByPlaceId(placeId);
  return leadFromSupabase ?? getMockLeadByPlaceId(placeId);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { place_id } = await params;
  const lead = await resolveLead(decodeURIComponent(place_id));

  if (!lead) {
    return {
      title: "Không tìm thấy demo",
      robots: { index: false, follow: false }
    };
  }

  const templateKey = routeTemplateByIndustry(lead.industry);
  const { getTemplateDataBuilder } = await import("@/lib/templates/templateDataRegistry");
  const buildData = getTemplateDataBuilder(templateKey);
  
  if (!buildData) {
    return { title: "Template đang cập nhật" };
  }

  const partialData: any = {
    business: {
      name: lead.name,
      address: lead.formatted_address,
      phone: lead.formatted_phone_number,
      facebookUrl: lead.facebook_url || undefined,
    },
    trust: {
      rating: lead.rating,
      reviewCount: lead.user_ratings_total,
      followers: lead.facebook_followers || undefined
    }
  };

  const data = buildData(lead.place_id, partialData);

  return {
    title: data.seo.title,
    description: data.seo.description,
    alternates: {
      canonical: data.seo.canonicalPath
    },
    robots: data.seo.noindex ? { index: false, follow: false } : undefined
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { place_id } = await params;
  const placeId = decodeURIComponent(place_id);
  const lead = await resolveLead(placeId);

  if (!lead) notFound();

  const templateKey = routeTemplateByIndustry(lead.industry);
  const TemplateComponent = getTemplateComponent(templateKey);
  const { getTemplateDataBuilder } = await import("@/lib/templates/templateDataRegistry");
  const buildData = getTemplateDataBuilder(templateKey);

  if (!TemplateComponent || !buildData) {
    return <div className="p-8 text-center">Template {templateKey} đang được cập nhật.</div>;
  }

  const partialData: any = {
    business: {
      name: lead.name,
      address: lead.formatted_address,
      phone: lead.formatted_phone_number,
      facebookUrl: lead.facebook_url || undefined,
    },
    trust: {
      rating: lead.rating,
      reviewCount: lead.user_ratings_total,
      followers: lead.facebook_followers || undefined
    }
  };

  const data = buildData(lead.place_id, partialData);

  return <TemplateComponent data={data} />;
}
