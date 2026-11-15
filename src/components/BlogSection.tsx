import React, { useState } from 'react';
import { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  lang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost, lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const t = TRANSLATIONS[lang];
  const b = t.blog;

  const categories = [
    { id: 'All', label: b.all },
    { id: 'Behind the Craft', label: lang === 'ar' ? 'أسرار الصنعة' : 'Secrets d’Atelier' },
    { id: 'Studio Journal', label: lang === 'ar' ? 'تصميم وألوان' : 'Couleurs & Design' },
  ];

  const filteredPosts = posts.filter(
    (post) => activeCategory === 'All' || post.category === activeCategory
  );

  return (
    <section id="journal-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#0F4C81] mb-2">
            05 / {b.kicker}
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#141413] tracking-[-0.02em]">
            {b.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-xl">
            {b.description}
          </p>
        </div>

        {/* Crisp Architectural Category Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#141413] text-white border-[#141413]'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-[#141413]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group flex flex-col bg-white border border-stone-200 overflow-hidden hover:border-[#141413] transition-colors duration-200 cursor-pointer"
          >
            {/* Unobstructed Cover Photography */}
            <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden border-b border-stone-200">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-2">
                  <span className="text-[#141413] font-semibold">N° 0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-semibold text-[#141413] group-hover:text-[#0F4C81] transition-colors line-clamp-2 leading-snug tracking-[-0.01em]">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono text-[11px]">
                  {b.by} {post.author.name}
                </span>
                <span className="text-[#141413] group-hover:text-[#0F4C81] font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                  <span>{b.readNote}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
