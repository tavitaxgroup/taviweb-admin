import { Clock, Receipt, ShieldCheck, LucideIcon } from "lucide-react";
import { TrustData } from "../../../types/demo";

interface TrustBarProps {
  trust: TrustData;
}

const iconMap: Record<string, LucideIcon> = {
  schedule: Clock,
  receipt_long: Receipt,
  verified: ShieldCheck,
};

export function TrustBar({ trust }: TrustBarProps) {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trust.badges.map((badge, idx) => {
            const IconComponent = iconMap[badge.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#16a34a]/10 text-[#16a34a] rounded-full">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-label text-base font-bold text-slate-800">
                    {badge.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-500">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
