import React, { useState, useMemo } from 'react';
import { Review, Product } from '../types';
import { Star, ThumbsUp, ShieldCheck, PenSquare, Filter, ArrowUpDown } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ReviewsSectionProps {
  reviews: Review[];
  products: Product[];
  onOpenWriteReview: (product?: Product) => void;
  onVoteHelpful: (reviewId: string) => void;
  lang: Language;
}

type RatingFilter = 'all' | '5' | '4' | '3' | '2' | '1';
type SortFilter = 'helpful' | 'recent' | 'highest' | 'lowest';

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  products,
  onOpenWriteReview,
  onVoteHelpful,
  lang,
}) => {
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('all');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<RatingFilter>('all');
  const [sortBy, setSortBy] = useState<SortFilter>('helpful');
  const [helpfulVotedIds, setHelpfulVotedIds] = useState<Set<string>>(new Set());

  const t = TRANSLATIONS[lang];

  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { average: 5, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
      if (breakdown[rounded] !== undefined) {
        breakdown[rounded]++;
      }
    });

    return {
      average,
      total,
      breakdown,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        const matchesProduct =
          selectedProductFilter === 'all' || r.productId === selectedProductFilter;
        const matchesRating =
          selectedRatingFilter === 'all' || Math.round(r.rating) === parseInt(selectedRatingFilter, 10);
        return matchesProduct && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
        if (sortBy === 'highest') return b.rating - a.rating;
        if (sortBy === 'lowest') return a.rating - b.rating;
        return 0;
      });
  }, [reviews, selectedProductFilter, selectedRatingFilter, sortBy]);

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulVotedIds.has(reviewId)) return;
    setHelpfulVotedIds(new Set([...helpfulVotedIds, reviewId]));
    onVoteHelpful(reviewId);
  };

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-[#F4F3EF] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Architectural Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#0F4C81] mb-2">
              04 / {t.reviews.kicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#141413] tracking-[-0.02em]">
              {t.reviews.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
              {t.reviews.description}
            </p>
          </div>

          <button
            onClick={() => onOpenWriteReview()}
            className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>{t.reviews.writeButton}</span>
          </button>
        </div>

        {/* Rating Breakdown & Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-10 border border-stone-200 bg-white">
          <div className="md:col-span-4 p-5 sm:p-7 border-b md:border-b-0 md:border-e border-stone-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
                {t.reviews.satisfaction}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-semibold text-[#141413] font-mono tabular-nums">
                  {stats.average.toFixed(1)}
                </span>
                <span className="text-stone-400 text-sm font-mono">{t.reviews.outOf5}</span>
              </div>

              <div className="flex items-center gap-1 my-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(stats.average)
                        ? 'fill-amber-500 text-amber-500'
                        : i < stats.average
                        ? 'fill-amber-300 text-amber-400'
                        : 'text-stone-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-stone-600">{t.reviews.basedOn}</p>
            </div>

            <div className="pt-4 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.reviews.recommendation}</span>
            </div>
          </div>

          <div className="md:col-span-8 p-7">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
              {t.reviews.distribution}
            </div>

            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.breakdown[stars as 1 | 2 | 3 | 4 | 5] || 0;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                const isSelected = selectedRatingFilter === String(stars);

                return (
                  <button
                    key={stars}
                    onClick={() =>
                      setSelectedRatingFilter((prev) =>
                        prev === String(stars) ? 'all' : (String(stars) as RatingFilter)
                      )
                    }
                    className={`w-full flex items-center gap-3 text-xs cursor-pointer p-1.5 transition-colors ${
                      isSelected ? 'bg-stone-100' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1 w-12 shrink-0 text-[#141413] font-mono tabular-nums font-medium">
                      <span>{stars}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    </div>

                    <div className="flex-1 h-2 bg-stone-100 overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-[#141413] transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="w-16 text-right text-stone-500 font-mono tabular-nums shrink-0">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-8 p-4 bg-white border border-stone-200 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 text-stone-600 shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#0F4C81]" />
              <span>{t.reviews.filterLabel}</span>
            </div>
            <select
              value={selectedProductFilter}
              onChange={(e) => setSelectedProductFilter(e.target.value)}
              className="w-full sm:w-auto max-w-full bg-[#FAFAF8] border border-stone-300 text-[#141413] px-3 py-1.5 focus:outline-none focus:border-[#141413] cursor-pointer"
            >
              <option value="all">
                {t.reviews.allOption} ({reviews.length})
              </option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-stone-600 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortFilter)}
              className="flex-1 sm:flex-initial bg-[#FAFAF8] border border-stone-300 text-[#141413] px-3 py-1.5 focus:outline-none focus:border-[#141413] cursor-pointer"
            >
              <option value="helpful">Plus Utiles / الأكثر فائدة</option>
              <option value="recent">Plus Récents / الأحدث</option>
              <option value="highest">Mieux Notés / الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => {
            const hasVoted = helpfulVotedIds.has(rev.id);

            return (
              <div
                key={rev.id}
                className="bg-white p-6 border border-stone-200 flex flex-col justify-between space-y-4 hover:border-[#141413] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#141413]">{rev.author}</span>
                      {rev.location && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="text-[#0F4C81] font-mono text-[11px]">{rev.location}</span>
                        </>
                      )}
                      {rev.verifiedPurchase && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="text-[11px] text-emerald-800 font-medium inline-flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {t.reviews.verifiedBuyer}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-stone-400 font-mono text-[11px] shrink-0">{rev.date}</span>
                  </div>

                  <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mb-3">
                    {rev.productName}
                  </div>

                  <div className="flex items-center gap-1 mb-2.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>

                  <h4 className="text-base font-semibold text-[#141413] leading-snug mb-2">
                    {rev.title}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-stone-500">
                    {rev.tags && rev.tags.length > 0 ? rev.tags.join(' · ') : ''}
                  </div>

                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    disabled={hasVoted}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      hasVoted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400 hover:text-[#141413]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                    <span className="font-mono tabular-nums">
                      {t.reviews.helpful} ({rev.helpfulCount + (hasVoted ? 1 : 0)})
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
