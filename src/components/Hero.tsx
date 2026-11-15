import React, { useState } from 'react';
import { ArrowRight, Layers, Image as ImageIcon } from 'lucide-react';
import { HERO_IMAGE, INITIAL_PRODUCTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../data/translations';
import { InteractiveTileBackground } from './InteractiveTileBackground';
import { InteractiveMosaicShowcase } from './InteractiveMosaicShowcase';

interface HeroProps {
  onExploreClick: () => void;
  onJournalClick: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onJournalClick, lang }) => {
  const t = TRANSLATIONS[lang];
  const [viewMode, setViewMode] = useState<'photo' | 'mosaic'>('photo');
  const featuredShowcase = INITIAL_PRODUCTS.slice(0, 5);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const currentShowcaseItem = featuredShowcase[activeSlideIdx] || {
    image: HERO_IMAGE,
    name: t.hero.workshopTag,
    categoryLabel: '',
  };

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#FAFAF8]">
      {/* Subtle Interactive Mediterranean Ceramic Background */}
      <InteractiveTileBackground lang={lang} opacityLevel="subtle" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Top Metadata Hairline Row (Unboxed, architectural style) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-2 text-[#141413]">
            <span>{t.hero.kicker}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>{t.brandSubtitle}</span>
            <span aria-hidden="true">·</span>
            <span>{t.announcement}</span>
          </div>
        </div>

        {/* 2-Column Architectural Split (Stretched equal height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Clean Unboxed Editorial Hierarchy */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/90 backdrop-blur-sm border border-stone-200 p-5 sm:p-8 lg:p-10">
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#0F4C81] tracking-wider uppercase">
                01 / {lang === 'ar' ? 'ورشة تصميم الخزف' : 'ATELIER MOBILIER CÉRAMIQUE'}
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-[2.85rem] font-semibold text-[#141413] leading-[1.12] tracking-[-0.025em] text-balance">
                {t.hero.title}
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t.hero.description}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-200 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>{t.hero.ctaShop}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
              <button
                onClick={onJournalClick}
                className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#141413] bg-white hover:bg-stone-100 border border-stone-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {t.hero.ctaJournal}
              </button>
            </div>
          </div>

          {/* Right Column: Large-Format Architectural Gallery Switcher */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            {/* Minimal Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
              <div className="text-xs font-mono text-stone-600 truncate min-w-0 flex-1">
                {viewMode === 'photo' ? (
                  <>
                    <span className="text-[#141413] font-semibold">
                      0{activeSlideIdx + 1} / 0{featuredShowcase.length}
                    </span>
                    <span className="mx-2 text-stone-300">—</span>
                    <span>{currentShowcaseItem.name}</span>
                  </>
                ) : (
                  <span>{lang === 'ar' ? 'استوديو الألوان والمربعات ثلاثي الأبعاد' : 'ATELIER INTERACTIF · CARREAUX 3D'}</span>
                )}
              </div>

              <div className="flex items-center gap-1 p-1 bg-white border border-stone-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'photo'
                      ? 'bg-[#141413] text-white'
                      : 'text-stone-600 hover:text-[#141413]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'معرض الطاولات' : 'Galerie'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mosaic')}
                  className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'mosaic'
                      ? 'bg-[#0F4C81] text-white'
                      : 'text-stone-600 hover:text-[#0F4C81]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الفسيفساء 3D' : 'Carreaux 3D'}</span>
                </button>
              </div>
            </div>

            {viewMode === 'photo' ? (
              <div className="flex-1 flex flex-col gap-3">
                <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={currentShowcaseItem.image}
                    alt={currentShowcaseItem.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scrim bar only for architectural caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 py-4 flex items-center justify-between text-white text-xs">
                    <span className="font-medium tracking-wide">{currentShowcaseItem.categoryLabel}</span>
                    <span className="font-mono text-stone-200">{t.hero.workshopTag}</span>
                  </div>
                </div>

                {/* Architectural Style Index Thumbnails */}
                <div className="grid grid-cols-5 gap-2">
                  {featuredShowcase.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`group relative aspect-[4/3] overflow-hidden border transition-all cursor-pointer bg-stone-100 ${
                        idx === activeSlideIdx
                          ? 'border-[#141413] ring-1 ring-[#141413]'
                          : 'border-stone-200 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <InteractiveMosaicShowcase lang={lang} />
            )}
          </div>
        </div>

        {/* Full-Width Architectural Specification Strip Below Hero Split */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 bg-white/85 backdrop-blur-xs p-5 sm:p-6 border">
          <div className="flex items-start justify-between gap-4 pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-e border-stone-200 sm:pe-6">
            <div>
              <span className="font-mono text-[11px] text-stone-400 block mb-1">01.</span>
              <p className="font-semibold text-[#141413] text-sm">{t.hero.badge1Title}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.hero.badge1Sub}</p>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 pb-4 sm:pb-0 border-b sm:border-b-0 sm:border-e border-stone-200 sm:pe-6">
            <div>
              <span className="font-mono text-[11px] text-stone-400 block mb-1">02.</span>
              <p className="font-semibold text-[#0F4C81] text-sm">{t.hero.badge2Title}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.hero.badge2Sub}</p>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] text-stone-400 block mb-1">03.</span>
              <p className="font-semibold text-[#141413] text-sm">{t.hero.badge3Title}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.hero.badge3Sub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
