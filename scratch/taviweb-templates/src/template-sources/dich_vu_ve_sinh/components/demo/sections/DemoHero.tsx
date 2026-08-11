import { Phone, ArrowRight, Star } from "lucide-react";
import { HeroData } from "../../../types/demo";

interface DemoHeroProps {
  hero: HeroData;
  rating?: number;
  reviewCount?: number;
}

export function DemoHero({ hero, rating, reviewCount }: DemoHeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column info */}
        <div className="z-10 text-left order-2 md:order-1">
          {hero.tagline && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#16a34a]/10 text-[#16a34a] font-label text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              <Star className="w-3 h-3 fill-current" />
              {hero.tagline}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
            {hero.title}
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={hero.primaryAction.href}
              id="hero-primary-cta"
              className="font-label font-semibold bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {hero.primaryAction.label}
            </a>

            {hero.secondaryAction && (
              <a
                href={hero.secondaryAction.href}
                id="hero-secondary-cta"
                className="font-label font-semibold border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-md hover:bg-slate-50 transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
              >
                {hero.secondaryAction.label}
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </a>
            )}
          </div>

          {rating !== undefined && reviewCount !== undefined && (
            <div className="mt-8 flex items-center gap-2.5 text-sm text-slate-500">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-slate-700">{rating}/5.0</span>
              <span className="text-slate-300">|</span>
              <span>Được tin tưởng bởi {reviewCount}+ doanh nghiệp</span>
            </div>
          )}
        </div>

        {/* Right column with professional image */}
        <div className="relative order-1 md:order-2">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl border-4 border-white aspect-[4/3] md:aspect-auto">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Design Accent shapes */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#16a34a] rounded-full -z-10 opacity-5 blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#0284c7] rounded-full -z-10 opacity-10 blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}
