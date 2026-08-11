import React, { useEffect } from "react";
import { DemoPageData } from "../../../types/demo";
import DemoNavbar from "../sections/DemoNavbar";
import DemoHero from "../sections/DemoHero";
import TrustBar from "../sections/TrustBar";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import GallerySection from "../sections/GallerySection";
import WhyChooseUsSection from "../sections/WhyChooseUsSection";
import ReviewsSection from "../sections/ReviewsSection";
import ContactCTASection from "../sections/ContactCTASection";
import DemoFooter from "../sections/DemoFooter";
import { updateSEO } from "../../../lib/demo/seo";

interface AestheticClinicTemplateProps {
  data: DemoPageData;
}

export default function AestheticClinicTemplate({ data }: AestheticClinicTemplateProps) {
  // Update browser tab SEO fields on mount or data change
  useEffect(() => {
    if (data && data.seo) {
      updateSEO(data.seo);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-secondary font-sans selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* 1. Navbar */}
      <DemoNavbar data={data} />

      {/* 2. Hero Section */}
      <DemoHero data={data} />

      {/* 3. Trust Bar */}
      <TrustBar data={data} />

      {/* 4. About Section */}
      <AboutSection data={data} />

      {/* 5. Services Grid */}
      <ServicesSection data={data} />

      {/* 6. Gallery Section (Không gian & Tiện nghi) */}
      <GallerySection data={data} />

      {/* 7. Why Choose Us (Công nghệ, Bác sĩ, Quy trình) */}
      <WhyChooseUsSection data={data} />

      {/* 8. Reviews (Cảm nhận khách hàng) */}
      <ReviewsSection data={data} />

      {/* 9. Contact CTA */}
      <ContactCTASection data={data} />

      {/* 10. Footer */}
      <DemoFooter data={data} />
    </div>
  );
}
