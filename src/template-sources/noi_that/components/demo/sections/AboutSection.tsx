import { AboutData } from '../../../types/demo';

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 sm:py-32 md:py-48 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-24">
          
          {/* Left Column - Copy & Stats */}
          <div className="lg:col-span-5 reveal-on-scroll">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.15em] text-brand-secondary uppercase mb-6">
              {data.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-primary leading-[1.2] tracking-tight mb-8">
              {data.title}
            </h2>
            <p className="font-sans text-base sm:text-lg text-brand-primary/80 leading-relaxed mb-10">
              {data.description}
            </p>
            
            {/* Elegant thin editorial line */}
            <div className="editorial-line mb-10"></div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {data.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="font-serif text-3xl sm:text-4xl font-semibold text-brand-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-sans text-[10px] font-semibold tracking-wider text-brand-secondary uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Premium image frame */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] relative z-10 overflow-hidden">
              <img
                src={data.image.src}
                alt={data.image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Creative background color blocking using standard warm taupe overlay underlaying */}
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square bg-brand-bg -z-10"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
