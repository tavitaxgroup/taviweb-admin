import React from "react";
import { DemoPageData } from "../../../types/demo";

// Sections
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

export default function FineDiningRestaurantTemplate({ data }: TemplateProps) {
  return (
    <div className="bg-[#fcf9f4] text-[#1c1c19] min-h-screen relative font-sans selection:bg-[#5f030a] selection:text-white">
      {/* 1. Navbar */}
      <DemoNavbar business={data.business} />

      {/* 2. Hero */}
      <DemoHero hero={data.hero} />

      {/* 3. Trust Bar */}
      <TrustBar trust={data.trust} />

      {/* 4. About Section */}
      <AboutSection about={data.about} />

      {/* 5. Services Section */}
      <ServicesSection services={data.services} />

      {/* 6. Gallery Section */}
      <GallerySection gallery={data.gallery} />

      {/* 7. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 8. Reviews Section */}
      <ReviewsSection reviews={data.reviews} />

      {/* 9. Contact Section with Booking Form */}
      <ContactCTASection contact={data.contact} />

      {/* 10. Footer */}
      <DemoFooter business={data.business} />
    </div>
  );
}
