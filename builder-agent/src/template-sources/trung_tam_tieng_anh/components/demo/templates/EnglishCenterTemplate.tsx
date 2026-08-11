"use client";
import React, { useEffect } from 'react';
import { DemoPageData } from '../../../types/demo';
import { updateSeoMetadata } from '../../../lib/demo/seo';

// Import sections
import { DemoNavbar } from '../sections/DemoNavbar';
import { DemoHero } from '../sections/DemoHero';
import { TrustBar } from '../sections/TrustBar';
import { AboutSection } from '../sections/AboutSection';
import { ServicesSection } from '../sections/ServicesSection';
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection';
import { GallerySection } from '../sections/GallerySection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { ContactCTASection } from '../sections/ContactCTASection';
import { DemoFooter } from '../sections/DemoFooter';

interface EnglishCenterTemplateProps {
  data: DemoPageData;
}

export const EnglishCenterTemplate: React.FC<EnglishCenterTemplateProps> = ({ data }) => {
  // Update client SEO when mounting or when data changes
  useEffect(() => {
    if (data.seo) {
      updateSeoMetadata(data.seo);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased scroll-smooth selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* 1. Header Navigation */}
      <DemoNavbar business={data.business} />

      {/* Main Page Layout */}
      <main className="pt-[73px]"> {/* Offset for fixed top navbar */}
        
        {/* 2. Hero Section */}
        <DemoHero data={data.hero} />

        {/* 3. Trust Bar */}
        <TrustBar data={data.trust} />

        {/* 4. About Section */}
        <AboutSection data={data.about} />

        {/* 5. Services (Courses) Section */}
        <ServicesSection services={data.services} />

        {/* 6. Why Choose Us Section */}
        <WhyChooseUsSection features={data.about.features} />

        {/* 7. Gallery Section */}
        <GallerySection gallery={data.gallery} />

        {/* 8. Student Reviews (Testimonials) */}
        <ReviewsSection reviews={data.reviews} />

        {/* 9. Contact CTA with Location & Form */}
        <ContactCTASection data={data.contact} />

      </main>

      {/* 10. Footer */}
      <DemoFooter business={data.business} />

    </div>
  );
};
export default EnglishCenterTemplate;
