import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function GallerySection({ data }: SectionProps) {
  const { gallery } = data;

  if (!gallery || gallery.length === 0) return null;

  // We have up to 5 images styled in a custom mosaic layout.
  // If there are fewer than 5 images, we display what we have.
  // Let's map each index to specific span configurations.
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline-md font-bold text-blue-950 text-3xl sm:text-4xl mb-4">
            Không Gian Làm Việc
          </h2>
          <p className="font-sans text-gray-500 text-sm md:text-base">
            Sự chuyên nghiệp thể hiện trong từng chi tiết nhỏ nhất
          </p>
          <div className="h-[3px] w-12 bg-amber-600 mx-auto mt-4 rounded"></div>
        </div>

        {/* Asymmetrical Grid matching Stitch Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, index) => {
            // Apply different grid span to simulate the original mosaic layout:
            // Item index 1 (2nd image) takes 2 columns and 2 rows on medium screens
            let gridClass = "aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300";
            if (index === 1) {
              gridClass = "aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2 md:row-span-2";
            }

            return (
              <div key={index} className={gridClass}>
                <img
                  src={item.src}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
