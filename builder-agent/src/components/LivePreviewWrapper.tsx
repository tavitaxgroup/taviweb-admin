"use client";

import React, { useState, useEffect } from 'react';
import { DemoPageData, WebsiteOverrides } from '@/types/demo';

// Re-implement a lightweight client-side deep merge for live preview
function clientMergeData(base: DemoPageData, overrides?: WebsiteOverrides): DemoPageData {
  if (!overrides) return base;
  
  // Create a deep copy to avoid mutating the original
  const merged = JSON.parse(JSON.stringify(base)) as any;
  const anyOverrides = overrides as any;

  // Merge Hero
  if (anyOverrides.hero) {
    if (anyOverrides.hero.title) merged.hero.title = anyOverrides.hero.title;
    if (anyOverrides.hero.subtitle) merged.hero.subtitle = anyOverrides.hero.subtitle;
    if (anyOverrides.hero.eyebrow) merged.hero.eyebrow = anyOverrides.hero.eyebrow;
    if (anyOverrides.hero.badge) merged.hero.eyebrow = anyOverrides.hero.badge; // some templates use badge instead of eyebrow
    
    if (anyOverrides.hero.image?.src) {
      merged.hero.image = anyOverrides.hero.image;
    }
  }

  // Merge About
  if (overrides.about_image) {
    merged.about.image = { ...merged.about.image, src: overrides.about_image } as any;
  }

  // Merge Trust
  if (overrides.trust) {
    if (overrides.trust.rating) merged.trust.rating = overrides.trust.rating;
    if (overrides.trust.reviewCount) merged.trust.reviewCount = overrides.trust.reviewCount;
    if (overrides.trust.followers) merged.trust.followers = overrides.trust.followers;
  }

  // Merge Contact
  if (overrides.contact) {
    if (overrides.contact.phone) merged.contact.phone = overrides.contact.phone;
    if (overrides.contact.email) merged.contact.email = overrides.contact.email;
    if (overrides.contact.address) merged.contact.address = overrides.contact.address;
    if (overrides.contact.MessageCircle) merged.contact.facebookUrl = overrides.contact.MessageCircle;
  }

  // Handle Gallery URLs array
  if (overrides.gallery_urls && overrides.gallery_urls.length > 0) {
    merged.gallery = overrides.gallery_urls.map((url, i) => ({
      src: url,
      alt: `Gallery image ${i + 1}`,
      source: 'business'
    }));
  }

  return merged;
}

import { getTemplateComponent } from '@/lib/templates/templateRegistry';

interface LivePreviewWrapperProps {
  initialData: DemoPageData;
  templateKey: string;
}

export function LivePreviewWrapper({ initialData, templateKey }: LivePreviewWrapperProps) {
  const [data, setData] = useState<DemoPageData>(initialData);

  useEffect(() => {
    // Determine if we are inside an iframe (preview mode)
    const isIframe = window !== window.top;
    
    if (!isIframe) return;

    // Listen for messages from the parent window (CRM)
    const handleMessage = (event: MessageEvent) => {
      // In production, we should check event.origin to match our CRM domain
      // if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'UPDATE_OVERRIDES') {
        const newOverrides = event.data.payload as WebsiteOverrides;
        const mergedData = clientMergeData(initialData, newOverrides);
        setData(mergedData);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Notify parent that iframe is ready to receive data
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [initialData]);

  const TemplateComponent = getTemplateComponent(templateKey);

  if (!TemplateComponent) {
    return <div className="p-8 text-center">Template không tồn tại.</div>;
  }

  return <TemplateComponent data={data} />;
}
