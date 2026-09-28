import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { ARTICLES } from '../../content/articles';
import { Map, ArrowRight } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const tools = [
    { path: '/calculator', title: 'Script Tempo Production Calculator', desc: 'Universal multi-format calculator' },
    { path: '/youtube-word-counter', title: 'YouTube Word Counter & Duration Calculator', desc: '5, 10, 15 min script calculations' },
    { path: '/youtube-duration-calculator', title: 'YouTube Duration & Retention Pacing Calculator', desc: 'Scene cuts & mid-roll ads' },
    { path: '/podcast-calculator', title: 'Podcast Episode Script Duration Calculator', desc: 'Conversational audio pacing' },
    { path: '/speech-calculator', title: 'Speech Duration & Word Count Calculator', desc: 'Keynotes, toasts & speeches' },
    { path: '/voice-over-calculator', title: 'Voice-Over Timing & Word Count Calculator', desc: '15s, 30s, 60s commercial spots' },
    { path: '/short-form-calculator', title: 'Short-Form Video Script Calculator', desc: 'TikTok, Reels, & Shorts' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="HTML Sitemap & Tool Directory | Script Tempo"
        description="Comprehensive index of all interactive script duration calculators, production metrics tools, and creator research guides."
        canonicalPath="/sitemap"
      />

      <Breadcrumbs items={[{ label: 'Sitemap' }]} onNavigate={onNavigate} />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Platform Sitemap & Tool Index
        </h1>
        <p className="text-sm text-slate-600">
          Quickly access all calculators, field guides, and documentation across our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tools Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
            Calculators & Production Tools
          </h2>
          <ul className="space-y-3">
            {tools.map((tool) => (
              <li key={tool.path}>
                <button
                  onClick={() => onNavigate(tool.path)}
                  className="text-left group block hover:text-indigo-600 transition-colors"
                >
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <span>{tool.title}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-slate-500">{tool.desc}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Guides Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
            Production Guides & Research
          </h2>
          <ul className="space-y-3">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <button
                  onClick={() => onNavigate(`/blog/${article.slug}`)}
                  className="text-left group block hover:text-indigo-600 transition-colors"
                >
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <span>{article.title}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-slate-500">
                    {article.category} · {article.readTimeMinutes} min read
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 pt-4">
            Platform & Legal
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <button onClick={() => onNavigate('/how-it-works')} className="hover:text-indigo-600">
                How It Works & Mathematical Formulas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/toolkit')} className="hover:text-indigo-600">
                Recommended Creator Gear Toolkit
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/privacy')} className="hover:text-indigo-600">
                Privacy Policy (Zero-Data-Storage Guarantee)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/terms')} className="hover:text-indigo-600">
                Terms of Service
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
