import { motion } from 'motion/react';
import { GalleryItem } from '../../../types/demo';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  // Ensure we have at least 4 items for the grid or fall back to safe indices
  const getImg = (index: number): GalleryItem => {
    return gallery[index % gallery.length];
  };

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-6 md:px-16">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl text-left">
          <span 
            className="text-xs font-bold text-[#855316] uppercase tracking-[0.2em] mb-4 block"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            Bộ sưu tập
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-[#121315] tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Những khoảnh khắc sáng tạo & tác phẩm tóc mẫu
          </h2>
        </div>
        <span 
          className="text-xs font-bold text-[#855316] uppercase tracking-widest border-b border-[#855316] pb-1 cursor-default select-none hidden sm:block"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
        >
          Tác phẩm thực tế tại Salon
        </span>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[700px]">
        {/* Large item - takes 2 columns and 2 rows */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-2 row-span-2 relative overflow-hidden group rounded-sm shadow-sm"
        >
          <img 
            src={getImg(0).imageSrc} 
            alt={getImg(0).alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <span 
              className="text-white text-sm md:text-base font-semibold"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {getImg(0).caption || getImg(0).alt}
            </span>
          </div>
        </motion.div>

        {/* Medium/Small item - 1 column, 1 row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden group rounded-sm shadow-sm"
        >
          <img 
            src={getImg(1).imageSrc} 
            alt={getImg(1).alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span 
              className="text-white text-xs md:text-sm font-semibold"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {getImg(1).caption || getImg(1).alt}
            </span>
          </div>
        </motion.div>

        {/* Medium/Small item - 1 column, 1 row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden group rounded-sm shadow-sm"
        >
          <img 
            src={getImg(2).imageSrc} 
            alt={getImg(2).alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span 
              className="text-white text-xs md:text-sm font-semibold"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {getImg(2).caption || getImg(2).alt}
            </span>
          </div>
        </motion.div>

        {/* Wide/Long item - 2 columns, 1 row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="col-span-2 relative overflow-hidden group rounded-sm shadow-sm"
        >
          <img 
            src={getImg(3).imageSrc} 
            alt={getImg(3).alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span 
              className="text-white text-xs md:text-sm font-semibold"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {getImg(3).caption || getImg(3).alt}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
