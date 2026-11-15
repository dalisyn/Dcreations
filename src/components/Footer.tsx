import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = TRANSLATIONS[lang];
  const f = t.footer;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2500);
  };

  return (
    <footer className="bg-[#141413] text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <BrandLogo variant="dark" size="lg" />
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              {f.brandDesc}
            </p>
            <div className="text-stone-400 text-[11px] font-mono space-y-1.5 pt-2">
              <p className="text-stone-200">{f.workshopAddress}</p>
              <p>{f.workshopHours}</p>
              <p className="text-white pt-0.5">
                {lang === 'ar' ? 'واتساب / الهاتف : ' : 'WhatsApp / Tél : '}
                <a
                  href="tel:+21623559559"
                  dir="ltr"
                  className="underline decoration-stone-600 underline-offset-4 hover:decoration-white transition-colors tabular-nums"
                >
                  +216 23 559 559
                </a>
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] block">
              {f.tablesCol}
            </span>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('shop-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.coffee}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.dining}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.cube}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.bistro}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('expertise-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.organic}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.catalog.categories.mirrors}
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] block">
              {f.aboutCol}
            </span>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('reviews-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.journal}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about-section')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <span className="text-stone-500">
                  {lang === 'ar' ? 'تصاميم مخصصة للمهندسين' : 'Prescriptions Architectes'}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-stone-400 uppercase tracking-wider text-[11px] block">
              {f.newsletterTitle}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              {f.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.newsletterPlaceholder}
                  required
                  className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white text-[#141413] font-medium hover:bg-stone-200 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Subscribe to workshop newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-700" /> : <ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">
                  {f.subscribed}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Quiet Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px] font-mono">
          <p>© {new Date().getFullYear()} D | Creations. {f.copyright}</p>
          <div className="flex items-center gap-4">
            <span>{f.tag1}</span>
            <span aria-hidden="true">·</span>
            <span>{f.tag2}</span>
            <span aria-hidden="true">·</span>
            <span>{f.tag3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
