import React, { useState } from 'react';
import { BlogPost, BlogComment } from '../types';
import { X, Clock, Calendar, User, MessageSquare, Send } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onAddComment: (postId: string, comment: Omit<BlogComment, 'id' | 'date'>) => void;
  lang: Language;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  post,
  onClose,
  onAddComment,
  lang,
}) => {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  if (!post) return null;
  const t = TRANSLATIONS[lang];
  const b = t.blog;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) return;

    onAddComment(post.id, {
      author: commentAuthor.trim(),
      comment: commentText.trim(),
    });

    setCommentAuthor('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => {
      setCommentSubmitted(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2 text-xs text-[#0F4C81] uppercase tracking-wider font-semibold">
            <span>{b.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{post.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label={b.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 space-y-6">
          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {post.publishDate}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden flex items-center justify-center border border-stone-300">
                <User className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">{post.author.name}</p>
                <p className="text-xs text-stone-500">{post.author.role}</p>
              </div>
            </div>
          </div>

          {/* Article Cover Image */}
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Pull Quote if available */}
          {post.quote && (
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 my-6">
              <blockquote className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                "{post.quote.text}"
              </blockquote>
              <cite className="block text-xs font-sans text-stone-500 mt-2 not-italic">
                — {post.quote.attribution}
              </cite>
            </div>
          )}

          {/* Article Prose Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
            {post.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Article Tags */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-700">{b.topics}</span>
            {post.tags.map((t) => (
              <span key={t} className="text-[#0F4C81] italic">
                #{t}
              </span>
            ))}
          </div>

          {/* Reader Discussion / Comments Section */}
          <div className="pt-8 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-stone-700" />
                <span>{b.commentsTitle} ({post.comments.length})</span>
              </h3>
            </div>

            {/* Leave a Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
              <span className="font-medium text-stone-900 block">{b.leaveComment}</span>

              {commentSubmitted && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-md text-xs">
                  {b.commentSuccess}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder={b.namePlaceholder}
                  required
                  className="p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={b.commentPlaceholder}
                required
                rows={3}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{b.postComment}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            {post.comments.length === 0 ? (
              <p className="text-xs text-stone-500 italic py-3">
                {b.noComments}
              </p>
            ) : (
              <div className="space-y-3">
                {post.comments.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">{c.author}</span>
                      <span className="text-stone-400 text-[11px]">{c.date}</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">{c.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
