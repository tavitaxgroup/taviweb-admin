import React from 'react';
import { Phone, Award, ShieldCheck } from 'lucide-react';
import { HeroData } from '../../../types/demo';

interface DemoHeroProps {
  data: HeroData;
}

export default function DemoHero({ data }: DemoHeroProps) {
  const title = data.title;
  const coloredWords = 'Đáng Tin Cậy';
  const hasColoredPart = title.includes(coloredWords);
  const primaryLabel = data.primaryAction?.label?.trim() || 'Liên hệ ngay';

  let mainTitlePart = title;
  let coloredTitlePart = '';

  if (hasColoredPart) {
    const parts = title.split(coloredWords);
    mainTitlePart = parts[0];
    coloredTitlePart = coloredWords;
  }

  return (
    <section className="relative overflow-hidden min-h-[640px] md:min-h-[720px] flex items-center bg-[#0a1422] pt-28 pb-16">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-35 grayscale-[0.3]"
          style={{ backgroundImage: `url('${data.image.src}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1422] via-[#0a1422]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 w-full grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-6 text-left">
          <h1 className="text-white font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            {hasColoredPart ? (
              <>
                {mainTitlePart}
                <span className="text-[#fd761a] block sm:inline"> {coloredTitlePart}</span>
              </>
            ) : (
              title
            )}
          </h1>

          <p className="text-[#cbd5e1] text-lg md:text-xl font-normal max-w-xl leading-relaxed">
            {data.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={data.primaryAction.href}
              className="bg-[#fd761a] hover:bg-[#fd761a]/90 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              style={{ color: '#ffffff' }}
            >
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white">{primaryLabel}</span>
            </a>

            <a
              href="#services"
              className="border border-white/60 bg-white/10 hover:border-white/85 hover:bg-white/20 font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
              style={{ color: '#ffffff' }}
            >
              <span className="text-white">Tìm hiểu dịch vụ</span>
            </a>
          </div>
        </div>

        {data.stats && (
          <div className="md:col-span-5 w-full">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fd761a] flex items-center justify-center shadow-md shadow-[#fd761a]/30">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#fd761a] font-semibold tracking-widest uppercase">
                    {data.stats.badge}
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">
                    {data.stats.title}
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                {data.stats.values.map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] transition-all"
                  >
                    <div className="text-3xl font-extrabold text-white font-sans tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-[#cbd5e1] uppercase mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#cbd5e1] justify-center bg-white/[0.04] py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#fd761a]" />
                <span>Trang thiết bị đạt chuẩn châu Âu</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
