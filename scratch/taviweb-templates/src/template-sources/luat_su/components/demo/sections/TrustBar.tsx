import { Lock, ShieldCheck, CalendarRange } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function TrustBar({ data }: SectionProps) {
  const { trust } = data;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield_lock":
        return <Lock className="w-8 h-8 text-amber-500" />;
      case "verified_user":
        return <ShieldCheck className="w-8 h-8 text-amber-500" />;
      case "event_available":
        return <CalendarRange className="w-8 h-8 text-amber-500" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <section className="bg-blue-950 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trust.items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 md:p-2 ${
                index === 1 ? "md:border-x md:border-white/10 md:px-8" : ""
              } ${index === 2 ? "md:pl-8" : ""}`}
            >
              <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10 shrink-0">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg md:text-xl text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-gray-300 opacity-90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
