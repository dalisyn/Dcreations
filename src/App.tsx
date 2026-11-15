import React, { useState, useEffect } from 'react';
import { Product, Review, BlogPost, CartItem, PlacedOrder, BlogComment, PreOrderCustomization } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_BLOG_POSTS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { SculpturalExpertiseSection } from './components/SculpturalExpertiseSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReviewsSection } from './components/ReviewsSection';
import { WriteReviewModal } from './components/WriteReviewModal';
import { BlogSection } from './components/BlogSection';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { InteractiveTileFrieze } from './components/InteractiveTileFrieze';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CompareTray } from './components/CompareTray';
import { CompareModal } from './components/CompareModal';
import { TILE_TEXTURE_URL } from './components/InteractiveTileBackground';
import { Language, TRANSLATIONS } from './data/translations';
import { Check } from 'lucide-react';

export default function App() {
  // Language state (French default with Arabic toggle)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('dcreations_lang');
    return saved === 'ar' || saved === 'fr' ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('dcreations_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);
  // LocalStorage-backed state with v6 migration for organic bouclé floor mirror article
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dcreations_tables_v6');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id?.startsWith('prod-table-')) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('dcreations_reviews_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_REVIEWS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('dcreations_posts_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_BLOG_POSTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dcreations_cart_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {}
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('dcreations_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('dcreations_compare_ids');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 4);
      } catch (e) {}
    }
    return [];
  });

  // Navigation and Modals state
  const [activeTab, setActiveTab] = useState<'shop' | 'expertise' | 'reviews' | 'journal' | 'about'>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewTargetProduct, setReviewTargetProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('dcreations_tables_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dcreations_reviews_v4', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('dcreations_posts_v7', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('dcreations_cart_v3', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dcreations_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dcreations_compare_ids', JSON.stringify(compareIds));
  }, [compareIds]);

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Pre-Order Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    customization?: PreOrderCustomization
  ) => {
    const defaultVariation = product.colorVariations?.[0];
    const finalCustomization: PreOrderCustomization = customization || {
      tileColor: defaultVariation
        ? `${defaultVariation.nameFr} / ${defaultVariation.nameAr}`
        : product.colorSwatches?.[0]?.name,
      groutColor: product.customizationOptions?.groutColors?.[0]?.name || 'Blanc Craie Épuré / أبيض ناصع',
      frameFinish:
        product.customizationOptions?.frameFinishes?.[0]?.name ||
        'Coupe Onglet 45° + Patins Feutre / قص 45° + وسائد حماية',
      paymentType: 'deposit',
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.customization?.tileColor === finalCustomization.tileColor &&
          item.customization?.groutColor === finalCustomization.groutColor &&
          item.customization?.frameFinish === finalCustomization.frameFinish &&
          item.customization?.paymentType === finalCustomization.paymentType
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, customization: finalCustomization }];
    });
    showToast(
      lang === 'ar'
        ? `تمت إضافة ${quantity} × ${product.name} إلى قائمة الحجز`
        : `Précommande pour ${quantity} × ${product.name} ajoutée au panier`
    );
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast(lang === 'ar' ? 'تم حذف العنصر من قائمة الحجز' : 'Article retiré du panier');
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isBookmarked = prev.includes(productId);
      const targetProduct = products.find((p) => p.id === productId);
      const productName = targetProduct ? targetProduct.name : '';

      if (isBookmarked) {
        showToast(
          lang === 'ar'
            ? `تم حذف ${productName} من قائمة المفضلة`
            : `${productName} retirée de vos coups de cœur`
        );
        return prev.filter((id) => id !== productId);
      } else {
        showToast(
          lang === 'ar'
            ? `تمت إضافة ${productName} إلى قائمة المفضلة ❤️`
            : `${productName} ajoutée à vos coups de cœur ❤️`
        );
        return [...prev, productId];
      }
    });
  };

  // Compare operations (up to 4 products)
  const handleToggleCompare = (productId: string) => {
    const tCompare = TRANSLATIONS[lang].compare;
    const targetProduct = products.find((p) => p.id === productId);
    const productName = targetProduct ? targetProduct.name : '';

    if (compareIds.includes(productId)) {
      setCompareIds((prev) => prev.filter((id) => id !== productId));
      showToast(`${productName} ${tCompare.removedToast}`);
      return;
    }

    if (compareIds.length >= 4) {
      showToast(tCompare.maxReachedToast);
      return;
    }

    setCompareIds((prev) => [...prev, productId]);
    showToast(`${productName} ${tCompare.addedToast}`);
  };

  const handleAddToCompare = (productId: string) => {
    const tCompare = TRANSLATIONS[lang].compare;
    if (compareIds.includes(productId)) return;
    if (compareIds.length >= 4) {
      showToast(tCompare.maxReachedToast);
      return;
    }
    setCompareIds((prev) => [...prev, productId]);
  };

  const handleClearCompare = () => {
    setCompareIds([]);
  };

  // Review operations
  const handleOpenWriteReview = (product?: Product) => {
    setReviewTargetProduct(product || null);
    setIsWriteReviewOpen(true);
  };

  const handleSubmitReview = (
    newRevData: Omit<Review, 'id' | 'date' | 'helpfulCount'>
  ) => {
    const newReview: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: lang === 'ar' ? 'الآن' : 'À l’instant',
      helpfulCount: 0,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Recalculate rating & review count for the product
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === newRevData.productId) {
          const prodReviews = updatedReviews.filter((r) => r.productId === p.id);
          const newAvg =
            prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
          return {
            ...p,
            rating: Number(newAvg.toFixed(1)),
            reviewCount: prodReviews.length,
          };
        }
        return p;
      })
    );

    showToast(
      lang === 'ar'
        ? 'شكراً لك! تم التحقق من تقييمك ونشره بنجاح.'
        : 'Votre avis a été vérifié et publié !'
    );
  };

  const handleVoteHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast(lang === 'ar' ? 'شكراً على تقييمكم الإيجابي' : 'Merci pour votre retour');
  };

  // Blog operations
  const handleAddBlogComment = (
    postId: string,
    commentData: Omit<BlogComment, 'id' | 'date'>
  ) => {
    const newComment: BlogComment = {
      ...commentData,
      id: `c-${Date.now()}`,
      date: lang === 'ar' ? 'الآن' : 'À l’instant',
    };

    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    // If modal is currently viewing this post, update it in place
    if (selectedBlogPost && selectedBlogPost.id === postId) {
      setSelectedBlogPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
    }

    showToast(
      lang === 'ar'
        ? 'تم نشر تعليقك في مدونة الورشة'
        : 'Votre commentaire a été publié dans le journal d’atelier'
    );
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setCart([]);
    showToast(
      lang === 'ar'
        ? `تم تسجيل طلبكم رقم #${order.orderId} بنجاح!`
        : `Commande #${order.orderId} confirmée avec succès !`
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const comparedProducts = compareIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative min-h-screen bg-[#FAFAF8] text-[#141413] flex flex-col selection:bg-[#141413] selection:text-white"
    >
      {/* Subtle Ambient Mediterranean Ceramic Texture across the entire site */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.032] z-0"
        style={{
          backgroundImage: `url("${TILE_TEXTURE_URL}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '360px auto',
        }}
        aria-hidden="true"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-20 sm:bottom-24 z-50 max-w-[calc(100vw-2rem)] bg-stone-900 text-stone-100 text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            lang === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation obeying Top Bar Contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateSection={scrollToSection}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      {/* Main Page Layout */}
      <main className="flex-1 relative z-10">
        {/* Campaign Hero Showcase with Animated Interactive Ceramic Background */}
        <Hero
          onExploreClick={() => scrollToSection('shop-section')}
          onJournalClick={() => scrollToSection('journal-section')}
          lang={lang}
        />

        {/* E-Commerce Provisions Storefront */}
        <ProductCatalog
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onViewProductReviews={(product) => {
            setSelectedProduct(product);
          }}
          lang={lang}
          wishlistProductIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          compareProductIds={compareIds}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareOpen(true)}
        />

        {/* Interactive Mediterranean Ceramic Tile Frieze Transition */}
        <InteractiveTileFrieze lang={lang} />

        {/* Second Workshop Expertise: Sculptural Organic Micro-Cement & Mineral Tables */}
        <SculpturalExpertiseSection
          organicProducts={products.filter((p) => p.category === 'organic')}
          onSelectProduct={(product) => setSelectedProduct(product)}
          wishlistProductIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
          compareProductIds={compareIds}
          onToggleCompare={handleToggleCompare}
          lang={lang}
        />

        {/* Customer Impressions & Product Reviews Hub */}
        <ReviewsSection
          reviews={reviews}
          products={products}
          onOpenWriteReview={handleOpenWriteReview}
          onVoteHelpful={handleVoteHelpful}
          lang={lang}
        />

        {/* Studio Journal & Company Updates Blog */}
        <BlogSection
          posts={blogPosts}
          onSelectPost={(post) => setSelectedBlogPost(post)}
          lang={lang}
        />

        {/* About Our Little Business Story */}
        <AboutSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} lang={lang} />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        reviews={reviews}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenWriteReview={(p) => {
          setSelectedProduct(null);
          handleOpenWriteReview(p);
        }}
        lang={lang}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        isCompared={selectedProduct ? compareIds.includes(selectedProduct.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Write a Customer Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        products={products}
        initialProduct={reviewTargetProduct}
        onSubmitReview={handleSubmitReview}
        lang={lang}
      />

      {/* Article Reader Modal */}
      <ArticleReaderModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
        onAddComment={handleAddBlogComment}
        lang={lang}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        lang={lang}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProductIds={wishlist}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        lang={lang}
      />

      {/* Seamless Studio Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
        lang={lang}
      />

      {/* Side-by-Side Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        selectedProducts={comparedProducts}
        allProducts={products}
        onAddProduct={handleAddToCompare}
        onRemoveProduct={(id) => setCompareIds((prev) => prev.filter((itemId) => itemId !== id))}
        onClearAll={handleClearCompare}
        onConfigureProduct={(p) => setSelectedProduct(p)}
        lang={lang}
      />

      {/* Floating Compare Tray (opposite WhatsAppButton) */}
      <CompareTray
        selectedProducts={comparedProducts}
        onRemove={(id) => setCompareIds((prev) => prev.filter((itemId) => itemId !== id))}
        onClear={handleClearCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
        lang={lang}
      />

      {/* Floating WhatsApp Direct Inquiry Button */}
      <WhatsAppButton lang={lang} />
    </div>
  );
}
