import { useEffect } from 'react';
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
import { updateSeo } from '../../../lib/demo/seo';

interface HairSalonTemplateProps {
  data: DemoPageData;
}

export default function HairSalonTemplate({ data }: HairSalonTemplateProps) {
  // Update SEO details dynamically on mount and data change
  useEffect(() => {
    if (data.seo) {
      updateSeo(data.seo);
    }
  }, [data]);

  const handleBookClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1c1b1c] overflow-x-hidden selection:bg-[#ffdcbd] selection:text-[#121315]">
      {/* 1. Navbar */}
      <DemoNavbar business={data.business} />

      {/* 2. Hero Section */}
      <DemoHero hero={data.hero} />

      {/* 3. Trust Bar */}
      <TrustBar trust={data.trust} />

      {/* 4. About Section */}
      <AboutSection about={data.about} />

      {/* 5. Services Section */}
      <ServicesSection services={data.services} onBookClick={handleBookClick} />

      {/* 6. Gallery Section (Bento Grid) */}
      <GallerySection gallery={data.gallery} />

      {/* 7. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 8. Reviews Section */}
      <ReviewsSection reviews={data.reviews} />

      {/* 9. Contact CTA Section */}
      <ContactCTASection contact={data.contact} business={data.business} onBookClick={handleBookClick} />

      {/* 10. Footer Section */}
      <DemoFooter business={data.business} />
    </div>
  );
}
