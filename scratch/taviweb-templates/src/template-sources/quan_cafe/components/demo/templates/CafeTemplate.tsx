import React, { useEffect } from 'react';
import { DemoPageData } from '../../../types/demo';
import DemoNavbar from '../sections/DemoNavbar';
import DemoHero from '../sections/DemoHero';
import TrustBar from '../sections/TrustBar';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import GallerySection from '../sections/GallerySection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import ReviewsSection from '../sections/ReviewsSection';
import ContactCTASection from '../sections/ContactCTASection';
import DemoFooter from '../sections/DemoFooter';
import { updatePageMetadata } from '../../../lib/demo/seo';

interface TemplateProps {
  data: DemoPageData;
}

export default function CafeTemplate({ data }: TemplateProps) {
  // Sync page SEO metadata on mount / dynamic change
  useEffect(() => {
    updatePageMetadata(data.seo);
  }, [data.seo]);

  return (
    <div className="bg-[#fff8f5] text-[#1e1b19] font-sans antialiased min-h-screen selection:bg-[#ffdcc6] selection:text-[#2d1604]">
      {/* 1. Navbar */}
      <DemoNavbar data={data} />

      {/* 2. Hero */}
      <div id="home">
        <DemoHero data={data} />
      </div>

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
  );
}
