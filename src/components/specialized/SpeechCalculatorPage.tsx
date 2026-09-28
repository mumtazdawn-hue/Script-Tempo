import React from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { MessageSquare, Award, Clock } from 'lucide-react';

interface SpeechCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const SpeechCalculatorPage: React.FC<SpeechCalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      <MainCalculatorPage
        initialPlatform="speech"
        path="/speech-calculator"
        onNavigate={onNavigate}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200 pt-10">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Public Speaking Benchmarks
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Speech & Keynote Time Limits: Word Counts That Never Run Over
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            When you stand on a stage, adrenaline naturally accelerates speech while room acoustics slow comprehension. Calibrate your speech script with deliberate rhetorical pauses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase">3-Minute Toast</div>
            <div className="text-xl font-extrabold text-slate-900 tabular-nums">330 – 380 words</div>
            <p className="text-xs text-slate-600">
              Wedding toasts, brief introductions, or opening remarks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase">5-Minute Address</div>
            <div className="text-xl font-extrabold text-slate-900 tabular-nums">550 – 620 words</div>
            <p className="text-xs text-slate-600">
              Commencement speeches, lightning conference talks, or award acceptances.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase">10-Minute Keynote</div>
            <div className="text-xl font-extrabold text-slate-900 tabular-nums">1,100 – 1,250 words</div>
            <p className="text-xs text-slate-600">
              TED-style presentations, investor pitch finals, or executive updates.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <div className="text-xs font-bold text-slate-500 uppercase">20-Minute Keynote</div>
            <div className="text-xl font-extrabold text-slate-900 tabular-nums">2,200 – 2,450 words</div>
            <p className="text-xs text-slate-600">
              Mainstage conference keynote address with audience engagement and slides.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>The Orator's Golden Rule</span>
          </div>
          <p className="leading-relaxed">
            Aim to speak at <strong>115 to 125 words per minute</strong>. Always leave at least 15% to 20% of your allocated time for audience applause, laughter, or microphone pauses. Finishing 45 seconds early leaves an audience wanting more; running 2 minutes late disrupts entire conference schedules.
          </p>
        </div>
      </section>
    </div>
  );
};
