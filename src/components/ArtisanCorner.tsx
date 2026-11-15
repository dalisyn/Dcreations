import React from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';

const FOUNDER_PORTRAIT_URL = '/assets/aistudio/image_24267815.png';

interface ArtisanCornerProps {
  lang: Language;
}

export const ArtisanCorner: React.FC<ArtisanCornerProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const ac = t.about.artisanCorner;

  return (
    <div className="mb-16 border border-stone-200 bg-[#FAFAF8]">
      {/* Architectural Top Bar */}
      <div className="px-6 sm:px-8 py-4 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <span className="uppercase tracking-wider text-[#0F4C81] font-medium">
          {ac.kicker}
        </span>
        <span className="text-stone-500">
          {ac.locationTag}
        </span>
      </div>

      {/* 2-Column Editorial Bio + Artisan Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Artisan Portrait Photograph */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-e border-stone-200 bg-stone-100 overflow-hidden">
          <div className="aspect-[3/4] lg:aspect-auto lg:h-full max-h-[500px] w-full overflow-hidden">
            <img
              src={FOUNDER_PORTRAIT_URL}
              alt={ac.imageAlt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Artisan Bio & Bespoke Manifesto */}
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <BrandLogo variant="light" size="sm" markOnly />
                <h3 className="text-xl sm:text-2xl font-semibold text-[#141413] tracking-[-0.015em]">
                  {ac.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-stone-500">
                {ac.role}
              </span>
            </div>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {ac.bio1}
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              {ac.bio2}
            </p>
          </div>

          {/* Quiet Signature Metadata Strip */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                {ac.fact1Label}
              </span>
              <span className="font-medium text-[#141413]">{ac.fact1Value}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                {ac.fact2Label}
              </span>
              <span className="font-medium text-[#141413]">{ac.fact2Value}</span>
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                {ac.fact3Label}
              </span>
              <a
                href="tel:+21623559559"
                dir="ltr"
                className="font-mono font-semibold text-[#0F4C81] hover:text-[#141413] transition-colors inline-block tabular-nums"
              >
                +216 23 559 559
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
