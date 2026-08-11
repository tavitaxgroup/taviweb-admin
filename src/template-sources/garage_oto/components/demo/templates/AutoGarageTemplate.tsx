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

interface AutoGarageTemplateProps {
  data: DemoPageData;
}

export default function AutoGarageTemplate({ data }: AutoGarageTemplateProps) {
  return (
    <div className="bg-[#fbf9fa] text-[#1b1b1d] font-sans antialiased selection:bg-[#fd761a]/30">
      {/* 1. Navbar Section */}
      <DemoNavbar 
        business={data.business} 
        ctaLabel={data.hero.primaryAction.label}
      />

      {/* Main Content Body with paddingTop spacer for sticky Navbar */}
      <main className="pt-20">
        
        {/* 2. Hero Section */}
        <DemoHero data={data.hero} />

        {/* 3. Trust Bar Section */}
        <TrustBar data={data.trust} />

        {/* 4. About Section */}
        <AboutSection data={data.about} />

        {/* 5. Services Section */}
        <ServicesSection services={data.services} />

        {/* 6. Gallery Section (Bento Style) */}
        <GallerySection gallery={data.gallery} />

        {/* 7. Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 8. Reviews Section */}
        <ReviewsSection reviews={data.reviews} />

        {/* 9. Contact & Directions Section */}
        <ContactCTASection data={data.contact} />

      </main>

      {/* 10. Footer Section */}
      <DemoFooter business={data.business} />
    </div>
  );
}
