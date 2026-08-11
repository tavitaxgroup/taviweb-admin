import { GalleryItem } from '../../../types/demo';
import { motion } from 'motion/react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-sans">
              Không Gian &amp; Thiết Bị
            </h2>
            <p className="mt-3 text-base text-gray-500 font-sans max-w-xl">
              Môi trường điều trị được đầu tư khang trang, vô trùng tuyệt đối theo chuẩn quốc tế, mang lại trải nghiệm thư giãn và tin cậy nhất.
            </p>
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id || `gallery-${index}`}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-80 overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100"
            >
              <img
                src={item.image.src}
                alt={item.image.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Image Description Overlay on Hover */}
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-900/80 via-teal-900/40 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm font-semibold tracking-wide font-sans">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
