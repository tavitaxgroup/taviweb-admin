import React, { useEffect } from "react";
import { DemoPageData } from "../../../types/demo";
import { DemoNavbar } from "../sections/DemoNavbar";
import { DemoHero } from "../sections/DemoHero";
import { TrustBar } from "../sections/TrustBar";
import { AboutSection } from "../sections/AboutSection";
import { ServicesSection } from "../sections/ServicesSection";
import { GallerySection } from "../sections/GallerySection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ContactCTASection } from "../sections/ContactCTASection";
import { DemoFooter } from "../sections/DemoFooter";
import { updatePageSEO } from "../../../lib/demo/seo";

interface ConstructionCompanyTemplateProps {
  data: DemoPageData;
}

export function ConstructionCompanyTemplate({ data }: ConstructionCompanyTemplateProps) {
  // Update browser-level SEO automatically when this template mounts or data changes
  useEffect(() => {
    updatePageSEO(data.seo);
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      {/* 1. Navbar */}
      <DemoNavbar business={data.business} />

      {/* 2. Hero */}
      <DemoHero hero={data.hero} />

      {/* 3. Trust badges bar */}
      <TrustBar trust={data.trust} />

      {/* 4. About corporate story */}
      <AboutSection about={data.about} />

      {/* 5. Core Services Grid */}
      <ServicesSection services={data.services} />

      {/* 6. Works Gallery Grid */}
      <GallerySection gallery={data.gallery} />

      {/* 7. Why Choose Us benefits */}
      <WhyChooseUsSection whyChooseUs={data.whyChooseUs} />

      {/* 8. Customer reviews */}
      <ReviewsSection reviews={data.reviews} />

      {/* 9. Contact / Estimate CTA */}
      <ContactCTASection contact={data.contact} />

      {/* 10. Footer info */}
      <DemoFooter business={data.business} />
    </div>
  );
}
