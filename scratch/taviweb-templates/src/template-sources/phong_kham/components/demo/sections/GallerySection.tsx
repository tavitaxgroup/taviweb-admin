import { motion } from 'motion/react';
import { GalleryItem } from '../../../types/demo';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-teal-100 text-[#244d50] rounded-full text-xs font-bold uppercase tracking-wider mb-3"
          >
            KHÔNG GIAN
          </motion.div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            Cơ Sở Vật Chất Hiện Đại
          </h2>
        </div>

        {/* Horizontal Scrolling or elegant flex list */}
        <div className="flex gap-6 overflow-x-auto pb-6 px-1 no-scrollbar scroll-smooth">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-none w-[290px] md:w-[420px] group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl shadow-md border border-slate-100 relative">
                <img
                  className="h-[280px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.src}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold">MedCore Standards</span>
                </div>
              </div>
              <p className="mt-4 font-display font-extrabold text-center text-slate-800 text-base group-hover:text-[#004ac6] transition-colors">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
