import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { ContactData, BusinessData } from '../../../types/demo';

interface ContactCTASectionProps {
  contact: ContactData;
  business: BusinessData;
  onBookClick: () => void;
}

export default function ContactCTASection({ contact, business, onBookClick }: ContactCTASectionProps) {
  return (
    <section id="contact" className="bg-[#121315] py-24 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
        <h2 
          className="text-3xl md:text-5xl font-bold text-[#ffdcbd] mb-12 tracking-tight leading-snug max-w-4xl mx-auto"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {contact.title}
        </h2>

        {/* Action Options Grid / Flex */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-10">
          
          {/* Messenger CTA */}
          <a 
            href={business.facebookUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-[#ffdcbd] hover:text-white transition-colors duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare size={24} />
            </div>
            <span 
              className="text-lg md:text-xl font-bold tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {contact.facebookCtaText}
            </span>
          </a>

          {/* Separator 1 */}
          <div className="hidden md:block w-[1px] h-12 bg-gray-800" />

          {/* Phone or Email CTA */}
          {business.phone ? (
            <a 
              href={`tel:${business.phone}`}
              className="flex items-center gap-4 text-[#ffdcbd] hover:text-white transition-colors duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} />
              </div>
              <span 
                className="text-lg md:text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {contact.callCtaText}: {business.phone}
              </span>
            </a>
          ) : business.email ? (
            <a 
              href={`mailto:${business.email}`}
              className="flex items-center gap-4 text-[#ffdcbd] hover:text-white transition-colors duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <span 
                className="text-lg md:text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Gửi Email
              </span>
            </a>
          ) : (
            <a 
              href={business.mapUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-[#ffdcbd] hover:text-white transition-colors duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} />
              </div>
              <span 
                className="text-lg md:text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Tìm đường đi
              </span>
            </a>
          )}

          {/* Separator 2 */}
          <div className="hidden md:block w-[1px] h-12 bg-gray-800" />

          {/* Main Book Button */}
          <button 
            onClick={onBookClick}
            className="bg-[#855316] text-white px-10 py-5 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#ffdcbd] hover:text-[#121315] active:scale-95 transition-all duration-300 shadow-sm text-center"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            {contact.bookCtaText}
          </button>
        </div>
      </div>
    </section>
  );
}
