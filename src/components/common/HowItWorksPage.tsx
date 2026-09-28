import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { FormulaExplainer } from '../calculator/FormulaExplainer';
import { CheckCircle, ShieldCheck, Cpu } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="How This Calculator Works | Formulas, Speech Science & Assumptions"
        description="Comprehensive mathematical and empirical breakdown of our script duration, pause buffer, scene breakdown, and B-roll algorithms."
        canonicalPath="/how-it-works"
      />

      <Breadcrumbs
        items={[{ label: 'Documentation', path: '/how-it-works' }, { label: 'How It Works' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-2">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          Architecture & Transparency
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
          Formulas, Empirical Speech Science & Production Assumptions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          We believe creator utilities must be 100% transparent. No black-box approximations, artificial inflation, or hidden guesswork.
        </p>
      </div>

      <FormulaExplainer />

      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          The Science of Words Per Minute (WPM)
        </h2>
        <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            In linguistic research, conversational speech across adult English speakers averages <strong>140 to 160 WPM</strong>. However, public broadcast mediums introduce distinct acoustic and psychological constraints:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>Audio-Only (130–145 WPM):</strong> Listeners cannot rely on facial cues or text subtitles. Slower pacing increases comprehension and reduces auditory fatigue.</li>
            <li><strong>YouTube Video Essays (150–165 WPM):</strong> B-roll and graphics keep attention high. A standard 155 WPM pace prevents viewers from skipping ahead.</li>
            <li><strong>Short-Form Vertical (175–195 WPM):</strong> Rapid information delivery combined with visual jump cuts maximize algorithm completion rates.</li>
            <li><strong>Keynote Speeches (115–125 WPM):</strong> Auditorium reverberation and audience applause require measured restraint.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          <span>Client-Side Privacy Architecture</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          All calculations are executed directly inside your local web browser engine using high-performance JavaScript algorithms. Your scripts, proprietary outlines, and corporate presentations are never sent to external servers or stored in any database.
        </p>
      </section>
    </div>
  );
};
