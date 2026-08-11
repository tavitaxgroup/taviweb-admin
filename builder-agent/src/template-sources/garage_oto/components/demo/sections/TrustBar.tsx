import React from 'react';
import { AlertTriangle, Gauge, HelpCircle, PhoneCall, ShieldCheck, HelpCircle as HelpIcon } from 'lucide-react';
import { TrustData } from '../../../types/demo';

interface TrustBarProps {
  data: TrustData;
}

// Maps icon name from data to a responsive Lucide icon
function getTrustIcon(iconName: string) {
  switch (iconName) {
    case 'report_problem':
      return <AlertTriangle className="w-10 h-10 text-[#fd761a]" />;
    case 'speed':
      return <Gauge className="w-10 h-10 text-[#fd761a]" />;
    case 'contact_support':
      return <HelpCircle className="w-10 h-10 text-[#fd761a]" />;
    default:
      return <ShieldCheck className="w-10 h-10 text-[#fd761a]" />;
  }
}

export default function TrustBar({ data }: TrustBarProps) {
  return (
    <section className="bg-[#f0edee] py-8 border-b border-[#c5c6cc]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-5 bg-white border border-[#c5c6cc]/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#fd761a]/30"
            >
              <div className="flex-shrink-0 p-2 bg-[#fd761a]/5 rounded-lg">
                {getTrustIcon(badge.icon)}
              </div>
              <div>
                <h3 className="font-sans font-bold text-[#0a1422] text-base">
                  {badge.title}
                </h3>
                <p className="text-sm text-[#44474c] mt-0.5 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
