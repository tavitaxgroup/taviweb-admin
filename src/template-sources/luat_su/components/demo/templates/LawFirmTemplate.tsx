import { useEffect } from "react";
import { DemoPageData } from "../../../types/demo";
import { updateSEO } from "../../../lib/demo/seo";
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

interface TemplateProps {
  data: DemoPageData;
}

export default function LawFirmTemplate({ data }: TemplateProps) {
  // Update SEO settings when the template is rendered
  useEffect(() => {
    updateSEO(data.seo);
  }, [data]);

  return (
    <div className="bg-stone-50 min-h-screen selection:bg-amber-700 selection:text-white">
      {/* 1. Navbar */}
      <DemoNavbar data={data} />

      {/* Push content below fixed Navbar */}
      <div className="pt-20">
        {/* 2. Hero Section */}
        <DemoHero data={data} />

        {/* 3. Trust Bar */}
        <TrustBar data={data} />

        {/* 4. About Section */}
        <AboutSection data={data} />

        {/* 5. Services Section */}
        <ServicesSection data={data} />

        {/* 6. Gallery Section */}
        <GallerySection data={data} />

        {/* 7. Why Choose Us Section */}
        <WhyChooseUsSection data={data} />

        {/* 8. Reviews Section */}
        <ReviewsSection data={data} />

        {/* 9. Contact CTA Section */}
        <ContactCTASection data={data} />

        {/* 10. Footer */}
        <DemoFooter data={data} />
      </div>
    </div>
  );
}
