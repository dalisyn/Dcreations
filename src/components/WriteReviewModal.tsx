import React, { useState } from 'react';
import { Product, Review } from '../types';
import { X, Star, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProduct?: Product | null;
  onSubmitReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  lang: Language;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  products,
  initialProduct,
  onSubmitReview,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedProductId, setSelectedProductId] = useState(
    initialProduct?.id || (products[0] ? products[0].id : '')
  );
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [verifiedPurchase, setVerifiedPurchase] = useState(true);
  const [selectedTag, setSelectedTag] = useState(lang === 'ar' ? 'فخار أصيل' : 'Faïence Artisanale');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const tagOptions = lang === 'ar'
    ? ['فخار أصيل', 'مقاوم للبقع', 'حديد صلب', 'لون سيدي بوسعيد', 'توصيل محمي']
    : ['Faïence Artisanale', 'Joint Époxy Antitache', 'Fer Forgé Robuste', 'Bleu Sidi Bou Saïd', 'Caisse Sécurisée'];

  const ratingDescriptions: Record<number, string> = lang === 'ar'
    ? {
        1: 'غير راضٍ',
        2: 'متوسط',
        3: 'جيد',
        4: 'ممتاز جداً',
        5: 'تحفة تقليدية مبهرة',
      }
    : {
        1: 'Moyen / Décevant',
        2: 'Passable',
        3: 'Conforme',
        4: 'Très Belle Finition',
        5: 'Chef-d’œuvre Artisanal',
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setError(lang === 'ar' ? 'يرجى كتابة الاسم' : 'Veuillez saisir votre nom');
      return;
    }
    if (!title.trim()) {
      setError(lang === 'ar' ? 'يرجى كتابة عنوان التقييم' : 'Veuillez indiquer un titre pour votre avis');
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setError(lang === 'ar' ? 'يرجى كتابة تعليق كافٍ (10 أحرف على الأقل)' : 'Veuillez écrire au moins une phrase détaillée (min. 10 caractères)');
      return;
    }

    const prod = products.find((p) => p.id === selectedProductId) || products[0];

    onSubmitReview({
      productId: prod.id,
      productName: prod.name,
      author: author.trim(),
      location: location.trim() || (lang === 'ar' ? 'تونس' : 'Tunisie'),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verifiedPurchase,
      tags: [selectedTag],
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setAuthor('');
      setLocation('');
      setTitle('');
      setComment('');
      setError('');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-sky-50/70">
          <div>
            <h3 className="font-serif text-lg text-stone-900">{t.writeModal.title}</h3>
            <p className="text-xs text-stone-500">{t.writeModal.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl text-stone-900">{t.writeModal.successTitle}</h4>
            <p className="text-xs text-stone-600">
              {t.writeModal.successText}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                {error}
              </div>
            )}

            {/* Select Product */}
            <div>
              <label className="block font-medium text-stone-800 mb-1">
                {t.writeModal.productLabel} <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81] cursor-pointer"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price} DT)
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating Picker */}
            <div>
              <label className="block font-medium text-stone-800 mb-1.5">
                {t.writeModal.ratingLabel} <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentRating = hoverRating || rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star}`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= currentRating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-medium text-stone-600 pl-2">
                  {ratingDescriptions[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Name & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  {t.writeModal.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ex: Youssef Mansour"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
                />
              </div>
              <div>
                <label className="block font-medium text-stone-800 mb-1">
                  {t.writeModal.cityLabel}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="ex: La Marsa, Tunis"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium text-stone-800 mb-1">
                {t.writeModal.titleLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Les couleurs sont magnifiques et le joint ne tache pas"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block font-medium text-stone-800 mb-1">
                {t.writeModal.commentLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Décrivez la qualité de la faïence, la solidité du piètement, la livraison..."
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0F4C81] resize-none"
              />
            </div>

            {/* Tag Selection */}
            <div>
              <label className="block font-medium text-stone-800 mb-1.5">
                {t.writeModal.tagLabel}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#0F4C81] text-white font-medium'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedPurchase}
                  onChange={(e) => setVerifiedPurchase(e.target.checked)}
                  className="rounded border-stone-300 text-[#0F4C81] focus:ring-[#0F4C81] h-3.5 w-3.5 cursor-pointer"
                />
                <span>{t.writeModal.verifiedCheckbox}</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {t.writeModal.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3c66] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
              >
                {t.writeModal.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
