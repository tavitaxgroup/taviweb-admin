import Link from "next/link";
import type { IndustryCatalogItem, TemplateCatalogItem } from "@/lib/templates/templateCatalog";

export function IndustrySidebar({
  industries,
  activeKey
}: {
  industries: IndustryCatalogItem[];
  activeKey?: string;
}) {
  return (
    <aside className="gallery-sidebar" aria-label="Danh mục ngành nghề">
      <div className="gallery-sidebar-title">
        <span>Kho giao diện</span>
      </div>
      <nav>
        {industries.map((industry) => (
          <Link
            className={industry.key === activeKey ? "is-active" : undefined}
            href={`/kho-giao-dien/${industry.key}`}
            key={industry.key}
          >
            <span>{industry.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function IndustryList({ industries }: { industries: IndustryCatalogItem[] }) {
  return (
    <div className="gallery-industry-grid">
      {industries.map((industry) => (
        <Link className="gallery-industry-card" href={`/kho-giao-dien/${industry.key}`} key={industry.key}>
          <span>{industry.name}</span>
          <p>{industry.description}</p>
          <strong>Xem mẫu thuộc ngành này</strong>
        </Link>
      ))}
    </div>
  );
}

export function TemplateCard({ template }: { template: TemplateCatalogItem }) {
  return (
    <article className="gallery-template-card">
      <div className="gallery-template-thumb">
        <span>{template.name}</span>
      </div>
      <div className="gallery-template-body">
        <h3>{template.name}</h3>
        <p>{template.description}</p>
        <div className="gallery-tags">
          {template.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="gallery-template-actions">
          {template.demoUrl ? <Link href={template.demoUrl}>Xem giao diện mẫu</Link> : null}
        </div>
      </div>
    </article>
  );
}

export function TemplateGrid({ templates }: { templates: TemplateCatalogItem[] }) {
  return (
    <div className="gallery-template-grid gallery-template-grid-simple">
      {templates.map((template) => (
        <TemplateCard template={template} key={template.id} />
      ))}
    </div>
  );
}

export function TemplateDetail({ template }: { template: TemplateCatalogItem }) {
  return (
    <article className="gallery-detail">
      <div>
        <p className="gallery-eyebrow">Mẫu giao diện</p>
        <h1>{template.name}</h1>
        <p>{template.description}</p>
        <div className="gallery-detail-actions">
          {template.demoUrl ? (
            <Link className="gallery-primary-link" href={template.demoUrl}>
              Xem mẫu website
            </Link>
          ) : null}
          <Link className="gallery-secondary-link" href="/#contact">
            Tư vấn theo mẫu này
          </Link>
        </div>
      </div>
      <div className="gallery-preview-panel">
        <span>TAVIWEB</span>
        <strong>{template.name}</strong>
        <p>Ảnh preview dài của các mẫu website khác sẽ được bổ sung vào khu vực này sau.</p>
      </div>
    </article>
  );
}
