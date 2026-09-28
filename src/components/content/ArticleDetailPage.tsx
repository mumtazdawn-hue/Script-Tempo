import React from 'react';
import { Article } from '../../types/content';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { SITE_URL } from '../../config/seo';
import { CheckCircle2, Table, ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { CreatorToolkitSection } from '../monetization/CreatorToolkitSection';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigate,
}) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Script Tempo',
      url: SITE_URL,
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        ogType="article"
        schema={articleSchema}
      />

      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Guides', path: '/blog' },
            { label: article.category, path: '/blog' },
            { label: article.title },
          ]}
          onNavigate={onNavigate}
        />
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Guides</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-indigo-600">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>By {article.author.name}</span>
          <span aria-hidden="true">·</span>
          <span>Updated {article.updatedDate}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{article.readTimeMinutes} min read</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
          {article.title}
        </h1>
      </header>

      {/* People-First Direct Answer Block */}
      <section className="rounded-xl border border-indigo-100 bg-indigo-50/70 p-6 space-y-3" aria-label="Direct Answer Summary">
        <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
          Direct Answer & Recommendation
        </div>
        <p className="text-sm text-indigo-950 font-medium leading-relaxed">
          {article.summaryAnswer}
        </p>
      </section>

      {/* Key Takeaways */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3" aria-label="Key Takeaways">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Key Takeaways
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          {article.keyTakeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick Reference Table (if present) */}
      {article.quickReferenceTable && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs" aria-label="Pacing Data Table">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <h2 className="text-sm font-bold text-slate-900">
              Quick Reference Pacing Chart
            </h2>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-semibold">
                  {article.quickReferenceTable.headers.map((h, i) => (
                    <th key={i} className="py-2.5 px-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {article.quickReferenceTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-2 px-3 ${
                          cIdx === 0 ? 'font-semibold text-slate-900' : 'tabular-nums text-slate-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Detailed Body HTML */}
      <section
        className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base space-y-4"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Embedded Calculator Call to Action */}
      <section className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4" aria-hidden="true" />
          <span>Interactive Tool</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Calculate Your Script Timing Right Now
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Test your own script or word count in our full calculation engine. Accounts for custom speaking speeds, pause percentages, and scene cut intervals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {article.relatedCalculators.map((calc) => (
            <button
              key={calc.path}
              onClick={() => onNavigate(calc.path)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-xs transition-colors"
            >
              Open {calc.title} →
            </button>
          ))}
        </div>
      </section>

      {/* Author Bio */}
      <footer className="rounded-xl border border-slate-200 bg-white p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
          {article.author.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-bold text-slate-900">{article.author.name}</div>
          <div className="text-xs text-slate-500">{article.author.role}</div>
          <p className="text-xs text-slate-600 pt-1">
            Specializing in speech pacing benchmarks, teleprompter workflows, and video retention architecture.
          </p>
        </div>
      </footer>

      {/* Curated Toolkit */}
      <CreatorToolkitSection onNavigate={onNavigate} />
    </article>
  );
};
