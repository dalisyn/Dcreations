import React, { useState, useEffect } from 'react';
import { Product, Review, PreOrderCustomization } from '../types';
import { X, Star, ShoppingBag, Check, ShieldCheck, Clock, Hammer, Calendar, PenSquare, Heart, ArrowLeftRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization: PreOrderCustomization) => void;
  onOpenWriteReview: (product: Product) => void;
  lang: Language;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  reviews,
  onClose,
  onAddToCart,
  onOpenWriteReview,
  lang,
  isWishlisted,
  onToggleWishlist,
  isCompared = false,
  onToggleCompare,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedGrout, setSelectedGrout] = useState(
    product?.customizationOptions?.groutColors?.[0]?.name || 'Blanc Craie Épuré / أبيض ناصع'
  );
  const [selectedFrame, setSelectedFrame] = useState(
    product?.customizationOptions?.frameFinishes?.[0]?.name || 'Coupe Onglet 45° + Patins Feutre / قص 45° + وسائد حماية'
  );
  const [paymentType, setPaymentType] = useState<'full' | 'deposit'>('deposit');
  const [customNotes, setCustomNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'customize' | 'details' | 'reviews'>('details');
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedVariationId, setSelectedVariationId] = useState<string>(
    product?.colorVariations?.[0]?.id || ''
  );
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedGrout(product.customizationOptions?.groutColors?.[0]?.name || 'Blanc Craie Épuré / أبيض ناصع');
      setSelectedFrame(
        product.customizationOptions?.frameFinishes?.[0]?.name ||
          'Coupe Onglet 45° + Patins Feutre / قص 45° + وسائد حماية'
      );
      setPaymentType('deposit');
      setCustomNotes('');
      setActiveImage(product.image);
      setSelectedVariationId(product.colorVariations?.[0]?.id || '');
      setIsAdded(false);
    }
  }, [product?.id]);

  if (!product) return null;

  const t = TRANSLATIONS[lang];
  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const galleryImages =
    product.additionalImages && product.additionalImages.length > 0
      ? product.additionalImages
      : [product.image];

  const colorVariations = product.colorVariations || [];
  const activeVariation =
    colorVariations.find((v) => v.id === selectedVariationId) || colorVariations[0] || null;
  const activeGroutObj =
    product.customizationOptions?.groutColors?.find((g) => g.name === selectedGrout) ||
    product.customizationOptions?.groutColors?.[0];
  const activeGroutHex = activeGroutObj?.hex || '#FAF9F6';

  const handleSelectVariation = (variation: NonNullable<Product['colorVariations']>[number]) => {
    setSelectedVariationId(variation.id);
    if (variation.previewImage) {
      setActiveImage(variation.previewImage);
    }
  };

  const amountToPayNow = paymentType === 'deposit' ? product.depositPrice * quantity : product.price * quantity;
  const balanceUponDispatch = paymentType === 'deposit' ? (product.price - product.depositPrice) * quantity : 0;

  const handlePreOrder = () => {
    const selectedColorLabel = activeVariation
      ? `${activeVariation.nameFr} / ${activeVariation.nameAr}`
      : product.colorSwatches?.[0]?.name;

    onAddToCart(product, quantity, {
      tileColor: selectedColorLabel,
      groutColor: selectedGrout,
      frameFinish: selectedFrame,
      customNotes,
      paymentType,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl shadow-2xl border border-stone-300 overflow-hidden max-h-[95vh] sm:max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200 flex items-center justify-between gap-3 bg-[#FAFAF8]">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#0F4C81] uppercase tracking-wider font-semibold min-w-0">
            <span className="truncate">{product.categoryLabel}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline font-medium text-stone-600 truncate">{t.pdp.kicker}</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span className="hidden md:inline text-stone-400 truncate">{product.productionBatch}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(product.id)}
                className={`px-2.5 py-1.5 border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                  isCompared
                    ? 'bg-[#0F4C81] border-[#0F4C81] text-white'
                    : 'bg-white border-stone-300 text-stone-600 hover:text-[#141413] hover:border-stone-500'
                }`}
                title={isCompared ? t.compare.buttonAdded : t.compare.buttonAdd}
              >
                {isCompared ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline text-[11px]">
                  {isCompared ? t.compare.buttonAdded : t.compare.buttonAdd}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`px-2.5 py-1.5 border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-stone-300 text-stone-600 hover:text-rose-600 hover:border-stone-500'
              }`}
              title={isWishlisted ? t.wishlist.remove : t.wishlist.filterLabel}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              <span className="hidden sm:inline text-[11px]">
                {isWishlisted ? (lang === 'ar' ? 'في المفضلة' : 'Enregistré') : t.wishlist.filterLabel}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-[#141413] hover:bg-stone-200 border border-transparent transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Gallery Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-[4/3] overflow-hidden bg-stone-100 border border-stone-200 relative">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#0F4C81]/95 text-white text-[11px] font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 text-sky-200" />
                  <span>{product.leadTime}</span>
                </div>

                {/* Floating Wishlist Button on Image */}
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-xs transition-all duration-200 cursor-pointer active:scale-90 ${
                    isWishlisted
                      ? 'bg-white text-rose-600 ring-2 ring-rose-400/60 shadow-sm'
                      : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
                    }`}
                  />
                </button>
                {/* Active Color Preview Caption Bar */}
                {activeVariation && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3.5 py-2.5 flex items-center justify-between gap-2 text-white text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex items-center -space-x-1 shrink-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/80"
                          style={{ backgroundColor: activeVariation.hex }}
                        />
                        {activeVariation.secondaryHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/80"
                            style={{ backgroundColor: activeVariation.secondaryHex }}
                          />
                        )}
                      </span>
                      <span className="font-medium truncate">
                        {lang === 'ar' ? activeVariation.nameAr : activeVariation.nameFr}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-stone-300 uppercase shrink-0">
                      {lang === 'ar' ? 'معاينة' : 'APERÇU'}
                    </span>
                  </div>
                )}
              </div>

              {/* Multi-image Thumbnail Gallery */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((imgSrc, idx) => (
                    <button
                      key={`${imgSrc}-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(imgSrc)}
                      className={`aspect-[4/3] overflow-hidden border transition-all cursor-pointer bg-stone-100 ${
                        (activeImage || product.image) === imgSrc
                          ? 'border-[#141413] ring-1 ring-[#141413]'
                          : 'border-stone-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.name} - vue ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Live Architectural Sample Swatch Board (Tile + Grout OR Mineral Plaster OR Mirror Frame) */}
              {activeVariation && (
                <div className="p-3.5 border border-stone-200 bg-[#FAFAF8] flex items-center gap-3.5">
                  {product.category === 'mirrors' ? (
                    <div
                      className="w-16 h-16 shrink-0 border border-stone-300 bg-white flex items-center justify-center p-2"
                      aria-hidden="true"
                    >
                      <div
                        className="w-9 h-12 rounded-[52%_48%_44%_56%/36%_62%_38%_64%] p-[4px] flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: activeGroutHex }}
                      >
                        <div className="w-full h-full rounded-[50%_50%_42%_58%/38%_60%_40%_62%] bg-gradient-to-br from-sky-50 via-stone-100 to-stone-200 border border-black/10" />
                      </div>
                    </div>
                  ) : product.category === 'organic' ? (
                    <div
                      className="w-16 h-16 shrink-0 border border-stone-300 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: activeVariation.hex }}
                      aria-hidden="true"
                    >
                      <div
                        className="w-10 h-7 rounded-[45%_55%_60%_40%/50%_40%_60%_50%] border border-black/10 shadow-inner"
                        style={{ backgroundColor: activeGroutHex }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 shrink-0 p-[3px] grid grid-cols-3 grid-rows-3 gap-[3px] border border-stone-300"
                      style={{ backgroundColor: activeGroutHex }}
                      aria-hidden="true"
                    >
                      {[...Array(9)].map((_, i) => {
                        const tileHex =
                          activeVariation.secondaryHex && i % 2 === 1
                            ? activeVariation.secondaryHex
                            : activeVariation.hex;
                        return (
                          <div
                            key={i}
                            className="w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.28)]"
                            style={{ backgroundColor: tileHex }}
                          />
                        );
                      })}
                    </div>
                  )}

                  <div className="min-w-0 flex-1 space-y-1 text-xs">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#0F4C81]">
                      {product.category === 'mirrors'
                        ? lang === 'ar'
                          ? 'معاينة إطار المرآة والملمس'
                          : 'APERÇU CADRE MIROIR EN DIRECT'
                        : product.category === 'organic'
                        ? lang === 'ar'
                          ? 'عينة الميكرو سمنت المباشرة'
                          : 'ÉCHANTILLON MINÉRAL EN DIRECT'
                        : lang === 'ar'
                        ? 'معاينة الخزف والفواصل المباشرة'
                        : 'APERÇU CARREAUX & JOINT EN DIRECT'}
                    </div>
                    <div className="font-semibold text-[#141413] truncate">
                      {lang === 'ar' ? activeVariation.nameAr : activeVariation.nameFr}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
                        style={{ backgroundColor: activeGroutHex }}
                      />
                      <span className="truncate">{selectedGrout}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* On-Demand Pre-Order Timeline Card */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-sky-50/50 to-stone-50 border border-sky-100 text-xs space-y-3">
                <div className="flex items-center justify-between font-serif font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  <span className="flex items-center gap-1.5 text-[#0F4C81]">
                    <Hammer className="w-4 h-4" />
                    <span>{t.pdp.timelineTitle}</span>
                  </span>
                </div>

                <div className="space-y-2 text-[11px] text-stone-600">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">1</span>
                    <p>{t.pdp.step1}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">2</span>
                    <p>{t.pdp.step2}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">3</span>
                    <p>{t.pdp.step3}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">4</span>
                    <p>{t.pdp.step4}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/80 flex items-center gap-1.5 text-emerald-800 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.pdp.photoUpdateBadge}</span>
                </div>
              </div>
            </div>

            {/* Customization & Pre-Order Module */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#141413] tracking-[-0.02em]">
                  {product.name}
                </h2>

                {/* Quick Interactive Color Swatches Row under Title */}
                {colorVariations.length > 0 ? (
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                      {lang === 'ar' ? 'انقر لمعاينة الألوان :' : 'NUANCES DISPONIBLES (CLIQUER POUR APERÇU) :'}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {colorVariations.map((v) => {
                        const isSelected = activeVariation?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => handleSelectVariation(v)}
                            className={`px-2.5 py-1.5 border text-xs flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#141413] bg-[#141413] text-white font-medium'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                            }`}
                            title={lang === 'ar' ? v.nameAr : v.nameFr}
                          >
                            <span className="flex items-center -space-x-1 shrink-0">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20"
                                style={{ backgroundColor: v.hex }}
                              />
                              {v.secondaryHex && (
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-black/20"
                                  style={{ backgroundColor: v.secondaryHex }}
                                />
                              )}
                            </span>
                            <span className="text-[11px] whitespace-nowrap">
                              {lang === 'ar' ? v.nameAr : v.nameFr}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  product.colorSwatches &&
                  product.colorSwatches.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-stone-600">
                      {product.colorSwatches.map((sw) => (
                        <span key={sw.name} className="inline-flex items-center gap-1.5 font-mono text-[11px]">
                          <span
                            className="w-3 h-3 rounded-full border border-stone-300"
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span>{sw.name}</span>
                        </span>
                      ))}
                    </div>
                  )
                )}

                {/* Rating score jump */}
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="font-semibold text-stone-900 underline underline-offset-2 hover:text-[#0F4C81] cursor-pointer"
                  >
                    {product.rating.toFixed(1)} ({productReviews.length} avis vérifiés)
                  </button>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-stone-500 font-mono text-[11px]">{product.details.slotsRemaining} {t.catalog.slotsLeft}</span>
                </div>

                {/* Pricing in DT */}
                <div className="mt-4 p-3.5 bg-sky-50/70 rounded-xl border border-sky-100 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-semibold font-mono text-stone-900 tabular-nums">
                        {product.price} {currencyUnit}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm font-mono text-stone-400 line-through ml-2 tabular-nums">
                          {product.originalPrice} {currencyUnit}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#0F4C81] bg-white px-2.5 py-0.5 rounded-md border border-sky-200">
                      {t.pdp.preOrderBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {t.pdp.depositNotice} ({product.depositPrice} {currencyUnit})
                  </p>
                </div>
              </div>

              {/* Pre-Order Customizer */}
              <div className="space-y-4 pt-1">
                {/* 1. Interactive Tile / Finish Color Swatch Selector */}
                {colorVariations.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-stone-800">
                        {product.category === 'mirrors'
                          ? lang === 'ar'
                            ? '1. اختر لون الإطار والتشطيب للمعاينة'
                            : '1. Coloris du revêtement ou finition cadre (aperçu)'
                          : product.category === 'organic'
                          ? lang === 'ar'
                            ? '1. اختر لون السطح المعدني للمعاينة'
                            : '1. Couleur de l’enduit minéral (aperçu en direct)'
                          : lang === 'ar'
                          ? '1. اختر لون الخزف والتصميم للمعاينة'
                          : '1. Coloris des carreaux & finition (aperçu en direct)'}
                      </label>
                      {activeVariation && (
                        <span className="text-[11px] font-mono text-[#0F4C81]">
                          {lang === 'ar' ? activeVariation.noteAr : activeVariation.noteFr}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {colorVariations.map((v) => {
                        const isSelected = activeVariation?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => handleSelectVariation(v)}
                            className={`p-2.5 border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#141413] bg-stone-50 ring-1 ring-[#141413] font-medium text-[#141413]'
                                : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                            }`}
                          >
                            <span className="flex items-center -space-x-1 shrink-0">
                              <span
                                className="w-4 h-4 rounded-full border border-stone-300"
                                style={{ backgroundColor: v.hex }}
                              />
                              {v.secondaryHex && (
                                <span
                                  className="w-4 h-4 rounded-full border border-stone-300"
                                  style={{ backgroundColor: v.secondaryHex }}
                                />
                              )}
                            </span>
                            <span className="truncate">{lang === 'ar' ? v.nameAr : v.nameFr}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Grout or Mineral Tone Selection */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    {product.category === 'mirrors'
                      ? lang === 'ar'
                        ? '2. اختر نوع القماش أو التشطيب (بوكليت / مخمل / ميكرو سمنت)'
                        : '2. Texture et teinte du cadre (Bouclette, Velours ou Micro-Ciment)'
                      : product.category === 'organic'
                      ? lang === 'ar'
                        ? '2. تدرّج النعومة المعدنية (ميكرو سمنت / تادلاكت)'
                        : '2. Nuance de patine minérale (Micro-Ciment / Tadelakt)'
                      : colorVariations.length > 0
                      ? lang === 'ar'
                        ? '2. اختر لون فاصل الإيبوكسي العازل (مقاوم للبقع)'
                        : '2. Teinte du joint époxy antitache'
                      : t.pdp.selectGrout}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.customizationOptions?.groutColors?.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGrout(g.name)}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          selectedGrout === g.name
                            ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81] font-medium text-stone-900'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                          style={{ backgroundColor: g.hex }}
                        />
                        <span className="truncate">{g.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frame or Mineral Sealer Selection */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    {product.category === 'mirrors'
                      ? lang === 'ar'
                        ? '3. اختر طريقة التثبيت والإضاءة'
                        : '3. Option de pose, sécurité & éclairage LED'
                      : product.category === 'organic'
                      ? lang === 'ar'
                        ? '3. اختر نوع التشطيب والعزل المانع للبقع'
                        : '3. Choisissez le vernis de protection & toucher minéral'
                      : colorVariations.length > 0
                      ? lang === 'ar'
                        ? '3. اختر تشطيب الحواف والقاعدة'
                        : '3. Finition des bords & piètement'
                      : t.pdp.selectFrame}
                  </label>
                  <div className="space-y-2 text-xs">
                    {product.customizationOptions?.frameFinishes?.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFrame(f.name)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedFrame === f.name
                            ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81]'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="font-semibold text-stone-900">{f.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{f.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Payment Option Selection (Acompte 50% vs Total) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    {t.pdp.selectPlan}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentType('deposit')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        paymentType === 'deposit'
                          ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81]'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-semibold text-stone-900 block">{t.pdp.depositPlan}</span>
                      <span className="text-stone-600 font-mono text-[11px] block mt-0.5">
                        {product.depositPrice * quantity} {currencyUnit}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-medium block mt-1">
                        {t.pdp.balanceNotice}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentType('full')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        paymentType === 'full'
                          ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81]'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="font-semibold text-stone-900 block">{t.pdp.fullPlan}</span>
                      <span className="text-stone-600 font-mono text-[11px] block mt-0.5">
                        {product.price * quantity} {currencyUnit}
                      </span>
                      <span className="text-[10px] text-stone-500 block mt-1">
                        {t.pdp.fullPlanSub}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    {t.pdp.customNotesLabel}
                  </label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder={t.pdp.customNotesPlaceholder}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-md text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-stone-700">{t.pdp.qtyLabel}</span>
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-100 disabled:opacity-40 cursor-pointer font-semibold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-stone-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-100 cursor-pointer font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-stone-500">{t.pdp.dueTodayLabel}</div>
                    <div className="text-xl font-bold font-mono text-[#0F4C81] tabular-nums">
                      {amountToPayNow} {currencyUnit}
                    </div>
                    {balanceUponDispatch > 0 && (
                      <div className="text-[10px] text-stone-500">
                        ({balanceUponDispatch} {currencyUnit} {t.pdp.balanceNotice})
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handlePreOrder}
                  disabled={isAdded}
                  className={`w-full py-3.5 px-4 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#141413] hover:bg-[#0F4C81] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Table Ajoutée au Panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.pdp.confirmPreOrderButton} · {amountToPayNow} {currencyUnit}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  {t.pdp.cancelGuarantee}
                </p>
              </div>
            </div>
          </div>

          {/* Tabbed Info Section */}
          <div className="mt-10 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-6 border-b border-stone-200 mb-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-[#0F4C81] border-b-2 border-[#0F4C81] font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {t.pdp.tabSpecs}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'reviews'
                    ? 'text-[#0F4C81] border-b-2 border-[#0F4C81] font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <span>{t.pdp.tabReviews}</span>
                <span className="text-xs bg-sky-100 text-[#0F4C81] px-2 py-0.5 rounded-full font-mono">
                  {productReviews.length}
                </span>
              </button>
            </div>

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-700">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.materialsLabel}</span>
                    <span className="text-stone-600">{product.details.materials}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.dimensionsLabel}</span>
                    <span className="text-stone-600">{product.details.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.cadenceLabel}</span>
                    <span className="text-stone-600">{product.leadTime}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.careLabel}</span>
                    <span className="text-stone-600">{product.details.burnTimeOrCare}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.originLabel}</span>
                    <span className="font-mono text-stone-600">{product.details.origin}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">{t.pdp.packagingLabel}</span>
                    <span className="text-stone-600">Caisse en bois renforcée, livraison sécurisée toute la Tunisie</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4 bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                  <div>
                    <div className="text-base font-serif text-stone-900">
                      Avis clients pour : {product.name}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Note moyenne de {product.rating.toFixed(1)}/5 basée sur les commandes livrées en Tunisie
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenWriteReview(product)}
                    className="px-4 py-2 text-xs font-medium text-white bg-[#0F4C81] rounded-lg hover:bg-[#0c3c66] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PenSquare className="w-3.5 h-3.5" />
                    <span>Donner mon Avis</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900">{rev.author}</span>
                          <span className="text-stone-500">· {rev.location}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[11px] text-emerald-800 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Achat Vérifié
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="font-medium text-stone-900 text-sm font-serif">
                        {rev.title}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
