import React, { useState } from 'react';
import { FullCalculationResult } from '../../types/calculator';
import { Clock, Film, Video, Share2, Copy, Check, Tv } from 'lucide-react';

interface ResultsDashboardProps {
  result: FullCalculationResult;
  onShare: () => void;
  onCopySpec: () => void;
  onOpenTeleprompter: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onShare,
  onCopySpec,
  onOpenTeleprompter,
}) => {
  const [copied, setCopied] = useState(false);
  const { timing, production, textMetrics, settings } = result;

  const handleCopy = () => {
    onCopySpec();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const total = Math.max(1, timing.finishedContentSeconds);
  const introPct = (timing.introSeconds / total) * 100;
  const speakingPct = (timing.totalSpeakingSeconds / total) * 100;
  const adsPct = (timing.adBreakTotalSeconds / total) * 100;
  const outroPct = (timing.outroSeconds / total) * 100;

  return (
    <div className="space-y-4">
      {/* Primary Hero Runtime Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm relative overflow-hidden transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Estimated Finished Duration
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 tabular-nums">
                {timing.formattedFinishedDuration}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                ({Math.round(timing.finishedContentSeconds)}s)
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500 leading-normal">
              {textMetrics.wordCount > 0 ? (
                <>
                  <span className="font-semibold text-slate-800">{textMetrics.wordCount.toLocaleString()} words</span> at{' '}
                  <span className="font-semibold text-slate-800">{settings.wpm} WPM</span> with{' '}
                  <span className="font-semibold text-slate-800">{settings.pausePercentage}%</span> pauses
                </>
              ) : (
                'Type or paste script on the left to see live duration & visual breakdown.'
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenTeleprompter}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer"
              title="Launch Fullscreen Teleprompter"
            >
              <Tv className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
              <span>Teleprompter</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all cursor-pointer"
              title="Copy complete production specification"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Spec</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onShare}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Timeline Bar */}
        {timing.finishedContentSeconds > 0 && (
          <div className="mt-6 space-y-2">
            <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-100">
              {introPct > 0 && (
                <div
                  style={{ width: `${introPct}%` }}
                  className="bg-amber-400"
                  title={`Intro: ${timing.formattedIntro}`}
                />
              )}
              {speakingPct > 0 && (
                <div
                  style={{ width: `${speakingPct}%` }}
                  className="bg-indigo-600"
                  title={`Spoken: ${timing.formattedSpeaking}`}
                />
              )}
              {adsPct > 0 && (
                <div
                  style={{ width: `${adsPct}%` }}
                  className="bg-rose-500"
                  title={`Ads: ${timing.formattedAdTime}`}
                />
              )}
              {outroPct > 0 && (
                <div
                  style={{ width: `${outroPct}%` }}
                  className="bg-emerald-500"
                  title={`Outro: ${timing.formattedOutro}`}
                />
              )}
            </div>

            {/* Unboxed Timeline Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                Spoken: <strong className="font-semibold text-slate-800 tabular-nums">{timing.formattedSpeaking}</strong>
              </span>
              {introPct > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Intro: <strong className="font-semibold text-slate-800 tabular-nums">{timing.formattedIntro}</strong>
                </span>
              )}
              {adsPct > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  Ads: <strong className="font-semibold text-slate-800 tabular-nums">{timing.formattedAdTime}</strong>
                </span>
              )}
              {outroPct > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Outro: <strong className="font-semibold text-slate-800 tabular-nums">{timing.formattedOutro}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3 Minimal Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Narration & Breathing */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Pure Narration
          </span>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {timing.formattedNarration}
          </div>
          <div className="text-[11px] text-slate-500">
            + {timing.formattedPauses} pauses
          </div>
        </div>

        {/* Card 2: Scene Cuts */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Estimated Cuts
          </span>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            ~{production.estimatedScenes} scenes
          </div>
          <div className="text-[11px] text-slate-500">
            Every ~{settings.averageSceneDurationSeconds}s ({production.pacingCategory})
          </div>
        </div>

        {/* Card 3: B-Roll Requirements */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            B-Roll Clips ({settings.bRollPercentage}%)
          </span>
          <div className="text-xl font-bold text-indigo-600 tabular-nums">
            {production.estimatedBRollClipsMin > 0
              ? `${production.estimatedBRollClipsMin}–${production.estimatedBRollClipsMax}`
              : '0'}{' '}
            <span className="text-xs text-slate-500 font-normal">clips</span>
          </div>
          <div className="text-[11px] text-slate-500 tabular-nums">
            {production.formattedBRollTime} total B-roll
          </div>
        </div>
      </div>
    </div>
  );
};
