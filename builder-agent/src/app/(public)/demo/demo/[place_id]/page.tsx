import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTemplateRenderer } from "@/components/demo/DemoTemplateRenderer";
import { buildDemoPageData } from "@/lib/demo/buildDemoPageData";
import { getMockLeadByPlaceId } from "@/lib/demo/mockDemoData";
import { routeTemplateByIndustry } from "@/lib/demo/templateRouter";
import { getBusinessByPlaceId } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ place_id: string }>;
};

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
  const data = buildDemoPageData(lead, templateKey);

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
  const data = buildDemoPageData(lead, templateKey);

  return <DemoTemplateRenderer data={data} />;
}
