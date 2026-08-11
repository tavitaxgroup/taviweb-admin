import React, { useEffect } from "react";
import { DemoPageData } from "../../../types/demo";
import { updatePageSEO } from "../../../lib/demo/seo";

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

interface GymFitnessTemplateProps {
  data: DemoPageData;
}

export default function GymFitnessTemplate({ data }: GymFitnessTemplateProps) {
  // Update SEO dynamically when the specific dataset changes
  useEffect(() => {
    if (data && data.seo) {
      updatePageSEO(data.seo);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-black overflow-x-hidden selection:bg-[#A3E635] selection:text-black">
      {/* 1. Header Navigation */}
      <DemoNavbar data={data} />

      {/* 2. Hero Section */}
      <DemoHero data={data} />

      {/* 3. Trust Bar */}
      <TrustBar data={data} />

      {/* 4. About Story Section */}
      <AboutSection data={data} />

      {/* 5. Services Section */}
      <ServicesSection data={data} />

      {/* 6. Gallery Bento Grid */}
      <GallerySection data={data} />

      {/* 7. Why Choose Us Advantages */}
      <WhyChooseUsSection data={data} />

      {/* 8. Client Testimonial Reviews */}
      <ReviewsSection data={data} />

      {/* 9. Registrations & Call to Action Block */}
      <ContactCTASection data={data} />

      {/* 10. Footer Section */}
      <DemoFooter data={data} />
    </div>
  );
}
