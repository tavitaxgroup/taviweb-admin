import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustrySidebar, TemplateGrid } from "@/components/template-gallery/TemplateGallery";
import { getIndustryByKey, getTemplatesByIndustry, industryCatalog } from "@/lib/templates/templateCatalog";

type PageProps = {
  params: Promise<{ industry_key: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry_key } = await params;
  const industry = getIndustryByKey(industry_key);

  if (!industry) {
    return {
      title: "Không tìm thấy ngành - TAVIWEB"
    };
  }

  return {
    title: `${industry.name} - Kho giao diện TAVIWEB`,
    description: industry.description
  };
}

export default async function IndustryTemplatePage({ params }: PageProps) {
  const { industry_key } = await params;
  const industry = getIndustryByKey(industry_key);

  if (!industry) notFound();

  const templates = getTemplatesByIndustry(industry.key);

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <Link href="/" className="gallery-brand">
          TAVIWEB
        </Link>
        <nav aria-label="Điều hướng kho giao diện">
          <Link href="/kho-giao-dien/noi_that">Kho giao diện</Link>
          <Link href="/#contact">Liên hệ</Link>
        </nav>
      </header>

      <div className="gallery-shell">
        <IndustrySidebar industries={industryCatalog} activeKey={industry.key} />
        <div className="gallery-content">
          <section className="gallery-hero gallery-hero-compact">
            <p className="gallery-breadcrumb">Trang chủ / Kho giao diện / {industry.name}</p>
            <p className="gallery-eyebrow">Mẫu giao diện website</p>
            <h1>Mẫu giao diện Website {industry.name}</h1>
            <p>{industry.description}</p>
          </section>

          <section className="gallery-section">
            <div className="gallery-section-heading">
              <h2>Mẫu website hiện có</h2>
              <p>
                Hiện tại ngành này có một mẫu website để xem thử. Các mẫu ảnh dài khác
                sẽ được bổ sung vào kho giao diện sau.
              </p>
            </div>
            <TemplateGrid templates={templates} />
          </section>
        </div>
      </div>
    </main>
  );
}
