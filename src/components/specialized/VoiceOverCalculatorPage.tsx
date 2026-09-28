import React, { useState } from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { VoiceOverStudio } from '../voiceover/VoiceOverStudio';
import { Radio, Mic, Sliders, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { SEOHead } from '../layout/SEOHead';
import { SEO_ROUTES } from '../../config/seo';

interface VoiceOverCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const VoiceOverCalculatorPage: React.FC<VoiceOverCalculatorPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'studio' | 'calculator'>('studio');
  const seo = SEO_ROUTES['/voice-over-calculator'] || {
    title: 'Voice-Over Timing & Word Count Calculator | Script Tempo',
    metaDescription: 'Calculate broadcast commercial voice-over timing and generate studio AI speech audio with downloadable WAV export.',
  };

  return (
    <div className="space-y-8">
      <SEOHead
        title={seo.title}
        description={seo.metaDescription}
        canonicalPath="/voice-over-calculator"
      />

      {/* Mode Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Voice-Over Studio &amp; Timing Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Generate broadcast voice audio with native Gemini TTS and calculate commercial word pacing (:15, :30, :60).
            </p>
          </div>

          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('studio')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-4 h-4 text-indigo-600" />
              <span>Voice-Over Generator</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-indigo-100 text-indigo-700 font-bold uppercase">
                TTS
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              <span>Pacing Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Interactive TTS Voice-Over Studio */}
      {activeTab === 'studio' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <VoiceOverStudio onNavigate={onNavigate} />

          {/* Quick Guidance Benchmarks */}
          <section className="space-y-6 pt-4">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Studio Delivery Standards
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Commercial Narration &amp; Broadcast Pacing Guidelines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-indigo-600 uppercase">15-Second Commercial (:15)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">35 – 40 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Allows space for a 2-second call to action, music stinger, and legal disclaimer fadeout.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-indigo-600 uppercase">30-Second Commercial (:30)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">70 – 80 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard broadcast radio and television spot. Exceeding 80 words forces the talent to sound unnatural and rushed.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-indigo-600 uppercase">60-Second Spot (:60)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">140 – 155 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explainer videos and extended promos. Gives room for storytelling, emotional inflection, and dynamic sound effects.
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* View 2: Full Multi-variable Calculator */
        <div className="space-y-10">
          <MainCalculatorPage
            initialPlatform="voice_over"
            path="/voice-over-calculator"
            onNavigate={onNavigate}
          />

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200 pt-10">
            <div>
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Commercial Voice Talent Benchmarks
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Commercial &amp; Studio Narration Timing Standards
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Broadcast commercials and animated explainers have hard mathematical broadcast windows. Calculate billable studio minutes and per-word delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-purple-600 uppercase">15-Second Commercial (:15)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">35 – 40 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Allows space for a 2-second call to action, music stinger, and legal disclaimer fadeout.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-purple-600 uppercase">30-Second Commercial (:30)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">70 – 80 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard broadcast radio and television spot. Exceeding 80 words forces the talent to sound unnatural and rushed.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-purple-600 uppercase">60-Second Spot (:60)</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">140 – 155 words</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explainer videos and extended promos. Gives room for storytelling, emotional inflection, and dynamic sound effects.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-950 space-y-2">
              <div className="font-bold text-sm text-purple-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-700" aria-hidden="true" />
                <span>Audiobook PFH (Per Finished Hour) Conversion</span>
              </div>
              <p className="leading-relaxed">
                In the audiobook industry, narrator rates are priced Per Finished Hour (PFH). At standard audiobook narration speed (150–155 WPM with character voice pauses), one finished hour of audio equals approximately <strong>9,000 to 9,300 words</strong>.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
