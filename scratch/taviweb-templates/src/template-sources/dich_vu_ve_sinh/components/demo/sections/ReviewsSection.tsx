import { Star, Quote } from "lucide-react";
import { ReviewItem } from "../../../types/demo";

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  rating?: number;
}

export function ReviewsSection({ reviews, rating }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
            ))}
            {rating && (
              <span className="font-label text-sm font-bold text-slate-700 ml-2">
                {rating}/5.0
              </span>
            )}
          </div>
          
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Nhận Xét Từ Khách Hàng
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 max-w-xl mx-auto">
            Hơn 500+ doanh nghiệp và các hộ gia đình đã hài lòng với chất lượng dịch vụ dọn dẹp vệ sinh sạch sâu của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 md:p-8 rounded-lg border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-200"
            >
              <div className="mb-4 text-[#16a34a] opacity-40">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <p className="font-sans text-sm md:text-base text-slate-600 mb-6 italic flex-grow leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center font-display font-bold text-sm">
                  {review.avatarLetter}
                </div>
                <div>
                  <h4 className="font-label text-sm font-bold text-slate-800">
                    {review.authorName}
                  </h4>
                  {review.role && (
                    <p className="font-sans text-xs text-slate-400 mt-0.5">
                      {review.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
