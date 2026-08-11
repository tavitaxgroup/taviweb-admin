import { Quote } from 'lucide-react';
import { ReviewItem } from '../../../types/demo';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 bg-brand-bg border-t border-brand-secondary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <span className="inline-block font-sans text-xs font-semibold tracking-[0.3em] text-brand-secondary uppercase mb-12">
          Nhận xét từ khách hàng
        </span>

        {/* Display testimonials with supreme elegance */}
        <div className="max-w-4xl mx-auto relative px-6 sm:px-12">
          {/* Subtle quotation marks */}
          <div className="text-brand-secondary/20 flex justify-center mb-8">
            <Quote size={54} strokeWidth={1} className="transform rotate-180 opacity-60" />
          </div>

          <div className="space-y-12">
            {reviews.map((review, idx) => (
              <div key={idx} className="animate-[fadeIn_1s_ease]">
                <p className="font-serif text-2xl sm:text-3xl md:text-headline-md italic text-brand-primary leading-relaxed max-w-3xl mx-auto mb-8">
                  "{review.quote}"
                </p>
                <div className="font-sans text-xs sm:text-sm font-semibold tracking-widest text-brand-primary uppercase">
                  {review.author} — {review.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
