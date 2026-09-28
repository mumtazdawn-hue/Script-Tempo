import React from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { Mic, Headphones, Volume2 } from 'lucide-react';

interface PodcastCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const PodcastCalculatorPage: React.FC<PodcastCalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      <MainCalculatorPage
        initialPlatform="podcast"
        path="/podcast-calculator"
        onNavigate={onNavigate}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200 pt-10">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Audio Production Standards
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Podcast Episode Scripting & Conversational Pacing
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Why podcast listeners require breathing room, and how to calibrate solo scripts versus conversational interview outlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">10–15 Min Solo Show</div>
            <h3 className="text-sm font-bold text-slate-900">~1,200 – 1,800 words</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal for daily news recaps, solo industry analyses, or quick coaching episodes. Includes 30s intro stinger and 30s outro.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">30 Min Feature Episode</div>
            <h3 className="text-sm font-bold text-slate-900">~3,600 – 4,100 words</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The sweet spot for narrative storytelling, deep-dive historical retrospectives, or detailed solo case studies.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-indigo-600 uppercase">45–60 Min Deep Dive</div>
            <h3 className="text-sm font-bold text-slate-900">Outline: 1,200 – 1,600 words</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Long-form interviews rarely use word-for-word scripts. Prepare structured segment goals, key inquiry prompts, and sponsor read blocks.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 space-y-2">
          <div className="font-bold text-sm text-indigo-900 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-700" aria-hidden="true" />
            <span>The Auditory Processing Rule</span>
          </div>
          <p className="leading-relaxed">
            Unlike video viewers who can re-read subtitles, podcast listeners rely 100% on acoustic comprehension while multitasking (driving, running, cooking). Aim for <strong>135 to 145 WPM</strong> and allow generous 14% to 18% pauses after profound statements.
          </p>
        </div>
      </section>
    </div>
  );
};
