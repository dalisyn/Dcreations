import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { X, Star, ArrowUpRight, Plus, Trash2, ArrowLeftRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: Product[];
  allProducts: Product[];
  onAddProduct: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onConfigureProduct: (product: Product) => void;
  lang: Language;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  selectedProducts,
  allProducts,
  onAddProduct,
  onRemoveProduct,
  onClearAll,
  onConfigureProduct,
  lang,
}) => {
  const [previewVariationMap, setPreviewVariationMap] = useState<Record<string, string>>({});
  const t = TRANSLATIONS[lang];
  const c = t.compare;
  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  const availableToAdd = useMemo(
    () => allProducts.filter((p) => !selectedProducts.some((s) => s.id === p.id)),
    [allProducts, selectedProducts]
  );

  const lowestPrice = useMemo(() => {
    if (selectedProducts.length < 2) return null;
    return Math.min(...selectedProducts.map((p) => p.price));
  }, [selectedProducts]);

  const highestRating = useMemo(() => {
    if (selectedProducts.length < 2) return null;
    return Math.max(...selectedProducts.map((p) => p.rating));
  }, [selectedProducts]);

  if (!isOpen) return null;

  const getProductPreviewImage = (product: Product) => {
    const selectedVarId = previewVariationMap[product.id];
    if (selectedVarId && product.colorVariations) {
      const found = product.colorVariations.find((v) => v.id === selectedVarId);
      if (found?.previewImage) return found.previewImage;
    }
    return product.image;
  };

  // Mobile layout helper: 1 column if 1 item, 2 columns if 2 items, or horizontal 2-up snap rail if 3-4 items
  const mobileColumnsClass =
    selectedProducts.length === 1
      ? 'grid grid-cols-1'
      : selectedProducts.length === 2
      ? 'grid grid-cols-2'
      : 'grid grid-flow-col auto-cols-[calc(50%-4px)] overflow-x-auto snap-x snap-mandatory';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAFAF8] w-full max-w-6xl border border-stone-300 shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Modal Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 border-b border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#0F4C81] block truncate">
                {c.modalKicker}
              </span>
              <h2 className="text-base sm:text-2xl font-semibold text-[#141413] tracking-[-0.015em]">
                {c.modalTitle}
              </h2>
              <p className="text-xs text-stone-500 hidden md:block">{c.modalSubtitle}</p>
            </div>

            {/* Mobile Close Button pinned cleanly top-end */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="sm:hidden p-2 text-stone-600 hover:text-[#141413] bg-white border border-stone-300 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {selectedProducts.length < 4 && availableToAdd.length > 0 && (
              <div className="flex-1 sm:flex-initial min-w-[180px]">
                <select
                  aria-label={c.addModelPlaceholder}
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      onAddProduct(e.target.value);
                    }
                  }}
                  className="w-full sm:w-auto sm:max-w-[230px] bg-white border border-stone-300 text-xs text-[#141413] px-3 py-2 focus:outline-none focus:border-[#141413] cursor-pointer"
                >
                  <option value="">{c.addModelPlaceholder}</option>
                  {availableToAdd.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.price} {currencyUnit})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedProducts.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-red-700 bg-white border border-stone-300 hover:border-red-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{c.clearAll}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="hidden sm:inline-flex p-2 text-stone-600 hover:text-[#141413] bg-white border border-stone-300 hover:border-[#141413] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-y-auto overflow-x-hidden md:overflow-x-auto flex-1">
          {selectedProducts.length === 0 ? (
            <div className="py-16 sm:py-20 px-6 text-center space-y-4">
              <div className="w-12 h-12 border border-stone-300 bg-white flex items-center justify-center mx-auto text-stone-400">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#141413]">{c.emptyTitle}</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                {c.emptyDesc}
              </p>
              {availableToAdd.length > 0 && (
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => onAddProduct(availableToAdd[0].id)}
                    className="px-4 py-2 text-xs font-medium text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{availableToAdd[0].name}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* MOBILE COMPARE LAYOUT (< 768px): Touch-friendly paired columns with zero pinched sticky sidebar */}
              <div className="md:hidden divide-y divide-stone-200 bg-white">
                {selectedProducts.length > 2 && (
                  <div className="px-3 py-2 bg-[#FAFAF8] text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center justify-between">
                    <span>
                      {lang === 'ar'
                        ? `${selectedProducts.length} تصاميم — اسحب أفقياً للمقارنة`
                        : `${selectedProducts.length} modèles — balayer horizontalement`}
                    </span>
                    <span className="text-[#0F4C81] font-semibold">⇄</span>
                  </div>
                )}

                {/* Product Cards Header Strip */}
                <div className={`gap-2 p-3 bg-[#FAFAF8] ${mobileColumnsClass}`}>
                  {selectedProducts.map((product) => {
                    const previewImg = getProductPreviewImage(product);
                    return (
                      <div
                        key={product.id}
                        className="snap-start bg-white border border-stone-200 p-2.5 flex flex-col justify-between space-y-2.5"
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-[4/3] bg-stone-100 border border-stone-200 overflow-hidden">
                            <img
                              src={previewImg}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => onRemoveProduct(product.id)}
                              aria-label={`${c.removeItem} ${product.name}`}
                              className="absolute top-1.5 right-1.5 p-1.5 bg-white/95 border border-stone-300 text-stone-600 hover:text-red-700 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>

                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 block truncate">
                              {product.categoryLabel}
                            </span>
                            <h3 className="text-xs font-semibold text-[#141413] leading-snug line-clamp-2 min-h-[2rem]">
                              {product.name}
                            </h3>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onConfigureProduct(product);
                          }}
                          className="w-full px-2 py-2 text-[11px] font-medium text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors cursor-pointer inline-flex items-center justify-center gap-1"
                        >
                          <span className="truncate">{c.configureBtn}</span>
                          <ArrowUpRight className="w-3 h-3 shrink-0" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Spec Blocks */}
                {[
                  {
                    label: c.priceRow,
                    renderCell: (product: Product) => {
                      const isBestPrice = lowestPrice !== null && product.price === lowestPrice;
                      return (
                        <div className="space-y-1">
                          <div className="text-sm font-bold font-mono tabular-nums text-[#141413]">
                            {product.price} {currencyUnit}
                          </div>
                          <div className="text-[11px] font-mono tabular-nums text-stone-600">
                            {c.depositLabel}{' '}
                            <span className="font-semibold text-[#0F4C81]">
                              {product.depositPrice} {currencyUnit}
                            </span>
                          </div>
                          {isBestPrice && (
                            <div className="text-[10px] font-mono uppercase text-emerald-700">
                              — {c.bestValueTag}
                            </div>
                          )}
                        </div>
                      );
                    },
                  },
                  {
                    label: `${c.ratingRow} · ${c.leadTimeRow}`,
                    renderCell: (product: Product) => {
                      const isTopRated = highestRating !== null && product.rating === highestRating;
                      return (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
                            <span className="font-mono font-semibold tabular-nums">
                              {product.rating.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-stone-500 font-mono">
                              ({product.reviewCount})
                            </span>
                          </div>
                          {isTopRated && (
                            <div className="text-[10px] font-mono uppercase text-[#0F4C81]">
                              — {c.topRatedTag}
                            </div>
                          )}
                          <div className="text-[11px] font-medium text-[#141413] pt-0.5">
                            {product.leadTime}
                          </div>
                          <div className="text-[10px] font-mono text-[#0F4C81]">
                            {product.details.slotsRemaining} {c.slotsUnit}
                          </div>
                        </div>
                      );
                    },
                  },
                  {
                    label: c.materialsRow,
                    renderCell: (product: Product) => (
                      <p className="text-[11px] text-stone-700 leading-relaxed">
                        {product.details.materials}
                      </p>
                    ),
                  },
                  {
                    label: c.dimensionsRow,
                    renderCell: (product: Product) => (
                      <p className="text-[11px] font-mono tabular-nums text-[#141413] leading-relaxed">
                        {product.details.dimensions}
                      </p>
                    ),
                  },
                  {
                    label: c.colorsRow,
                    renderCell: (product: Product) => {
                      const variations = product.colorVariations;
                      const activeVarId = previewVariationMap[product.id];
                      if (variations && variations.length > 0) {
                        return (
                          <div className="flex flex-wrap gap-1.5">
                            {variations.map((v) => {
                              const isSelected = activeVarId === v.id;
                              return (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() =>
                                    setPreviewVariationMap((prev) => ({
                                      ...prev,
                                      [product.id]: v.id,
                                    }))
                                  }
                                  className={`flex items-center gap-1 px-1.5 py-1 border text-[10px] cursor-pointer ${
                                    isSelected
                                      ? 'border-[#141413] bg-stone-100 text-[#141413] font-medium'
                                      : 'border-stone-200 bg-white text-stone-600'
                                  }`}
                                >
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                                    style={{ backgroundColor: v.hex }}
                                  />
                                  <span className="truncate max-w-[90px]">
                                    {lang === 'ar' ? v.nameAr : v.nameFr}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        );
                      }
                      if (product.colorSwatches && product.colorSwatches.length > 0) {
                        return (
                          <div className="flex flex-wrap gap-1.5">
                            {product.colorSwatches.map((sw) => (
                              <span key={sw.name} className="inline-flex items-center gap-1 text-[10px]">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                                  style={{ backgroundColor: sw.hex }}
                                />
                                <span>{sw.name}</span>
                              </span>
                            ))}
                          </div>
                        );
                      }
                      return <span className="text-stone-400 text-xs">—</span>;
                    },
                  },
                  {
                    label: c.groutRow,
                    renderCell: (product: Product) => (
                      <ul className="space-y-1">
                        {product.customizationOptions.groutColors.map((g) => (
                          <li key={g.id} className="flex items-center gap-1.5 text-[10px] text-stone-700">
                            <span
                              className="w-2 h-2 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: g.hex }}
                            />
                            <span className="leading-snug">{g.name}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    label: c.frameRow,
                    renderCell: (product: Product) => (
                      <ul className="space-y-1.5">
                        {product.customizationOptions.frameFinishes.map((f) => (
                          <li key={f.id} className="text-[10px]">
                            <div className="font-medium text-[#141413] leading-snug">{f.name}</div>
                            <div className="text-stone-500 leading-snug">{f.description}</div>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    label: `${c.careRow} · ${c.originRow}`,
                    renderCell: (product: Product) => (
                      <div className="space-y-1.5 text-[11px]">
                        <p className="text-stone-600 leading-relaxed">{product.details.burnTimeOrCare}</p>
                        <p className="font-mono text-[10px] text-stone-500">{product.details.origin}</p>
                      </div>
                    ),
                  },
                ].map((block) => (
                  <div key={block.label} className="p-3 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                      {block.label}
                    </div>
                    <div className={`gap-2 ${mobileColumnsClass}`}>
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="snap-start border border-stone-200 bg-[#FAFAF8] p-2.5 space-y-1"
                        >
                          <div className="text-[10px] font-medium text-[#0F4C81] truncate pb-1 border-b border-stone-200">
                            {product.name}
                          </div>
                          {block.renderCell(product)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* TABLET & DESKTOP COMPARE TABLE (>= 768px) */}
              <div className="hidden md:block min-w-[680px]">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-white border-b border-stone-200 align-top">
                      <th className="w-40 lg:w-52 p-4 lg:p-5 text-start font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] sticky start-0 z-20">
                        {c.specColumn}
                      </th>
                      {selectedProducts.map((product) => {
                        const previewImg = getProductPreviewImage(product);
                        return (
                          <th
                            key={product.id}
                            className="p-4 lg:p-5 text-start font-normal border-e last:border-e-0 border-stone-200 min-w-[200px] lg:min-w-[220px] align-top"
                          >
                            <div className="space-y-3">
                              <div className="relative aspect-[4/3] bg-stone-100 border border-stone-200 overflow-hidden">
                                <img
                                  src={previewImg}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <button
                                  type="button"
                                  onClick={() => onRemoveProduct(product.id)}
                                  aria-label={`${c.removeItem} ${product.name}`}
                                  title={c.removeItem}
                                  className="absolute top-2 right-2 p-1.5 bg-white/95 border border-stone-300 text-stone-600 hover:text-red-700 hover:border-red-400 transition-colors cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="space-y-1">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 block">
                                  {product.categoryLabel}
                                </span>
                                <h3 className="text-sm font-semibold text-[#141413] leading-snug line-clamp-2 min-h-[2.5rem]">
                                  {product.name}
                                </h3>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onConfigureProduct(product);
                                }}
                                className="w-full px-3 py-2 text-xs font-medium text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                              >
                                <span>{c.configureBtn}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stone-200 bg-white">
                    {/* Price & Deposit */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.priceRow}
                      </td>
                      {selectedProducts.map((product) => {
                        const isBestPrice = lowestPrice !== null && product.price === lowestPrice;
                        return (
                          <td
                            key={product.id}
                            className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top"
                          >
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-base font-bold font-mono tabular-nums text-[#141413]">
                                {product.price} {currencyUnit}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs font-mono tabular-nums text-stone-400 line-through">
                                  {product.originalPrice} {currencyUnit}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] font-mono tabular-nums text-stone-600 mt-1">
                              {c.depositLabel}{' '}
                              <span className="font-semibold text-[#0F4C81]">
                                {product.depositPrice} {currencyUnit}
                              </span>
                            </div>
                            {isBestPrice && (
                              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 mt-1.5">
                                — {c.bestValueTag}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Rating & Reviews */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.ratingRow}
                      </td>
                      {selectedProducts.map((product) => {
                        const isTopRated = highestRating !== null && product.rating === highestRating;
                        return (
                          <td
                            key={product.id}
                            className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top"
                          >
                            <div className="flex items-center gap-1.5">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                              <span className="font-mono font-semibold tabular-nums text-[#141413]">
                                {product.rating.toFixed(1)} / 5.0
                              </span>
                              <span className="text-stone-500 font-mono tabular-nums">
                                ({product.reviewCount} {c.reviewsUnit})
                              </span>
                            </div>
                            {isTopRated && (
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#0F4C81] mt-1">
                                — {c.topRatedTag}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Lead Time & Slots */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.leadTimeRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top space-y-1"
                        >
                          <div className="font-medium text-[#141413]">{product.leadTime}</div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            {product.productionBatch}
                          </div>
                          <div className="text-[11px] font-mono tabular-nums text-[#0F4C81]">
                            {product.details.slotsRemaining} {c.slotsUnit}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Materials */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.materialsRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top text-stone-700 leading-relaxed"
                        >
                          {product.details.materials}
                        </td>
                      ))}
                    </tr>

                    {/* Dimensions */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.dimensionsRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top font-mono text-[11px] tabular-nums text-[#141413] leading-relaxed"
                        >
                          {product.details.dimensions}
                        </td>
                      ))}
                    </tr>

                    {/* Interactive Color Variations & Swatches */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.colorsRow}
                      </td>
                      {selectedProducts.map((product) => {
                        const variations = product.colorVariations;
                        const activeVarId = previewVariationMap[product.id];

                        return (
                          <td
                            key={product.id}
                            className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top"
                          >
                            {variations && variations.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {variations.map((v) => {
                                  const isSelected = activeVarId === v.id;
                                  return (
                                    <button
                                      key={v.id}
                                      type="button"
                                      onClick={() =>
                                        setPreviewVariationMap((prev) => ({
                                          ...prev,
                                          [product.id]: v.id,
                                        }))
                                      }
                                      title={lang === 'ar' ? v.nameAr : v.nameFr}
                                      className={`flex items-center gap-1.5 px-2 py-1 border text-[11px] transition-colors cursor-pointer ${
                                        isSelected
                                          ? 'border-[#141413] bg-stone-100 text-[#141413] font-medium'
                                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                                      }`}
                                    >
                                      <span
                                        className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                                        style={{ backgroundColor: v.hex }}
                                      />
                                      <span className="truncate max-w-[110px]">
                                        {lang === 'ar' ? v.nameAr : v.nameFr}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            ) : product.colorSwatches && product.colorSwatches.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {product.colorSwatches.map((sw) => (
                                  <span
                                    key={sw.name}
                                    className="inline-flex items-center gap-1.5 text-[11px] text-stone-700"
                                  >
                                    <span
                                      className="w-3 h-3 rounded-full border border-stone-300 shrink-0"
                                      style={{ backgroundColor: sw.hex }}
                                    />
                                    <span>{sw.name}</span>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-stone-400">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Grout / Teinte Customization */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.groutRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top"
                        >
                          <ul className="space-y-1.5">
                            {product.customizationOptions.groutColors.map((g) => (
                              <li key={g.id} className="flex items-center gap-2 text-[11px] text-stone-700">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                                  style={{ backgroundColor: g.hex }}
                                />
                                <span>{g.name}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Frame / Base / Mounting Customization */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.frameRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top"
                        >
                          <ul className="space-y-2">
                            {product.customizationOptions.frameFinishes.map((f) => (
                              <li key={f.id} className="text-[11px]">
                                <div className="font-medium text-[#141413]">{f.name}</div>
                                <div className="text-stone-500 text-[10px] leading-snug">
                                  {f.description}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Care & Resistance */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.careRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top text-stone-600 leading-relaxed"
                        >
                          {product.details.burnTimeOrCare}
                        </td>
                      ))}
                    </tr>

                    {/* Origin */}
                    <tr>
                      <td className="p-4 lg:px-5 font-mono text-[11px] uppercase tracking-wider text-stone-500 border-e border-stone-200 bg-[#FAFAF8] align-top sticky start-0 z-10">
                        {c.originRow}
                      </td>
                      {selectedProducts.map((product) => (
                        <td
                          key={product.id}
                          className="p-4 lg:px-5 border-e last:border-e-0 border-stone-200 align-top text-[11px] font-mono text-stone-600"
                        >
                          {product.details.origin}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
