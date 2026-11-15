import React, { useState } from 'react';
import { CartItem, CheckoutDetails, PlacedOrder } from '../types';
import { X, Check, ShieldCheck, Truck, CreditCard, DollarSign, PackageCheck, Printer, Clock, Calendar } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: PlacedOrder) => void;
  lang: Language;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const currencyUnit = lang === 'ar' ? 'د.ت' : 'DT';

  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: 'Grand Tunis',
    country: 'Tunisie',
    shippingMethod: 'standard',
    paymentMethod: 'cod',
    cardDetails: {
      cardNumber: '•••• •••• •••• 4242',
      expiry: '12/28',
      cvc: '•••',
    },
    orderNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  // Pricing math in Tunisian Dinars DT
  const fullPriceSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDueTodaySubtotal = items.reduce((sum, item) => {
    const unitPrice = item.customization?.paymentType === 'deposit'
      ? item.product.depositPrice
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const shippingCost = formData.shippingMethod === 'express' ? 90 : fullPriceSubtotal >= 1000 ? 0 : 40;
  const balanceDueOnDispatch = fullPriceSubtotal - totalDueTodaySubtotal;
  const amountDueToday = totalDueTodaySubtotal + (balanceDueOnDispatch > 0 ? 0 : shippingCost);

  // Compute estimated completion date (~3 weeks from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 21);
  const estimatedDateString = targetDate.toLocaleDateString(lang === 'ar' ? 'ar-TN' : 'fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleInputChange = (field: keyof CheckoutDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.address.trim()) {
      setValidationError(lang === 'ar' ? 'يرجى إكمال الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: PlacedOrder = {
        orderId: `DC-TN-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-TN' : 'fr-FR', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        estimatedCompletionDate: estimatedDateString,
        items: [...items],
        subtotal: fullPriceSubtotal,
        shipping: shippingCost,
        total: fullPriceSubtotal + shippingCost,
        amountDueNow: amountDueToday,
        balanceDueOnDispatch,
        details: { ...formData },
        isPreOrder: true,
      };

      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  const handleCloseAndFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  const tunisianGovernorates = [
    'Tunis / تونس',
    'Ariana / أريانة',
    'Ben Arous / بن عروس',
    'Manouba / منوبة',
    'Nabeul / نابل (الوطن القبلي)',
    'Sousse / سوسة (الساحل)',
    'Monastir / المنستير',
    'Mahdia / المهدية',
    'Sfax / صفاقس',
    'Bizerte / بنزرت',
    'Kairouan / القيروان',
    'Gabès / قابس',
    'Médenine & Djerba / مدنين وجربة',
    'Autre gouvernorat / ولاية أخرى',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-sky-50/70">
          <div className="flex items-center gap-3">
            <BrandLogo variant="light" size="sm" markOnly />
            <span className="font-serif text-lg text-stone-900">
              {confirmedOrder ? t.checkout.successTitle : t.checkout.header}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-xs text-[#0F4C81] font-semibold">{t.checkout.subtitle}</span>
          </div>
          <button
            onClick={handleCloseAndFinish}
            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {confirmedOrder ? (
            /* Confirmation Screen */
            <div className="max-w-xl mx-auto py-6 space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <PackageCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {confirmedOrder.orderId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-2">
                  {t.checkout.successTitle}
                </h3>
                <p className="text-xs text-stone-600 mt-2">
                  {t.checkout.successText}
                </p>
                <p className="text-[11px] font-mono text-stone-500 mt-2">
                  {lang === 'ar'
                    ? 'الورشة : طريق الخليدية، شبدّة، نعسان 1135، بن عروس · '
                    : 'Atelier : Route Khelidia, Chebedda, Naassen 1135, Ben Arous · '}
                  <a href="tel:+21623559559" dir="ltr" className="text-[#0F4C81] font-semibold tabular-nums">
                    +216 23 559 559
                  </a>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-medium text-stone-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0F4C81]" />
                    <span>{t.checkout.estDispatch}</span>
                  </span>
                  <span className="font-semibold text-stone-900 font-mono">
                    {confirmedOrder.estimatedCompletionDate}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="font-semibold text-stone-800 block">{t.checkout.addressLabel}</span>
                  <p className="text-stone-600">
                    {confirmedOrder.details.address}, {confirmedOrder.details.city} ({confirmedOrder.details.state})
                  </p>
                  <p className="text-stone-500 font-mono text-[11px]">Contact : {confirmedOrder.details.phone || confirmedOrder.details.email}</p>
                </div>

                {/* Specs */}
                <div className="py-2 border-t border-stone-200 space-y-2">
                  <span className="font-semibold text-stone-800 block">{t.checkout.specsTitle}</span>
                  {confirmedOrder.items.map((item, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-0.5">
                      <div className="font-medium text-stone-900">{item.product.name} (×{item.quantity})</div>
                      {item.customization?.tileColor && (
                        <div>Coloris : <span className="text-stone-800 font-medium">{item.customization.tileColor}</span></div>
                      )}
                      <div>Joint / Patine : <span className="text-stone-800">{item.customization?.groutColor}</span></div>
                      <div>Structure : <span className="text-stone-800">{item.customization?.frameFinish}</span></div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-200 space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>{t.checkout.totalValue}</span>
                    <span className="font-mono tabular-nums font-semibold">{confirmedOrder.total} {currencyUnit}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-200 text-sm">
                    <span>{t.checkout.chargedToday}</span>
                    <span className="font-mono tabular-nums text-[#0F4C81]">{confirmedOrder.amountDueNow} {currencyUnit}</span>
                  </div>
                  {confirmedOrder.balanceDueOnDispatch > 0 && (
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>{t.checkout.balanceDue}</span>
                      <span className="font-mono tabular-nums">{confirmedOrder.balanceDueOnDispatch} {currencyUnit}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.checkout.printReceipt}</span>
                </button>
                <button
                  onClick={handleCloseAndFinish}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3c66] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {t.checkout.returnStore}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Fields */}
              <div className="lg:col-span-7 space-y-6 text-xs">
                {validationError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {validationError}
                  </div>
                )}

                {/* Terms Notice */}
                <div className="p-3.5 bg-sky-50/80 rounded-xl border border-sky-100 text-stone-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#0F4C81]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.checkout.termsTitle}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {t.checkout.termsText}
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    {t.checkout.step1Title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        {t.checkout.fullName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="ex: Mohamed Ali Saidi"
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F4C81] text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Numéro de Téléphone (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="ex: +216 XX XXX XXX"
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F4C81] text-stone-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address in Tunisia */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    {t.checkout.step2Title}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        {t.checkout.address} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="ex: Résidence Les Jardins, Rue du Jasmin"
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F4C81] text-stone-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">{t.checkout.city}</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="ex: La Marsa / Hammamet"
                          className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F4C81] text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">{t.checkout.stateGov}</label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F4C81] text-stone-900 cursor-pointer"
                        >
                          {tunisianGovernorates.map((gov) => (
                            <option key={gov} value={gov}>
                              {gov}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    {t.checkout.step3Title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => handleInputChange('shippingMethod', 'standard')}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'standard'
                          ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81]'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-stone-900">{t.checkout.shippingStandard}</span>
                        <span className="font-mono tabular-nums font-semibold text-[#0F4C81]">
                          {fullPriceSubtotal >= 1000 ? 'GRATUIT' : `40 ${currencyUnit}`}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500">{t.checkout.shippingStandardSub}</span>
                    </label>

                    <label
                      onClick={() => handleInputChange('shippingMethod', 'express')}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                        formData.shippingMethod === 'express'
                          ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81]'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-stone-900">{t.checkout.shippingWhiteGlove}</span>
                        <span className="font-mono tabular-nums font-semibold text-[#0F4C81]">90 {currencyUnit}</span>
                      </div>
                      <span className="text-[11px] text-stone-500">{t.checkout.shippingWhiteGloveSub}</span>
                    </label>
                  </div>
                </div>

                {/* Payment Option */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-3">
                    {t.checkout.step4Title}
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'cod')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer text-xs ${
                          formData.paymentMethod === 'cod'
                            ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81] font-semibold text-[#0F4C81]'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span>{t.checkout.payCod}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer text-xs ${
                          formData.paymentMethod === 'card'
                            ? 'border-[#0F4C81] bg-sky-50 ring-1 ring-[#0F4C81] font-semibold text-[#0F4C81]'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#0F4C81]" />
                        <span>{t.checkout.payCard}</span>
                      </button>
                    </div>

                    {formData.paymentMethod === 'cod' && (
                      <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                        <span className="font-semibold block">Paiement Sécurisé à Réception :</span>
                        {t.checkout.codTerms}
                      </div>
                    )}

                    {formData.paymentMethod === 'card' && (
                      <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-stone-800 text-xs space-y-1">
                        <span className="font-semibold text-[#0F4C81] block">Virement / D17 / Flouci :</span>
                        <p className="text-[11px] text-stone-600">
                          Nos coordonnées bancaires tunisiennes (RIB Attijari / BIAT ou compte D17) vous seront envoyées immédiatement pour régler votre acompte ou commande.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="lg:col-span-5 bg-gradient-to-b from-sky-50/50 to-stone-50 p-6 rounded-2xl border border-sky-100 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-4 pb-3 border-b border-stone-200">
                    {t.checkout.summaryTitle} ({items.length} tables)
                  </h4>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map(({ product, quantity, customization }) => (
                      <div key={product.id} className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-stone-900">{product.name} × {quantity}</span>
                          <span className="font-mono font-semibold text-stone-900 tabular-nums">
                            {product.price * quantity} {currencyUnit}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 space-y-0.5">
                          {customization?.tileColor && (
                            <div>Coloris : <span className="text-stone-800 font-medium">{customization.tileColor}</span></div>
                          )}
                          <div>Joint / Patine : <span className="text-stone-700">{customization?.groutColor}</span></div>
                          <div>Piètement : <span className="text-stone-700">{customization?.frameFinish}</span></div>
                          <div className="text-[#0F4C81] font-medium">
                            {customization?.paymentType === 'deposit' ? 'Acompte 50% Sélectionné' : 'Paiement Intégral'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>{t.checkout.totalValue}</span>
                      <span className="font-mono tabular-nums font-semibold">{fullPriceSubtotal} {currencyUnit}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>{t.checkout.shippingCost}</span>
                      <span className="font-mono tabular-nums">
                        {shippingCost === 0 ? 'GRATUIT' : `${shippingCost} ${currencyUnit}`}
                      </span>
                    </div>
                    {balanceDueOnDispatch > 0 && (
                      <div className="flex justify-between text-stone-500 text-[11px]">
                        <span>{t.checkout.balanceDue}</span>
                        <span className="font-mono tabular-nums">{balanceDueOnDispatch} {currencyUnit}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-900 font-semibold text-base pt-2 border-t border-stone-200">
                      <span>{t.checkout.chargedToday}</span>
                      <span className="font-mono tabular-nums text-[#0F4C81]">{amountDueToday} {currencyUnit}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3c66] disabled:bg-stone-700 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enregistrement de la commande...</span>
                      </div>
                    ) : (
                      <span>{t.checkout.submitButton} · {amountDueToday} {currencyUnit}</span>
                    )}
                  </button>

                  <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-stone-500 text-center">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{t.checkout.refundNote}</span>
                    </div>
                    <span className="font-mono text-stone-700" dir="ltr">
                      +216 23 559 559 · Naassen, Ben Arous 1135
                    </span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
