import React from 'react';
import { Product } from '../types';
import { ArrowLeftRight, X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface CompareTrayProps {
  selectedProducts: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onOpenCompare: () => void;
  lang: Language;
}

export const CompareTray: React.FC<CompareTrayProps> = ({
  selectedProducts,
  onRemove,
  onClear,
  onOpenCompare,
  lang,
}) => {
  if (selectedProducts.length === 0) return null;

  const t = TRANSLATIONS[lang];
  const c = t.compare;

  return (
    <div
      role="region"
      aria-label={c.trayTitle}
      className={`fixed bottom-4 sm:bottom-6 z-40 max-w-[calc(100vw-5.75rem)] sm:max-w-none bg-[#141413] text-white border border-stone-700 shadow-xl transition-all duration-200 ${
        lang === 'ar' ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-4 sm:py-2.5">
        {/* Status & Thumbnails (Desktop & Tablet) */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 bg-[#0F4C81] text-white flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </span>

          <div className="hidden md:flex items-center gap-1.5">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="relative group w-8 h-8 border border-stone-600 bg-stone-800 overflow-hidden shrink-0"
                title={product.name}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`${c.removeItem} ${product.name}`}
                  className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-xs leading-tight min-w-0">
            <span className="font-mono font-semibold tabular-nums text-white block truncate">
              <span className="sm:hidden">{selectedProducts.length}/4</span>
              <span className="hidden sm:inline">
                {c.trayTitle} ({selectedProducts.length}/4)
              </span>
            </span>
            <span className="hidden lg:block text-[10px] text-stone-400">
              {c.trayLimitHint}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCompare}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium bg-white text-[#141413] hover:bg-[#D4B075] hover:text-[#141413] transition-colors cursor-pointer whitespace-nowrap"
          >
            {c.compareNow}
          </button>
          <button
            type="button"
            onClick={onClear}
            aria-label={c.clearAll}
            title={c.clearAll}
            className="p-1.5 text-stone-400 hover:text-white border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
