import React, { useEffect } from "react";
import { DemoPageData } from "../../../types/demo";
import { DemoNavbar } from "../sections/DemoNavbar";
import { DemoHero } from "../sections/DemoHero";
import { TrustBar } from "../sections/TrustBar";
import { AboutSection } from "../sections/AboutSection";
import { ServicesSection } from "../sections/ServicesSection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
import { GallerySection } from "../sections/GallerySection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ContactCTASection } from "../sections/ContactCTASection";
import { DemoFooter } from "../sections/DemoFooter";
import { updateSEO } from "../../../lib/demo/seo";
import { applyFallbackRules } from "../../../lib/demo/fallbackRules";

interface SpaTemplateProps {
  data: DemoPageData;
}

export function SpaTemplate({ data }: SpaTemplateProps) {
  // Apply fallback rules to ensure layout completeness
  const finalizedData = applyFallbackRules(data);

  useEffect(() => {
    // Dynamically update document headers for simulation SEO compliance
    updateSEO(finalizedData.seo);
  }, [finalizedData]);

  return (
    <div className="font-sans text-on-background bg-background min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed antialiased">
      {/* 1. Navbar */}
      <DemoNavbar business={finalizedData.business} contact={finalizedData.contact} />

      {/* Main flow with padding compensating fixed nav */}
      <main className="pt-20">
        {/* 2. Hero */}
        <DemoHero hero={finalizedData.hero} />

        {/* 3. Trust proof metrics */}
        <TrustBar trust={finalizedData.trust} />

        {/* 4. About introduction */}
        <AboutSection about={finalizedData.about} />

        {/* 5. Services catalog */}
        <ServicesSection services={finalizedData.services} />

        {/* 6. Symmetrical benefits */}
        <WhyChooseUsSection features={finalizedData.about?.features} />

        {/* 7. Asymmetrical Gallery layout */}
        <GallerySection gallery={finalizedData.gallery} />

        {/* 8. Testimonials slider */}
        <ReviewsSection reviews={finalizedData.reviews} />

        {/* 9. Booking CTA focus */}
        <ContactCTASection contact={finalizedData.contact} />
      </main>

      {/* 10. Footer info links */}
      <DemoFooter business={finalizedData.business} contact={finalizedData.contact} />
    </div>
  );
}
export default SpaTemplate;
