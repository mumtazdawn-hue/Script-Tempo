import React from 'react';
import { MainCalculatorPage } from '../calculator/MainCalculatorPage';
import { Zap, Smartphone, Layers } from 'lucide-react';

interface ShortFormCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const ShortFormCalculatorPage: React.FC<ShortFormCalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      <MainCalculatorPage
        initialPlatform="tiktok"
        path="/short-form-calculator"
        onNavigate={onNavigate}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 border-t border-slate-200 pt-10">
        <div>
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
            Short-Form Vertical Video
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            TikTok, Reels & Shorts Retention Architecture
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Short-form algorithms prioritize completion percentage. Every extra word or dead pause reduces completion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase">15-Second Loop Video</div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">40 – 48 words</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for seamless audio loops. Cut right to the punchline without intro greetings.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase">30-Second Tutorial</div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">85 – 95 words</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hook (3s) + 3 rapid tips (23s) + instant save CTA (4s). Require 12–15 scene cuts.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase">60-Second Story / Deep Dive</div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">175 – 190 words</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fast, high-energy delivery (185 WPM) with dynamic kinetic captions and 50%+ B-roll overlays.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-950 space-y-2">
          <div className="font-bold text-sm text-rose-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-700" aria-hidden="true" />
            <span>The 1.8-Second Cut Pace Rule</span>
          </div>
          <p className="leading-relaxed">
            On vertical platforms, user attention wanders if a visual shot stays static for more than 2 seconds. In a 60-second TikTok, plan for <strong>25 to 35 individual cuts</strong> (combining A-roll jump cuts, kinetic captions, screen recordings, and sound effect zooms).
          </p>
        </div>
      </section>
    </div>
  );
};
