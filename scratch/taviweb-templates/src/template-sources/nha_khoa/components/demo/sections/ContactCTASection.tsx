import { ContactInfo } from '../../../types/demo';
import { motion } from 'motion/react';
import { Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

interface ContactCTASectionProps {
  contact: ContactInfo;
}

export default function ContactCTASection({ contact }: ContactCTASectionProps) {
  const cleanPhone = contact.phone ? contact.phone.replace(/\s+/g, '') : '';
  const primaryHref = contact.phone
    ? `tel:${cleanPhone}`
    : contact.primaryAction?.href || '#contact';
  const primaryLabel =
    contact.primaryAction?.label?.trim() || (contact.phone ? 'Gọi ngay' : 'Liên hệ ngay');
  const secondaryLabel = contact.secondaryAction?.label?.trim() || 'Xem bản đồ';
  const messageCircle = contact.MessageCircle?.trim();
  const shouldShowMessageCircle =
    Boolean(messageCircle) && !/^https?:\/\/facebook\.com\/?$/i.test(messageCircle || '');

  return (
    <section id="contact" className="py-12 px-6 lg:px-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-teal-800 px-8 py-16 text-white shadow-xl sm:px-16 lg:py-20"
        >
          {/* Subtle background glows */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-700/60 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-sans leading-tight">
                {contact.title}
              </h2>
              {contact.subtitle && (
                <p className="mt-4 text-base text-teal-100 font-sans max-w-lg leading-relaxed">
                  {contact.subtitle}
                </p>
              )}

              {/* Direct Info List */}
              <div className="mt-8 space-y-4">
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-teal-200" />
                    <span className="text-lg font-semibold font-sans">
                      {contact.phone}
                    </span>
                  </div>
                )}
                {contact.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-teal-200 mt-1" />
                    <span className="text-sm text-teal-50 font-sans leading-relaxed">
                      {contact.address}
                    </span>
                  </div>
                )}
                {shouldShowMessageCircle && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 shrink-0 text-teal-200" />
                    <span className="text-sm text-teal-50 font-sans">
                      MessageCircle: {messageCircle}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Action Buttons Column */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 w-full">
              <a
                href={primaryHref}
                target={contact.phone ? undefined : '_blank'}
                rel={contact.phone ? undefined : 'noopener noreferrer'}
                className="flex min-h-[84px] items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-center font-bold text-teal-800 shadow-md hover:bg-teal-50 active:scale-95 transition-all font-sans cursor-pointer w-full"
                aria-label={primaryLabel}
              >
                {contact.phone ? (
                  <Phone className="h-5 w-5 shrink-0 text-teal-700" />
                ) : (
                  <ArrowRight className="h-5 w-5 shrink-0 text-teal-700" />
                )}
                <span className="text-base font-bold leading-tight text-teal-800">
                  {primaryLabel}
                </span>
              </a>

              {contact.secondaryAction && (
                <a
                  href={contact.secondaryAction.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-transparent px-6 py-4 text-center font-bold text-white hover:bg-white/10 active:scale-95 transition-all font-sans w-full"
                >
                  <MapPin className="h-4.5 w-4.5" />
                  {secondaryLabel}
                </a>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
