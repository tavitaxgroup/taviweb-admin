import React from "react";
import { Star } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface ReviewsSectionProps {
  data: DemoPageData;
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  // Safeguard: If no reviews are loaded, hide the component cleanly
  if (!data.reviews || data.reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#f8f9fb]" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-anton text-4xl md:text-5xl uppercase mb-16 text-center text-black" id="reviews-title">
          NHẬN XÉT TỪ <span className="text-[#446900]">HỘI VIÊN</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="reviews-grid">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              style={{ borderRadius: "0px" }}
              id={`review-card-${review.id}`}
            >
              <div>
                {/* Yellow Stars */}
                <div className="flex text-yellow-500 mb-5" id={`review-stars-${review.id}`}>
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="italic text-zinc-700 font-archivo text-base leading-relaxed mb-8">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-zinc-100 pt-6" id={`review-author-${review.id}`}>
                {/* Avatar grey placeholder matching the Stitch UI wireframe mock */}
                <div className="w-12 h-12 bg-zinc-700 shrink-0 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
                <div>
                  <p className="font-archivo font-bold text-sm uppercase text-black">
                    {review.author}
                  </p>
                  <p className="font-archivo text-xs text-[#446900]">
                    {review.membershipDuration || "Hội viên"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
