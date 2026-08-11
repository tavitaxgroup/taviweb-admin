import { GalleryItem } from '../../../types/demo';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  // Map index to specific mosaic grid positions
  const getGridClasses = (index: number) => {
    switch (index % 5) {
      case 0:
        return 'md:col-span-8 md:row-span-2 h-[524px] md:h-full';
      case 1:
        return 'md:col-span-4 md:row-span-1 h-[250px] md:h-full';
      case 2:
        return 'md:col-span-4 md:row-span-2 h-[524px] md:h-full';
      case 3:
        return 'md:col-span-4 md:row-span-1 h-[250px] md:h-full';
      case 4:
        return 'md:col-span-4 md:row-span-1 h-[250px] md:h-full';
      default:
        return 'md:col-span-4 md:row-span-1 h-[250px] md:h-full';
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] text-brand-secondary uppercase mb-4">
            SELECTED WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-primary">
            Dự Án Tiêu Biểu
          </h2>
        </div>

        {/* Mosaic Grid with 0px sharp corner shapes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          {gallery.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`${getGridClasses(
                idx
              )} group relative overflow-hidden bg-brand-primary cursor-pointer`}
            >
              <img
                src={item.image.src}
                alt={item.image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Premium fade overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block text-white/80 font-sans text-[10px] font-semibold tracking-widest uppercase mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-white font-serif text-xl sm:text-2xl font-medium">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block px-10 py-4 border border-brand-secondary text-brand-secondary font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-secondary hover:text-white transition-all duration-300"
          >
            Xem tất cả dự án
          </a>
        </div>

      </div>
    </section>
  );
}
