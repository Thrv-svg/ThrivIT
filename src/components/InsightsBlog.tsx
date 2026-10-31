import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { INSIGHT_ARTICLES } from '../data/mockData';
import { InsightArticle } from '../types';
import { ArticleModal } from './ArticleModal';

interface InsightsBlogProps {
  onConsultTopic: (topic: string) => void;
}

export const InsightsBlog: React.FC<InsightsBlogProps> = ({ onConsultTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const categories = ['All', 'Systems Architecture', 'Data Intelligence', 'Scaling Strategy', 'Security & DevSecOps'];

  const filteredArticles = INSIGHT_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="insights" className="py-24 border-b border-slate-800/80 bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">
            SYSTEMS INTELLIGENCE & ENGINEERING RESEARCH
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Field notes from the front lines of enterprise scale.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Architectural patterns, fault tolerance protocols, and data streaming strategies authored by ThrivIT principal engineers.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#121824] border border-slate-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture patterns..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#121824] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="p-6 sm:p-8 bg-[#121824] border border-slate-800/80 rounded-2xl hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Zero-Pill Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {article.readTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-emerald-400">
                    {article.author.initials}
                  </div>
                  <span className="text-xs text-slate-300 font-medium">
                    {article.author.name}
                  </span>
                </div>

                <span className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                  <span>Read Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 p-8 rounded-2xl border border-slate-800 bg-[#121824] space-y-3">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-base font-semibold text-white">No articles matched your search query</div>
            <p className="text-xs text-slate-400">
              Try searching for "Kafka", "Data", "Monolith", or clear your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs text-emerald-400 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Article Detail Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onConsultArchitect={(topic) => {
          setActiveArticle(null);
          onConsultTopic(topic);
        }}
      />
    </section>
  );
};
