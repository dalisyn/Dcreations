import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, SlidersHorizontal, Star, ArrowUpRight, Heart, ArrowLeftRight, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewProductReviews: (product: Product) => void;
  lang: Language;
  wishlistProductIds: string[];
  onToggleWishlist: (productId: string) => void;
  compareProductIds: string[];
  onToggleCompare: (productId: string) => void;
  onOpenCompare: () => void;
}

type CategoryFilter = 'all' | 'coffee' | 'dining' | 'cube' | 'bistro' | 'organic' | 'mirrors' | 'bespoke' | 'wishlist';
type ColorFilter = 'all' | 'green' | 'blue' | 'warm' | 'burgundy' | 'neutral';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onViewProductReviews,
  lang,
  wishlistProductIds,
  onToggleWishlist,
  compareProductIds,
  onToggleCompare,
  onOpenCompare,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeColor, setActiveColor] = useState<ColorFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const t = TRANSLATIONS[lang];

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: t.catalog.categories.all },
    { id: 'coffee', label: t.catalog.categories.coffee },
    { id: 'dining', label: t.catalog.categories.dining },
    { id: 'cube', label: t.catalog.categories.cube },
    { id: 'bistro', label: t.catalog.categories.bistro },
    { id: 'organic', label: t.catalog.categories.organic },
    { id: 'mirrors', label: t.catalog.categories.mirrors },
    { id: 'bespoke', label: t.catalog.categories.bespoke },
    {
      id: 'wishlist',
      label: `${t.wishlist.filterLabel} (${wishlistProductIds.length})`,
    },
  ];

  const colorFilters: { id: ColorFilter; label: string; dotHex?: string }[] = [
    { id: 'all', label: t.catalog.colorFilterAll },
    { id: 'green', label: t.catalog.colorFilterGreen, dotHex: '#146C53' },
    { id: 'blue', label: t.catalog.colorFilterBlue, dotHex: '#18428C' },
    { id: 'warm', label: t.catalog.colorFilterWarm, dotHex: '#D99B16' },
    { id: 'burgundy', label: t.catalog.colorFilterBurgundy, dotHex: '#68212C' },
    { id: 'neutral', label: t.catalog.colorFilterNeutral, dotHex: '#E8E3D9' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'all'
            ? true
            : activeCategory === 'wishlist'
            ? wishlistProductIds.includes(item.id)
            : item.category === activeCategory;
        const matchesColor =
          activeColor === 'all'
            ? true
            : activeColor === 'warm'
            ? item.colorFamily === 'terracotta' || item.colorFamily === 'yellow'
            : item.colorFamily === activeColor;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesColor && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, activeColor, searchQuery, sortBy, wishlistProductIds]);

  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  return (
    <section id="shop-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Architectural Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-200">
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-[#0F4C81] mb-2">
            02 / {t.catalog.kicker}
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#141413] tracking-[-0.02em] text-balance">
            {t.catalog.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            {t.catalog.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {compareProductIds.length > 0 && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#141413] px-3.5 py-2 transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="font-mono tabular-nums">
                {t.compare.compareNow} ({compareProductIds.length}/4)
              </span>
            </button>
          )}
          <div className="text-xs font-mono tabular-nums text-stone-600 border border-stone-200 bg-white px-3.5 py-2 shrink-0">
            {String(filteredProducts.length).padStart(2, '0')} — {t.catalog.counterText}
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Styles + Search + Color Families */}
      <div className="space-y-4 mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-stone-200">
          {/* Style Tabs (Horizontal swipe on mobile, clean wrap on tablet/desktop) */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  activeCategory === cat.id
                    ? 'bg-[#141413] text-white border-[#141413]'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-[#141413]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 focus:outline-none focus:border-[#141413] text-[#141413] placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Color Filter Bar & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-xs">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {colorFilters.map((cf) => (
              <button
                key={cf.id}
                type="button"
                onClick={() => setActiveColor(cf.id)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  activeColor === cf.id
                    ? 'bg-[#141413] text-white border-[#141413]'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {cf.dotHex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: cf.dotHex }}
                  />
                )}
                <span>{cf.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-stone-600 shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.catalog.sortBy}</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-stone-300 text-[#141413] text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#141413] cursor-pointer"
            >
              <option value="featured">{t.catalog.sortFeatured}</option>
              <option value="price-asc">{t.catalog.sortPriceAsc}</option>
              <option value="price-desc">{t.catalog.sortPriceDesc}</option>
              <option value="rating">{t.catalog.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Architectural Project Exhibition Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white border border-stone-200 p-8 space-y-4">
            <Heart className="w-6 h-6 text-stone-300 mx-auto" />
            <h3 className="text-lg font-semibold text-[#141413]">
              {activeCategory === 'wishlist'
                ? t.wishlist.emptyTitle
                : lang === 'ar'
                ? 'لا توجد نتائج'
                : 'Aucune création trouvée'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {activeCategory === 'wishlist'
                ? t.wishlist.emptyDesc
                : lang === 'ar'
                ? 'يرجى تجربة كلمات بحث أخرى أو تغيير الصنف.'
                : 'Essayez de modifier votre recherche ou vos filtres de couleur.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveColor('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#141413] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#0F4C81] transition-colors cursor-pointer"
            >
              {t.wishlist.browseCatalog}
            </button>
          </div>
        ) : (
          filteredProducts.map((product, index) => {
            const isWishlisted = wishlistProductIds.includes(product.id);
            const isCompared = compareProductIds.includes(product.id);
            const itemNumber = String(index + 1).padStart(2, '0');

            return (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className={`group flex flex-col bg-white border overflow-hidden transition-colors duration-200 cursor-pointer ${
                  isCompared ? 'border-[#0F4C81] ring-1 ring-[#0F4C81]/30' : 'border-stone-200 hover:border-[#141413]'
                }`}
              >
                {/* Unobstructed Large-Format Photography */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Architectural Compare Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(product.id);
                    }}
                    aria-pressed={isCompared}
                    aria-label={`${isCompared ? t.compare.buttonAdded : t.compare.buttonAdd} — ${product.name}`}
                    className={`absolute top-3 left-3 z-10 px-2.5 py-1.5 backdrop-blur-xs border transition-colors cursor-pointer inline-flex items-center gap-1.5 text-[11px] font-medium ${
                      isCompared
                        ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                        : 'bg-white/90 text-stone-700 border-stone-200 hover:border-[#141413] hover:text-[#141413]'
                    }`}
                  >
                    {isCompared ? (
                      <Check className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{isCompared ? t.compare.buttonAdded : t.compare.buttonAdd}</span>
                  </button>

                  {/* Minimal Wishlist Toggle Button */}
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
                    className={`absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-xs border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-rose-400 text-rose-600'
                        : 'border-stone-200 text-stone-600 hover:text-rose-600 hover:border-stone-400'
                    }`}
                    title={
                      isWishlisted
                        ? lang === 'ar'
                          ? 'في المفضلة'
                          : 'Coup de cœur enregistré'
                        : lang === 'ar'
                        ? 'إضافة إلى المفضلة'
                        : 'Ajouter aux coups de cœur'
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Clean Architectural Dossier Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Index & Metadata */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[#141413] font-semibold">N° {itemNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span className="uppercase">{product.categoryLabel}</span>
                      </div>
                      <span className="shrink-0 text-[#0F4C81]">{product.leadTime}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#141413] group-hover:text-[#0F4C81] transition-colors tracking-[-0.01em] leading-snug line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {product.colorSwatches && product.colorSwatches.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                        <div className="flex items-center gap-1.5">
                          {product.colorSwatches.map((sw) => (
                            <span
                              key={sw.name}
                              title={sw.name}
                              className="w-3 h-3 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: sw.hex }}
                            />
                          ))}
                        </div>
                        <span className="truncate font-mono text-[11px]">
                          {product.colorSwatches.map((s) => s.name).join(' · ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Footer */}
                  <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-bold text-[#141413] font-mono tabular-nums">
                        {product.price} {currencyUnit}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono tabular-nums">
                        {t.catalog.depositLabel} {product.depositPrice} {currencyUnit}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProductReviews(product);
                        }}
                        className="flex items-center gap-1 text-xs text-stone-600 hover:text-[#141413] cursor-pointer"
                        title="Voir les avis"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-mono tabular-nums font-medium">{product.rating.toFixed(1)}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="px-3.5 py-2 text-xs font-medium text-white bg-[#141413] group-hover:bg-[#0F4C81] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>{t.catalog.quickConfigure}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
