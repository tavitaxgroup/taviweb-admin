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

interface GeneralClinicTemplateProps {
  data: DemoPageData;
}

export default function GeneralClinicTemplate({ data }: GeneralClinicTemplateProps) {
  return (
    <div className="bg-[#f8f9ff] min-h-screen text-slate-800 selection:bg-blue-100 selection:text-[#004ac6]">
      <DemoNavbar business={data.business} />
      <DemoHero hero={data.hero} />
      <TrustBar trust={data.trust} />
      <AboutSection about={data.about} />
      <ServicesSection services={data.services} />
      <GallerySection gallery={data.gallery} />
      <WhyChooseUsSection />
      <ReviewsSection reviews={data.reviews} />
      <ContactCTASection contact={data.contact} business={data.business} />
      <DemoFooter business={data.business} />
    </div>
  );
}
