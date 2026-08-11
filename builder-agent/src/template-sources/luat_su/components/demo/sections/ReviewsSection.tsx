import { Star, Quote } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function ReviewsSection({ data }: SectionProps) {
  const { reviews } = data;

  if (!reviews || reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline-md font-bold text-blue-950 text-3xl sm:text-4xl mb-4">
            Đánh Giá Từ Khách Hàng
          </h2>
          <div className="h-[3px] w-12 bg-amber-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative flex flex-col justify-between"
            >
              {/* Quote sign decoration */}
              <div className="absolute top-6 right-8 text-gray-100">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="font-sans text-gray-700 text-base leading-relaxed mb-6">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <h4 className="font-sans font-bold text-gray-950 text-base">
                    {review.author}
                  </h4>
                  {review.role && (
                    <p className="font-sans text-xs text-gray-500 font-medium">
                      {review.role}
                    </p>
                  )}
                </div>
                {review.date && (
                  <span className="font-sans text-xs text-gray-400">
                    {review.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
