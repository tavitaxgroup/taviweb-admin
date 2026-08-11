import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';
import { ReviewItem } from '../../../types/demo';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-20 bg-slate-50" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-[#244d50] rounded-full text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            ĐÁNH GIÁ
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 text-center tracking-tight">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-slate-600 font-sans italic mb-8 leading-relaxed">
                {review.text}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                  <img
                    className="w-full h-full object-cover"
                    src={review.avatarSrc}
                    alt={review.avatarAlt}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-display font-extrabold text-slate-800 text-sm">{review.author}</div>
                  <div className="flex text-amber-400 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
