import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Heart } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  activeTab: 'shop' | 'expertise' | 'reviews' | 'journal' | 'about';
  setActiveTab: (tab: 'shop' | 'expertise' | 'reviews' | 'journal' | 'about') => void;
  onNavigateSection: (sectionId: string) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  activeTab,
  setActiveTab,
  onNavigateSection,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleNavClick = (tab: 'shop' | 'expertise' | 'reviews' | 'journal' | 'about', sectionId?: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        onNavigateSection(sectionId);
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
        {/* Zone 1: Architectural Brand Wordmark */}
        <button
          onClick={() => handleNavClick('shop')}
          aria-label="D Creations — Accueil"
          className="whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity text-left cursor-pointer flex items-center"
        >
          <BrandLogo variant="light" size="md" />
        </button>

        {/* Zone 2: Clean Single-Line Architectural Navigation (Desktop & iPad Landscape lg+) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[13px] font-medium text-stone-600">
          <button
            onClick={() => handleNavClick('shop', 'shop-section')}
            className={`hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b ${
              activeTab === 'shop'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'border-transparent'
            }`}
          >
            {t.nav.shop}
          </button>
          <button
            onClick={() => handleNavClick('expertise', 'expertise-section')}
            className={`hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b ${
              activeTab === 'expertise'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'border-transparent'
            }`}
          >
            {lang === 'ar' ? 'الميكرو سمنت' : 'Micro-Ciment'}
          </button>
          <button
            onClick={() => handleNavClick('reviews', 'reviews-section')}
            className={`hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b ${
              activeTab === 'reviews'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'border-transparent'
            }`}
          >
            {t.nav.reviews}
          </button>
          <button
            onClick={() => handleNavClick('journal', 'journal-section')}
            className={`hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b ${
              activeTab === 'journal'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'border-transparent'
            }`}
          >
            {t.nav.journal}
          </button>
          <button
            onClick={() => handleNavClick('about', 'about-section')}
            className={`hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer border-b ${
              activeTab === 'about'
                ? 'text-[#141413] border-[#141413] font-semibold'
                : 'border-transparent'
            }`}
          >
            {t.nav.about}
          </button>
        </nav>

        {/* Zone 3: Language Switch, Wishlist & Primary Cart Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onToggleLang(lang === 'fr' ? 'ar' : 'fr')}
            dir="ltr"
            role="switch"
            aria-checked={lang === 'ar'}
            aria-label={lang === 'fr' ? 'Passer en arabe / التبديل إلى العربية' : 'Passer en français / التبديل إلى الفرنسية'}
            title="Changer de langue / تغيير اللغة"
            className="hidden sm:inline-grid grid-cols-2 relative items-center p-0.5 w-[74px] h-[34px] border border-stone-300 bg-white hover:border-[#141413] transition-[border-color,transform] duration-200 active:scale-[0.97] cursor-pointer whitespace-nowrap shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] bg-[#141413] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                lang === 'ar' ? 'translate-x-full' : 'translate-x-0'
              }`}
            >
              <span className="absolute bottom-0 inset-x-1.5 h-[1.5px] bg-[#D4B075]" />
            </span>
            <span
              className={`relative z-10 text-center text-[11px] font-mono font-medium uppercase tracking-wider transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                lang === 'fr' ? 'text-white scale-100' : 'text-stone-500 scale-95'
              }`}
            >
              FR
            </span>
            <span
              className={`relative z-10 text-center text-[11px] font-mono font-medium uppercase tracking-wider transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                lang === 'ar' ? 'text-white scale-100' : 'text-stone-500 scale-95'
              }`}
            >
              AR
            </span>
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label={t.nav.wishlist}
            className={`relative flex items-center justify-center p-2 border transition-colors cursor-pointer shrink-0 ${
              wishlistCount > 0
                ? 'border-stone-900 bg-white text-rose-600'
                : 'border-stone-300 bg-white text-stone-600 hover:text-[#141413] hover:border-stone-900'
            }`}
            title={`${t.nav.wishlist} (${wishlistCount})`}
          >
            <Heart
              className={`w-4 h-4 ${
                wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            {wishlistCount > 0 && (
              <span className="ml-1.5 text-[11px] font-mono tabular-nums font-semibold text-[#141413]">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`View cart with ${cartCount} items`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#141413] hover:bg-[#0F4C81] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            <span className="font-mono tabular-nums text-stone-300">({cartCount})</span>
          </button>

          {/* Mobile & Tablet Menu Button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#141413] border border-stone-300 bg-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAFAF8] px-4 sm:px-6 py-5 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Langue / اللغة
            </span>
            <div dir="ltr" className="relative grid grid-cols-2 p-0.5 w-44 border border-stone-300 bg-white overflow-hidden">
              <span
                aria-hidden="true"
                className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] bg-[#141413] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  lang === 'ar' ? 'translate-x-full' : 'translate-x-0'
                }`}
              >
                <span className="absolute bottom-0 inset-x-2 h-[1.5px] bg-[#D4B075]" />
              </span>
              <button
                type="button"
                onClick={() => {
                  onToggleLang('fr');
                  setMobileMenuOpen(false);
                }}
                className={`relative z-10 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-300 ${
                  lang === 'fr' ? 'text-white' : 'text-stone-700 hover:text-[#141413]'
                }`}
              >
                Français
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleLang('ar');
                  setMobileMenuOpen(false);
                }}
                className={`relative z-10 py-1.5 text-xs font-medium cursor-pointer transition-colors duration-300 ${
                  lang === 'ar' ? 'text-white' : 'text-stone-700 hover:text-[#141413]'
                }`}
              >
                العربية
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <button
              onClick={() => handleNavClick('shop', 'shop-section')}
              className="text-left text-sm font-medium text-[#141413] py-3 border-b border-stone-200 flex items-center justify-between"
            >
              <span>{t.nav.shop}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleNavClick('expertise', 'expertise-section')}
              className="text-left text-sm font-medium text-[#141413] py-3 border-b border-stone-200 flex items-center justify-between"
            >
              <span>{lang === 'ar' ? 'خبرة الميكرو سمنت والعضوي' : 'Expertise Micro-Ciment'}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleNavClick('reviews', 'reviews-section')}
              className="text-left text-sm font-medium text-[#141413] py-3 border-b border-stone-200 flex items-center justify-between"
            >
              <span>{t.nav.reviews}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleNavClick('journal', 'journal-section')}
              className="text-left text-sm font-medium text-[#141413] py-3 border-b border-stone-200 flex items-center justify-between"
            >
              <span>{t.nav.journal}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleNavClick('about', 'about-section')}
              className="text-left text-sm font-medium text-[#141413] py-3 border-b border-stone-200 flex items-center justify-between"
            >
              <span>{t.nav.about}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 rtl:rotate-180" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWishlist();
              }}
              className="text-left text-sm font-medium text-rose-700 py-3 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{t.nav.wishlist} ({wishlistCount})</span>
              </span>
              <ArrowRight className="w-4 h-4 text-rose-400 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
