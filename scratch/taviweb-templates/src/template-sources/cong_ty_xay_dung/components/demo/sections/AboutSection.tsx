import React from "react";
import { Award, Compass } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface AboutSectionProps {
  about: DemoPageData["about"];
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/50" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Dynamic Image with Experience Badge */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Ambient decorative background grid */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/10 -z-10 rounded" />
            
            {/* Corporate/Team photo with hover effects */}
            <img 
              className="w-full h-[500px] md:h-[600px] object-cover border border-slate-200 shadow-md grayscale hover:grayscale-0 transition-all duration-700 rounded" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk3WtqDFfFQUrOx62Ak8J-lH1Qi2Hr6JJWwYIcm9GYE9ztzmoaUgs98swlU74bYuv9iD1_VvdTilFbEi4Xr3ktwGm8zYb6bR5GcOjhEBn1aTsP70atOBsymJ6dTnLV6X2hIsId2WTaWQf3A4i5NGVNKq9bpr7O5CvUY3x66dKuRBvnRg-q6-9E-Vxg5oBlLkUWyGtWbCYhYsk1zbLXwFMda9F0cjP-lXHBHKRk089SYwnAmJufO1ErBQ" 
              alt="Đội ngũ kỹ sư và kiến trúc sư giàu kinh nghiệm"
            />
            
            {/* Dynamic experience box, absolutely positioned */}
            <div className="absolute bottom-6 -right-4 sm:-right-8 bg-white p-6 md:p-8 border border-slate-200 shadow-lg max-w-xs rounded">
              <p className="font-sans text-amber-500 text-4xl md:text-5xl font-black mb-2 leading-none">
                {about.yearsOfExperience}
              </p>
              <p className="font-sans text-xs font-bold text-slate-800 uppercase tracking-widest leading-relaxed">
                {about.experienceLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Copy/Text block */}
        <div className="order-1 lg:order-2">
          <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-widest block mb-4">
            {about.tagline}
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
            {about.title}
          </h2>
          
          <div className="space-y-6 font-sans text-base text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-800">
              {about.description1}
            </p>
            <p>
              {about.description2}
            </p>

            {/* Structured Columns: Mission & Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-slate-900">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wider">
                    Sứ mệnh
                  </h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-slate-900">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wider">
                    Giá trị cốt lõi
                  </h4>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {about.coreValues}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
