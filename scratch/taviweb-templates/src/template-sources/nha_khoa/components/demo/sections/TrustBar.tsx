import { TrustInfo } from '../../../types/demo';
import { motion } from 'motion/react';

interface TrustBarProps {
  trust: TrustInfo;
}

export default function TrustBar({ trust }: TrustBarProps) {
  return (
    <section className="bg-white py-12 border-y border-gray-100 shadow-sm relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-3 text-center">
          {trust.metrics.map((metric, index) => (
            <motion.div 
              key={`metric-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center ${
                index === 1 ? 'sm:border-x sm:border-gray-100 sm:px-8' : ''
              }`}
            >
              <span className="text-4xl font-extrabold tracking-tight text-teal-700 font-sans">
                {metric.value}
              </span>
              <span className="mt-2 text-xs font-semibold tracking-wider text-gray-500 uppercase font-sans">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
