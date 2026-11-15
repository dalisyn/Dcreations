import React from 'react';
import { Product } from '../types';
import { X, Heart, Trash2, ArrowRight, Eye, Clock, ShoppingBag } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: Language;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  products,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  lang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const w = t.wishlist;

  const wishlistProducts = products.filter((p) => wishlistProductIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200/80">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-stone-900">
                {w.title}
              </h2>
              <span className="text-[11px] text-stone-500 font-mono tabular-nums">
                {wishlistProducts.length} {w.itemCount}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200">
                <Heart className="w-8 h-8 text-stone-300" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-stone-900">{w.emptyTitle}</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1 leading-relaxed">
                  {w.emptyDesc}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#0F4C81] text-white text-xs font-medium rounded-lg hover:bg-[#0c3c66] transition-colors cursor-pointer shadow-xs"
              >
                {w.browseCatalog}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistProducts.map((product) => {
                const depositAmount = Math.round(product.price * 0.5);

                return (
                  <div
                    key={product.id}
                    className="p-3.5 bg-stone-50/80 rounded-xl border border-stone-200/90 flex gap-3.5 items-start group hover:border-[#0F4C81]/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300/80 cursor-pointer relative"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider block">
                            {product.categoryLabel}
                          </span>
                          <h4
                            onClick={() => {
                              onClose();
                              onSelectProduct(product);
                            }}
                            className="font-serif text-sm font-semibold text-stone-900 line-clamp-1 hover:text-[#0F4C81] cursor-pointer transition-colors"
                          >
                            {product.name}
                          </h4>
                        </div>
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(product.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                          title={w.remove}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pricing row */}
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                          {product.price} {lang === 'ar' ? 'د.ت' : 'DT'}
                        </span>
                        <span className="text-[10px] text-[#0F4C81] font-medium bg-sky-50 px-1.5 py-0.2 rounded-sm border border-sky-100">
                          {w.depositTag}: {depositAmount} {lang === 'ar' ? 'د.ت' : 'DT'}
                        </span>
                      </div>

                      {/* Lead time */}
                      <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1">
                        <Clock className="w-3 h-3 text-[#C25E3E]" />
                        <span>{product.leadTime}</span>
                      </div>

                      {/* Actions */}
                      <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-stone-200/60">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="flex-1 py-1.5 px-2.5 bg-[#0F4C81] hover:bg-[#0c3c66] text-white text-[11px] font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3 text-sky-200" />
                          <span>{w.configureAndOrder}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50/90 flex items-center justify-between gap-3 text-xs">
            <span className="text-stone-500">
              {wishlistProducts.length} {w.itemCount}
            </span>
            <button
              onClick={() => {
                onClose();
                const shopEl = document.getElementById('shop-section');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#0F4C81] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              <span>{w.browseCatalog}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
