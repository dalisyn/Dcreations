import React from 'react';
import { HERO_IMAGE, BLOG_STUDIO_IMAGE } from '../data/mockData';
import { Language, TRANSLATIONS } from '../data/translations';
import { ArtisanCorner } from './ArtisanCorner';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Architectural Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-stone-200">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0F4C81] mb-2">
              06 / {t.about.kicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#141413] tracking-[-0.02em] text-balance">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* 2-Column Editorial Story + Architectural Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
            <div className="space-y-5">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div>
                <span className="font-semibold text-sm text-[#141413] block">{t.about.founderTitle}</span>
                <span className="text-stone-500 mt-0.5 block">{t.about.founderSub}</span>
              </div>
              <div>
                <span className="font-semibold text-sm text-[#0F4C81] block">
                  {lang === 'ar' ? 'نعسان · بن عروس 1135' : 'Naassen · Ben Arous 1135'}
                </span>
                <span className="text-stone-500 mt-0.5 block">
                  {lang === 'ar' ? 'طريق الخليدية، شبدّة' : 'Route Khelidia, Chebedda'}
                </span>
              </div>
              <div>
                <a
                  href="tel:+21623559559"
                  dir="ltr"
                  className="font-mono font-semibold text-sm text-[#141413] hover:text-[#0F4C81] transition-colors inline-block tabular-nums"
                >
                  +216 23 559 559
                </a>
                <span className="text-stone-500 mt-0.5 block">
                  {lang === 'ar' ? 'الهاتف وواتساب الورشة' : 'Téléphone & WhatsApp'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={BLOG_STUDIO_IMAGE}
                alt={
                  lang === 'ar'
                    ? 'طاولة بمستويين من الخزف الأخضر الزمردي والأوكر'
                    : 'Table basse sculpturale 2 niveaux émeraude et ocre miel'
                }
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={HERO_IMAGE}
                alt={
                  lang === 'ar'
                    ? 'طاولة قهوة من مربعات الخزف الأخضر الزيتوني مع فتحة للكتب'
                    : 'Table basse monolithe vert olive émaillé avec niche centrale'
                }
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Artisan's Corner Bespoke Feature */}
        <ArtisanCorner lang={lang} />

        {/* Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-200 bg-[#FAFAF8]">
          <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-e border-stone-200 space-y-2.5">
            <span className="font-mono text-xs text-[#0F4C81] block">01 — ÉPOXY</span>
            <h3 className="text-base font-semibold text-[#141413]">{t.about.p1Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p1Text}
            </p>
          </div>

          <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-e border-stone-200 space-y-2.5">
            <span className="font-mono text-xs text-[#C25E3E] block">02 — STRUCTURE</span>
            <h3 className="text-base font-semibold text-[#141413]">{t.about.p2Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p2Text}
            </p>
          </div>

          <div className="p-7 space-y-2.5">
            <span className="font-mono text-xs text-emerald-700 block">03 — SUR MESURE</span>
            <h3 className="text-base font-semibold text-[#141413]">{t.about.p3Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p3Text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
