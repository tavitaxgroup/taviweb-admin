import { DemoPageData } from "../../../types/demo";
import { DemoNavbar } from "../sections/DemoNavbar";
import { DemoHero } from "../sections/DemoHero";
import { TrustBar } from "../sections/TrustBar";
import { AboutSection } from "../sections/AboutSection";
import { ServicesSection } from "../sections/ServicesSection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
import { GallerySection } from "../sections/GallerySection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ContactCTASection } from "../sections/ContactCTASection";
import { DemoFooter } from "../sections/DemoFooter";

interface CleaningServiceTemplateProps {
  data: DemoPageData;
}

export function CleaningServiceTemplate({ data }: CleaningServiceTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <DemoNavbar
        business={data.business}
        primaryActionLabel={data.hero.primaryAction.label}
        primaryActionHref={data.hero.primaryAction.href}
      />

      {/* 2. Hero Section */}
      <DemoHero
        hero={data.hero}
        rating={data.business.rating}
        reviewCount={data.business.reviewCount}
      />

      {/* 3. Trust Bar */}
      <TrustBar trust={data.trust} />

      {/* 4. About Section */}
      <AboutSection about={data.about} />

      {/* 5. Services Grid */}
      <ServicesSection
        services={data.services}
        phoneValue={data.business.phone}
      />

      {/* 6. Why Choose Us (Dark Section) */}
      <WhyChooseUsSection />

      {/* 7. Gallery Section */}
      <GallerySection gallery={data.gallery} />

      {/* 8. Customer Reviews */}
      <ReviewsSection
        reviews={data.reviews}
        rating={data.business.rating}
      />

      {/* 9. Contact CTA Section */}
      <ContactCTASection contact={data.contact} />

      {/* 10. Footer */}
      <DemoFooter
        business={data.business}
        services={data.services}
      />
    </div>
  );
}
