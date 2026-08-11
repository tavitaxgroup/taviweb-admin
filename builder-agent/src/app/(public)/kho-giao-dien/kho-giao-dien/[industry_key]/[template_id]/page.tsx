import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplateDetail } from "@/components/template-gallery/TemplateGallery";
import { getIndustryByKey, getTemplateCatalogItem } from "@/lib/templates/templateCatalog";

type PageProps = {
  params: Promise<{ industry_key: string; template_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry_key, template_id } = await params;
  const template = getTemplateCatalogItem(industry_key, template_id);

  if (!template) {
    return {
      title: "Không tìm thấy mẫu - TAVIWEB"
    };
  }

  return {
    title: `${template.name} - TAVIWEB`,
    description: template.description
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { industry_key, template_id } = await params;
  const industry = getIndustryByKey(industry_key);
  const template = getTemplateCatalogItem(industry_key, template_id);

  if (!industry || !template) notFound();

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Link href="/" className="gallery-brand">
          TAVIWEB
        </Link>
        <nav aria-label="Điều hướng chi tiết mẫu">
          <Link href="/kho-giao-dien/noi_that">Kho giao diện</Link>
          <Link href={`/kho-giao-dien/${industry.key}`}>{industry.name}</Link>
        </nav>
      </header>

      <TemplateDetail template={template} />
    </main>
  );
}
