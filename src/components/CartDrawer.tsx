import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Clock, ShieldCheck } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  lang,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  const fullPriceTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDueToday = items.reduce((sum, item) => {
    const unitDue = item.customization?.paymentType === 'deposit'
      ? item.product.depositPrice
      : item.product.price;
    return sum + unitDue * item.quantity;
  }, 0);

  const balanceDueOnDispatch = fullPriceTotal - totalDueToday;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-sky-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0F4C81]" />
            <h3 className="font-serif text-lg text-stone-900">{t.cart.title}</h3>
            <span className="text-xs bg-[#0F4C81] text-white px-2 py-0.5 rounded-full font-mono">
              {items.reduce((sum, i) => sum + i.quantity, 0)} {t.cart.tablesCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Time Notice Banner */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{t.cart.leadNotice}</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-serif text-base text-stone-800">{t.cart.emptyTitle}</p>
              <p className="text-xs text-stone-500">
                {t.cart.emptyText}
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3c66] rounded-lg transition-colors cursor-pointer"
              >
                {t.cart.browseButton}
              </button>
            </div>
          ) : (
            items.map(({ product, quantity, customization }) => {
              const isDeposit = customization?.paymentType === 'deposit';
              const unitPriceNow = isDeposit ? product.depositPrice : product.price;

              return (
                <div
                  key={product.id}
                  className="p-3.5 bg-stone-50/80 rounded-xl border border-stone-200/90 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-18 h-18 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Délai : <span className="font-medium text-stone-800">{product.leadTime}</span>
                      </div>

                      {/* Customization Specs */}
                      <div className="mt-2 text-[11px] text-stone-600 bg-white p-2 rounded-md border border-stone-200 space-y-0.5">
                        {customization?.tileColor && (
                          <div>
                            <span className="text-stone-400">
                              {lang === 'ar' ? 'اللون :' : 'Coloris :'}
                            </span>{' '}
                            <span className="font-medium text-stone-900">{customization.tileColor}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-stone-400">{t.cart.groutLabel}</span>{' '}
                          <span className="font-medium text-stone-800">{customization?.groutColor}</span>
                        </div>
                        <div>
                          <span className="text-stone-400">{t.cart.frameLabel}</span>{' '}
                          <span className="font-medium text-stone-800">{customization?.frameFinish}</span>
                        </div>
                        {customization?.customNotes && (
                          <div className="truncate">
                            <span className="text-stone-400">{t.cart.notesLabel}</span>{' '}
                            <span className="italic">{customization.customNotes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Pricing in DT */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                    <div className="flex items-center border border-stone-300 rounded-md bg-white">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-mono text-stone-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-semibold text-stone-900 tabular-nums">
                        {unitPriceNow * quantity} {currencyUnit}{' '}
                        {isDeposit && <span className="text-[10px] text-emerald-800 font-normal">({t.cart.depositTag})</span>}
                      </div>
                      {isDeposit && (
                        <div className="text-[10px] text-stone-500 font-mono">
                          {(product.price - product.depositPrice) * quantity} {currencyUnit} {t.cart.balanceOnDispatch}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/60 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>{t.cart.totalValue}</span>
                <span className="font-mono text-stone-900 tabular-nums font-semibold">
                  {fullPriceTotal} {currencyUnit}
                </span>
              </div>
              {balanceDueOnDispatch > 0 && (
                <div className="flex items-center justify-between text-stone-500 text-[11px]">
                  <span>{t.cart.balanceDue}</span>
                  <span className="font-mono tabular-nums">
                    {balanceDueOnDispatch} {currencyUnit}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-stone-900 text-sm font-semibold pt-2 border-t border-stone-200">
                <span>{t.cart.dueToday}</span>
                <span className="font-mono text-base tabular-nums text-[#0F4C81]">
                  {totalDueToday} {currencyUnit}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3c66] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
            >
              <span>{t.cart.checkoutButton}</span>
              <ArrowRight className="w-4 h-4 text-sky-200" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.cart.guarantee}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
