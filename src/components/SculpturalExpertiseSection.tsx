import React from 'react';
import { Product } from '../types';
import { ArrowUpRight, Heart, Star, ArrowLeftRight, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { ORGANIC_HERO_IMAGE } from '../data/mockData';

interface SculpturalExpertiseSectionProps {
  organicProducts: Product[];
  onSelectProduct: (product: Product) => void;
  wishlistProductIds: string[];
  onToggleWishlist: (productId: string) => void;
  compareProductIds: string[];
  onToggleCompare: (productId: string) => void;
  lang: Language;
}

const MINERAL_SWATCHES = [
  { fr: 'Albâtre Mat', ar: 'أبيض مرمر', hex: '#F4F1EA' },
  { fr: 'Travertin Sablé', ar: 'ترافرتين رملي', hex: '#D8C3A5' },
  { fr: 'Terracotta Argile', ar: 'تيراكوتا طيني', hex: '#C26B4A' },
  { fr: 'Sauge Minérale', ar: 'أخضر مريمي', hex: '#6E7D65' },
  { fr: 'Basalte Pierre', ar: 'رمادي بازلتي', hex: '#6B6863' },
];

export const SculpturalExpertiseSection: React.FC<SculpturalExpertiseSectionProps> = ({
  organicProducts,
  onSelectProduct,
  wishlistProductIds,
  onToggleWishlist,
  compareProductIds,
  onToggleCompare,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const ex = t.expertise;
  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  const heroOrganicModel = organicProducts[0];

  const pillars = [
    { tag: ex.pillar1Tag, title: ex.pillar1Title, text: ex.pillar1Text, accent: 'text-[#0F4C81]' },
    { tag: ex.pillar2Tag, title: ex.pillar2Title, text: ex.pillar2Text, accent: 'text-[#C25E3E]' },
    { tag: ex.pillar3Tag, title: ex.pillar3Title, text: ex.pillar3Text, accent: 'text-emerald-700' },
    { tag: ex.pillar4Tag, title: ex.pillar4Title, text: ex.pillar4Text, accent: 'text-[#141413]' },
  ];

  return (
    <section
      id="expertise-section"
      className="py-16 sm:py-24 bg-white border-t border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Architectural Dossier Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-stone-200">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#0F4C81] mb-2">
              03 / {ex.kicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#141413] tracking-[-0.02em] text-balance">
              {ex.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
              {ex.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono tabular-nums text-stone-600 border border-stone-200 bg-[#FAFAF8] px-3.5 py-2 shrink-0">
            {String(organicProducts.length).padStart(2, '0')} — {ex.modelsCountLabel}
          </div>
        </div>

        {/* 2-Column Technical Expertise Manifesto + Signature Sculpture Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-14">
          {/* Left: 4-Pillar Mineral Protocol & Palette */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
                {ex.specsTitle}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border border-stone-200 bg-[#FAFAF8]">
                {pillars.map((p, idx) => (
                  <div
                    key={p.tag}
                    className={`p-5 sm:p-6 space-y-2 ${
                      idx < 2 ? 'border-b border-stone-200' : idx === 2 ? 'border-b sm:border-b-0 border-stone-200' : ''
                    } ${idx % 2 === 0 ? 'sm:border-e sm:border-stone-200' : ''}`}
                  >
                    <span className={`font-mono text-xs block ${p.accent}`}>{p.tag}</span>
                    <h3 className="text-sm font-semibold text-[#141413]">{p.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mineral Teinte Swatches Strip */}
            <div className="p-5 border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500 block">
                  {lang === 'ar'
                    ? 'الألوان المعدنية المتوفرة (ميكرو سمنت وتادلاكت)'
                    : 'NUANCIER MINÉRAL · MICRO-CIMENT & TADELAKT'}
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  {MINERAL_SWATCHES.map((sw) => (
                    <div key={sw.hex} className="flex items-center gap-2 text-xs text-stone-700">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <span>{lang === 'ar' ? sw.ar : sw.fr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {heroOrganicModel && (
                <button
                  type="button"
                  onClick={() => onSelectProduct(heroOrganicModel)}
                  className="px-4 py-2.5 text-xs font-medium text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{ex.bespokeCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Centerpiece Organic Sculpture Photograph */}
          <div className="lg:col-span-5 flex flex-col border border-stone-200 bg-[#FAFAF8]">
            <div
              onClick={() => heroOrganicModel && onSelectProduct(heroOrganicModel)}
              className="relative flex-1 min-h-[320px] overflow-hidden bg-stone-100 cursor-pointer group"
            >
              <img
                src={ORGANIC_HERO_IMAGE}
                alt={
                  lang === 'ar'
                    ? 'طاولة قهوة عضوية منحوتة بالميكرو سمنت الأبيض المرمر'
                    : 'Table basse organique sculptée en micro-ciment albâtre minéral sans joint'
                }
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 flex items-end justify-between text-white">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-stone-300 block">
                    {lang === 'ar' ? 'إصدار الورشة · ميكرو سمنت' : 'ÉDITION ATELIER · SANS JOINTS'}
                  </span>
                  <span className="text-sm font-semibold mt-0.5 block">
                    {heroOrganicModel?.name || 'Table Basse Organique Galet'}
                  </span>
                </div>
                {heroOrganicModel && (
                  <span className="font-mono text-sm font-bold tabular-nums shrink-0">
                    {heroOrganicModel.price} {currencyUnit}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Exhibition Sub-Grid: Sculptural Organic Models */}
        <div>
          <div className="flex items-center justify-between gap-4 pb-4 mb-8 border-b border-stone-200">
            <h3 className="text-base sm:text-lg font-semibold text-[#141413]">
              {ex.modelsHeading}
            </h3>
            <span className="font-mono text-xs text-stone-500">
              {lang === 'ar' ? 'تخصيص اللون والأبعاد على الطلب' : 'Teintes & gabarits personnalisables'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {organicProducts.map((product, index) => {
              const isWishlisted = wishlistProductIds.includes(product.id);
              const isCompared = compareProductIds.includes(product.id);
              const itemNumber = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className={`group flex flex-col bg-[#FAFAF8] border overflow-hidden transition-colors duration-200 cursor-pointer ${
                    isCompared ? 'border-[#0F4C81] ring-1 ring-[#0F4C81]/30' : 'border-stone-200 hover:border-[#141413]'
                  }`}
                >
                  {/* 4:3 Photography */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(product.id);
                      }}
                      aria-pressed={isCompared}
                      aria-label={`${isCompared ? t.compare.buttonAdded : t.compare.buttonAdd} — ${product.name}`}
                      className={`absolute top-2.5 left-2.5 z-10 px-2 py-1 backdrop-blur-xs border transition-colors cursor-pointer inline-flex items-center gap-1 text-[10px] font-medium ${
                        isCompared
                          ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                          : 'bg-white/90 text-stone-700 border-stone-200 hover:border-[#141413] hover:text-[#141413]'
                      }`}
                    >
                      {isCompared ? (
                        <Check className="w-3 h-3 shrink-0" />
                      ) : (
                        <ArrowLeftRight className="w-3 h-3 shrink-0" />
                      )}
                      <span>{isCompared ? t.compare.buttonAdded : t.compare.buttonAdd}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      aria-label={
                        isWishlisted
                          ? lang === 'ar'
                            ? `حذف ${product.name} من المفضلة`
                            : `Retirer ${product.name} des coups de cœur`
                          : lang === 'ar'
                          ? `إضافة ${product.name} إلى المفضلة`
                          : `Ajouter ${product.name} aux coups de cœur`
                      }
                      className={`absolute top-2.5 right-2.5 z-10 p-1.5 bg-white/90 backdrop-blur-xs border transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'border-rose-400 text-rose-600'
                          : 'border-stone-200 text-stone-600 hover:text-rose-600 hover:border-stone-400'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
                        <span className="text-[#141413] font-semibold">ORG — {itemNumber}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-[#141413] group-hover:text-[#0F4C81] transition-colors leading-snug line-clamp-2">
                        {product.name}
                      </h4>

                      <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {product.colorSwatches && product.colorSwatches.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-stone-100">
                          {product.colorSwatches.map((sw) => (
                            <span
                              key={sw.name}
                              title={sw.name}
                              className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: sw.hex }}
                            />
                          ))}
                          <span className="font-mono text-[10px] text-stone-500 truncate">
                            {product.colorSwatches.map((s) => s.name).join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-stone-200 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-bold text-[#141413] font-mono tabular-nums">
                          {product.price} {currencyUnit}
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono tabular-nums">
                          {t.catalog.depositLabel} {product.depositPrice} {currencyUnit}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="px-3 py-1.5 text-[11px] font-medium text-white bg-[#141413] group-hover:bg-[#0F4C81] transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>{lang === 'ar' ? 'تخصيص' : 'Configurer'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
