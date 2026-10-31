import React from 'react';
import { X, Clock, Calendar, CheckCircle, ArrowRight, Share2 } from 'lucide-react';
import { InsightArticle } from '../types';

interface ArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onConsultArchitect: (topic: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onConsultArchitect
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0D111C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Bar with Category & Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-[#121824]">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center font-bold text-xs text-slate-950">
                {article.author.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{article.author.name}</div>
                <div className="text-xs text-slate-400">{article.author.role}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Abstract / Summary */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed italic">
            "{article.summary}"
          </div>

          {/* Main Article Paragraphs */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Architectural Key Takeaways Box */}
          <div className="p-5 rounded-xl bg-[#121824] border border-emerald-500/30 space-y-3">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider">
              ARCHITECTURAL INVARIANTS & IMPLEMENTATION TAKEAWAYS
            </div>
            <div className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-400 hover:text-white"
            >
              Back to Insights
            </button>
            <button
              onClick={() => {
                onClose();
                onConsultArchitect(article.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Consult an Architect on this Topic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
