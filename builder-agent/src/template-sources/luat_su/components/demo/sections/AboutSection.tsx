import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function AboutSection({ data }: SectionProps) {
  const { about } = data;

  return (
    <section id="about" className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Dynamic Profile Image with Gold Frame Accent */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-xl shadow-2xl z-10">
            <img
              src={about.image.src}
              alt={about.image.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
          {/* Accent block representing the visual gold block in Stitch Design */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200/50 rounded-xl -z-0 blur-[1px]"></div>
        </div>

        {/* Right Side: Copy & Numerical Milestones */}
        <div className="flex flex-col justify-center">
          <h2 className="font-headline-md font-bold text-blue-950 text-3xl sm:text-4xl mb-6 leading-tight tracking-tight">
            {about.title}
          </h2>
          <div className="h-[2px] w-16 bg-amber-600 mb-8 rounded"></div>

          <p className="font-sans text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            {about.description1}
          </p>

          {about.description2 && (
            <p className="font-sans text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              {about.description2}
            </p>
          )}

          {/* Stats Metrics (Years of experience, project count) */}
          {about.stats && about.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              {about.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-headline-md font-bold text-amber-700 text-3xl sm:text-4xl mb-1.5">
                    {stat.value}
                  </span>
                  <span className="font-sans font-semibold text-xs tracking-wider uppercase text-gray-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
