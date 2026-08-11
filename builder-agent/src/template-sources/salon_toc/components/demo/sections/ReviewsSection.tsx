import { Star } from 'lucide-react';
import { ReviewItem } from '../../../types/demo';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <span 
            className="text-xs font-bold text-[#855316] uppercase tracking-[0.2em] mb-4 block"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Đánh giá từ khách hàng
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#121315] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Sự hài lòng của khách hàng là niềm tự hào của chúng tôi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={review.id || idx}
              className="bg-[#fdf8f8] p-8 md:p-10 border border-gray-100 rounded-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-[#855316]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "fill-[#855316]" : "text-gray-200"} 
                    />
                  ))}
                </div>
                {/* Text */}
                <p 
                  className="text-sm md:text-base text-gray-600 mb-8 italic leading-relaxed font-normal"
                  style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                >
                  "{review.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                {review.avatarSrc ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm shrink-0">
                    <img 
                      src={review.avatarSrc} 
                      alt={review.authorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#ffdcbd] text-[#855316] flex items-center justify-center font-bold text-sm shrink-0">
                    {review.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <span 
                    className="text-sm font-bold text-[#121315] block"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {review.authorName}
                  </span>
                  <span 
                    className="text-xs text-gray-400 uppercase font-semibold tracking-wider"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                  >
                    {review.authorRole}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
