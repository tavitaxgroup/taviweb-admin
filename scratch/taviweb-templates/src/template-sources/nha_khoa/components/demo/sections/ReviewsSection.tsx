import { ReviewItem } from '../../../types/demo';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-sans">
            Chia Sẻ Từ Khách Hàng
          </h2>
          <p className="mt-4 text-base text-gray-550 font-sans">
            Hàng ngàn nụ cười đã được chăm sóc và kiến tạo thành công. Hãy lắng nghe đánh giá chân thực từ họ.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id || `review-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm border border-gray-150 relative"
            >
              <div>
                {/* Star rating indicators */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={`star-${index}-${i}`}
                      className={`h-4.5 w-4.5 ${
                        i < review.rating
                          ? 'text-teal-650 fill-teal-600'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-sm leading-relaxed text-gray-700 italic font-sans">
                  "{review.text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                {/* Fallback initials/avatar circle with soft colors based on index */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold font-mono ${
                  index % 3 === 0 
                    ? 'bg-teal-100 text-teal-800' 
                    : index % 3 === 1 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-cyan-100 text-cyan-800'
                }`}>
                  {review.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 font-sans">
                    {review.author}
                  </p>
                  {review.serviceUsed && (
                    <p className="text-xs text-gray-500 font-sans mt-0.5">
                      Đã sử dụng: {review.serviceUsed}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
