import React from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { SEO_ROUTES } from '../../config/seo';
import { Youtube, ShieldCheck, Clock, Film } from 'lucide-react';

interface YouTubeCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const YouTubeCalculatorPage: React.FC<YouTubeCalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      {/* Mounted Interactive Calculator with YouTube preset */}
      <MainCalculatorPage
        initialPlatform="youtube"
        path="/youtube-word-counter"
        onNavigate={onNavigate}
      />

      {/* SEO & Educational Value Section specifically for YouTube creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200 pt-10">
        <div>
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            YouTube Creator Knowledge Base
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            YouTube Script Pacing & Retention Architecture
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            How YouTube duration affects algorithm retention, mid-roll ad monetization, and viewer satisfaction.
          </p>
        </div>

        {/* 4 Core YouTube Questions Addressed Directly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              How many words for a 5-minute YouTube video?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              At standard YouTube delivery (155 WPM), a 5-minute video (300 seconds) needs approximately <strong>650 to 720 words</strong>. This accounts for a 15-second visual hook, a 15-second outro, and a 10% pause buffer for natural vocal delivery.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              How many words for a 10-minute YouTube video?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A 10-minute YouTube video (600 seconds) requires approximately <strong>1,280 to 1,380 words</strong> of script. If including a 60-second sponsor read or channel ad break, reduce script length to roughly <strong>1,250 words</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              How many words for a 15-minute YouTube video?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A comprehensive 15-minute video essay requires between <strong>1,950 and 2,150 words</strong>. Longer videos require deeper narrative pacing (145–150 WPM) to prevent listener fatigue across multiple conceptual chapters.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              How long is a 1,500-word YouTube script?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A 1,500-word script produces approximately <strong>9 minutes and 40 seconds</strong> of pure narration. Once you incorporate natural breath pauses (58s), an intro hook (15s), and a sponsor ad read (60s), the finished video exports at <strong>11 minutes and 30 seconds</strong>.
            </p>
          </div>
        </div>

        {/* The 8-Minute Monetization Rule */}
        <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <Film className="w-4 h-4" aria-hidden="true" />
            <span>Monetization Milestone</span>
          </div>
          <h3 className="text-base font-bold text-white">
            The 8-Minute YouTube Mid-Roll Ad Threshold
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            YouTube allows creators to place manual mid-roll ads only on videos with a finished runtime of at least <strong>8 minutes (480 seconds)</strong>. To ensure your finished export safely clears 8:00 without dragging or padding, your script should contain at least <strong>1,050 to 1,100 words</strong> at standard pacing.
          </p>
        </div>
      </section>
    </div>
  );
};
