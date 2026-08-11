import React from "react";
import { DemoPageData } from "../../../types/demo";

interface AboutSectionProps {
  data: DemoPageData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="py-20 bg-[#f8f9fb]" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Offset Image Graphic */}
          <div className="relative" id="about-image-container">
            {/* Background solid offset rectangle */}
            <div className="absolute -top-3 -left-3 w-full h-full bg-[#A3E635] z-0" />
            
            {/* Front image */}
            <div className="relative z-10 w-full h-[450px] border-2 border-black overflow-hidden bg-zinc-900">
              <img
                src={data.about.image.src}
                alt={data.about.image.alt}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                id="about-img"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div id="about-content">
            <h2 className="font-anton text-4xl md:text-5xl uppercase text-black leading-tight mb-6" id="about-title">
              {data.about.title.split(" ").map((word, i) => {
                if (word === "SỨC" || word === "MẠNH" || word === "STRENGTH" || word === "POWER") {
                  return (
                    <span key={i} className="bg-black text-[#A3E635] px-2 py-0.5 inline-block mr-1">
                      {word}
                    </span>
                  );
                }
                return word + " ";
              })}
            </h2>

            <p className="font-archivo text-base md:text-lg text-zinc-700 mb-5 leading-relaxed" id="about-desc-1">
              {data.about.description1}
            </p>

            <p className="font-archivo text-base text-zinc-600 mb-8 leading-relaxed" id="about-desc-2">
              {data.about.description2}
            </p>

            {/* Stats Block */}
            {data.about.stats && data.about.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6" id="about-stats-row">
                {data.about.stats.map((stat, idx) => (
                  <div key={idx} className="border-l-4 border-[#A3E635] pl-4">
                    <span className="font-anton text-3xl text-black block leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="font-archivo font-bold text-xs text-zinc-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
