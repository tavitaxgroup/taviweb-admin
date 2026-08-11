import React from 'react';
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

interface WeddingStudioTemplateProps {
  data: DemoPageData;
}

export default function WeddingStudioTemplate({ data }: WeddingStudioTemplateProps) {
  return (
    <div className="bg-[#fff8f8] text-[#201a1c] selection:bg-[#834767]/10 selection:text-[#834767] min-h-screen">
      {/* 1. Navbar */}
      <DemoNavbar data={data} />

      {/* 2. Hero */}
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
  );
}
