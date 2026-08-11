import * as Icons from 'lucide-react';
import { TrustData } from '../../../types/demo';

interface TrustBarProps {
  data: TrustData;
}

export default function TrustBar({ data }: TrustBarProps) {
  return (
    <section className="py-20 md:py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {data.items.map((item, idx) => {
            // Dynamically resolve the icon from lucide-react
            const IconComponent = (Icons as any)[item.icon] || Icons.Compass;

            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center reveal-on-scroll"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="text-brand-secondary mb-6 hover:scale-110 transition-transform duration-300">
                  <IconComponent size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-brand-primary mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-brand-primary/70 max-w-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
