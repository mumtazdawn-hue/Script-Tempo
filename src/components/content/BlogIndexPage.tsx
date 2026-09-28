import React, { useState } from 'react';
import { ARTICLES } from '../../content/articles';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { SEO_ROUTES } from '../../config/seo';
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react';

interface BlogIndexPageProps {
  onNavigate: (path: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'YouTube', 'Podcasting', 'Speech & Keynotes', 'Video Production'];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summaryAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const seo = SEO_ROUTES['/blog'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={seo.title}
        description={seo.metaDescription}
        canonicalPath="/blog"
      />

      <Breadcrumbs
        items={[{ label: 'Guides & Research' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-2">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          Creator Research & Field Guides
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
          {seo.heading}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {seo.subheading}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-100/80 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            onClick={() => onNavigate(`/blog/${article.slug}`)}
            className="cursor-pointer group rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Unboxed clean metadata (zero pills) */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-indigo-600">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{article.readTimeMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.summaryAnswer}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
