"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

function ReferenceTemplateCard({
  template,
  onOpen
}: {
  template: TemplateCatalogItem;
  onOpen: (template: TemplateCatalogItem) => void;
}) {
  const image = template.longPreviewImage ?? template.thumbnail;

  return (
    <article className="gallery-reference-card">
      <div className="gallery-reference-image" aria-label={`Ảnh mẫu ${template.name}`}>
        <img src={image} alt={template.name} loading="lazy" />
        <div className="gallery-reference-overlay">
          <button type="button" onClick={() => onOpen(template)}>
            Xem chi tiết
          </button>
          {template.demoUrl ? <Link href={template.demoUrl}>Xem demo</Link> : null}
        </div>
      </div>
      <div className="gallery-reference-info">
        <h3>{template.name}</h3>
        {template.packageName ? <p>{template.packageName}</p> : null}
        {template.priceLabel ? <strong>{template.priceLabel}</strong> : null}
      </div>
    </article>
  );
}

function TemplatePreviewModal({
  template,
  onClose
}: {
  template: TemplateCatalogItem;
  onClose: () => void;
}) {
  const image = template.longPreviewImage ?? template.thumbnail;
  const imageScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = imageScrollRef.current;
    if (!container) return;

    let animationFrame = 0;
    let startTimer = 0;
    let retryTimer = 0;
    let cancelled = false;
    let lastTimestamp = 0;

    const stopAutoScroll = () => {
      cancelled = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (retryTimer) window.clearTimeout(retryTimer);
    };

    const runAutoScroll = () => {
      if (cancelled) return;

      container.scrollTop = 0;
      const maxScrollTop = container.scrollHeight - container.clientHeight;

      if (maxScrollTop <= 8) {
        retryTimer = window.setTimeout(runAutoScroll, 350);
        return;
      }

      lastTimestamp = window.performance.now();

      const step = (timestamp: number) => {
        if (cancelled) return;

        const elapsed = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        container.scrollTop = Math.min(container.scrollTop + elapsed * 0.035, maxScrollTop);

        if (container.scrollTop < maxScrollTop - 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const stopOnUserInteraction = () => stopAutoScroll();

    container.addEventListener("wheel", stopOnUserInteraction, { passive: true });
    container.addEventListener("touchstart", stopOnUserInteraction, { passive: true });
    container.addEventListener("pointerdown", stopOnUserInteraction);

    startTimer = window.setTimeout(runAutoScroll, 700);

    return () => {
      stopAutoScroll();
      if (startTimer) window.clearTimeout(startTimer);
      container.removeEventListener("wheel", stopOnUserInteraction);
      container.removeEventListener("touchstart", stopOnUserInteraction);
      container.removeEventListener("pointerdown", stopOnUserInteraction);
    };
  }, [template.id]);

  return (
    <div className="gallery-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="gallery-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Chi tiết ${template.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="gallery-modal-header">
          <div>
            <p>Mẫu giao diện</p>
            <h2>{template.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng chi tiết mẫu">
            ×
          </button>
        </div>
        <div className="gallery-modal-body">
          <div className="gallery-modal-image" ref={imageScrollRef}>
            <img src={image} alt={template.name} />
          </div>
          <aside className="gallery-modal-info">
            <p>{template.description}</p>
            <dl>
              <div>
                <dt>Mã mẫu</dt>
                <dd>{template.id}</dd>
              </div>
              <div>
                <dt>Gói</dt>
                <dd>{template.packageName ?? "Mẫu website tham khảo"}</dd>
              </div>
              <div>
                <dt>Chi phí</dt>
                <dd>{template.priceLabel ?? "Liên hệ"}</dd>
              </div>
            </dl>
            <div className="gallery-tags">
              {template.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="gallery-template-actions">
              {template.demoUrl ? <Link href={template.demoUrl}>Xem demo</Link> : null}
              <Link href="/#contact">Tư vấn mẫu này</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export function TemplateGrid({ templates }: { templates: TemplateCatalogItem[] }) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCatalogItem | null>(null);
  const renderTemplates = templates.filter((template) => template.type === "render_template");
  const referenceTemplates = templates.filter((template) => template.type === "reference_image");

  return (
    <>
      {renderTemplates.length > 0 ? (
        <div className="gallery-template-grid gallery-template-grid-simple">
          {renderTemplates.map((template) => (
            <TemplateCard template={template} key={template.id} />
          ))}
        </div>
      ) : null}

      {referenceTemplates.length > 0 ? (
        <div className="gallery-reference-section">
          <div className="gallery-reference-heading">
            <h3>Mẫu thiết kế website tham khảo</h3>
            <p>Rê chuột vào từng mẫu để xem ảnh tự cuộn, bấm xem chi tiết để mở ảnh lớn.</p>
          </div>
          <div className="gallery-reference-grid">
            {referenceTemplates.map((template) => (
              <ReferenceTemplateCard template={template} key={template.id} onOpen={setSelectedTemplate} />
            ))}
          </div>
        </div>
      ) : null}

      {selectedTemplate ? (
        <TemplatePreviewModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
      ) : null}
    </>
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
