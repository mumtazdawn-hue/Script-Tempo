import React, { useState } from 'react';
import { ProductionSettings } from '../../types/calculator';
import { calculateWordsForDuration } from '../../calculators/conversions';
import { formatDuration } from '../../calculators/duration';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';

interface ReverseCalculatorProps {
  settings: ProductionSettings;
  onApplyWordsToScript?: (words: number) => void;
}

export const ReverseCalculator: React.FC<ReverseCalculatorProps> = ({
  settings,
  onApplyWordsToScript,
}) => {
  const [targetMinutes, setTargetMinutes] = useState<number>(10);
  const [targetSeconds, setTargetSeconds] = useState<number>(0);

  const totalTargetSec = targetMinutes * 60 + targetSeconds;
  const wordsRequired = calculateWordsForDuration(totalTargetSec, settings);

  const quickPicks = [
    { label: '30s', min: 0, sec: 30 },
    { label: '1m', min: 1, sec: 0 },
    { label: '3m', min: 3, sec: 0 },
    { label: '5m', min: 5, sec: 0 },
    { label: '8m', min: 8, sec: 0 },
    { label: '10m', min: 10, sec: 0 },
    { label: '15m', min: 15, sec: 0 },
    { label: '20m', min: 20, sec: 0 },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-indigo-600" aria-hidden="true" />
          <h3 className="text-sm font-bold text-slate-900">
            Reverse Calculator: Target Duration → Script Words
          </h3>
        </div>
        <span className="text-xs text-slate-500">
          At {settings.wpm} WPM & {settings.pausePercentage}% pauses
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        Need to hit a precise YouTube runtime, podcast block, or speech limit? Enter your target duration to calculate your exact script word count goal.
      </p>

      {/* Quick Picks */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-500 mr-1">Quick Presets:</span>
        {quickPicks.map((pick) => {
          const isSelected = targetMinutes === pick.min && targetSeconds === pick.sec;
          return (
            <button
              key={pick.label}
              type="button"
              onClick={() => {
                setTargetMinutes(pick.min);
                setTargetSeconds(pick.sec);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {pick.label}
            </button>
          );
        })}
      </div>

      {/* Target Duration Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">Target Minutes</label>
          <input
            type="number"
            min="0"
            max="180"
            value={targetMinutes}
            onChange={(e) => setTargetMinutes(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:ring-1 focus:ring-indigo-500 tabular-nums font-semibold"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">Target Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={targetSeconds}
            onChange={(e) => setTargetSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:ring-1 focus:ring-indigo-500 tabular-nums font-semibold"
          />
        </div>
      </div>

      {/* Result Display */}
      <div className="p-4 rounded-lg bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs text-indigo-900 font-medium">
            Required Script Word Count for {formatDuration(totalTargetSec)}:
          </span>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-700 tabular-nums">
              ~{wordsRequired.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-indigo-900">words</span>
          </div>
          <span className="text-[11px] text-indigo-700/80">
            Deducts {settings.introDurationSeconds}s intro, {settings.outroDurationSeconds}s outro,{' '}
            {settings.adBreakDurationSeconds * settings.numberOfAdBreaks}s ads, and {settings.pausePercentage}% natural pauses.
          </span>
        </div>

        {onApplyWordsToScript && (
          <button
            type="button"
            onClick={() => onApplyWordsToScript(wordsRequired)}
            className="shrink-0 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-xs transition-colors"
          >
            Apply Target to Goal
          </button>
        )}
      </div>
    </div>
  );
};
