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

interface InteriorDesignTemplateProps {
  data: DemoPageData;
}

export default function InteriorDesignTemplate({ data }: InteriorDesignTemplateProps) {
  return (
    <div className="font-sans bg-brand-bg text-brand-primary min-h-screen selection:bg-brand-secondary/30 selection:text-white">
      {/* 1. Navbar */}
      <DemoNavbar business={data.business} />

      {/* 2. Hero */}
      <DemoHero data={data.hero} />

      {/* 3. Trust Bar */}
      <TrustBar data={data.trust} />

      {/* 4. About */}
      <AboutSection data={data.about} />

      {/* 5. Services */}
      <ServicesSection services={data.services} />

      {/* 6. Gallery */}
      <GallerySection gallery={data.gallery} />

      {/* 7. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 8. Reviews */}
      <ReviewsSection reviews={data.reviews} />

      {/* 9. Contact CTA */}
      <ContactCTASection data={data.contact} business={data.business} />

      {/* 10. Footer */}
      <DemoFooter business={data.business} />
    </div>
  );
}
