import React from 'react';
import { SpeakingPacePreset } from '../../types/calculator';
import { PACE_PRESETS, getPaceCategory } from '../../calculators/speakingRate';
import { Gauge } from 'lucide-react';

interface PaceSelectorProps {
  preset: SpeakingPacePreset;
  wpm: number;
  onPresetChange: (preset: SpeakingPacePreset) => void;
  onWpmChange: (wpm: number) => void;
}

export const PaceSelector: React.FC<PaceSelectorProps> = ({
  preset,
  wpm,
  onPresetChange,
  onWpmChange,
}) => {
  const quickPaces: { id: SpeakingPacePreset; label: string; rate: number }[] = [
    { id: 'slow', label: 'Slow', rate: 125 },
    { id: 'conversational', label: 'Natural', rate: 145 },
    { id: 'standard', label: 'Standard', rate: 160 },
    { id: 'fast', label: 'Fast', rate: 185 },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
          <Gauge className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
          <span>Speaking Pace</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">{getPaceCategory(wpm)} ·</span>
          <span className="font-bold text-indigo-600 font-mono tabular-nums text-sm">
            {wpm} WPM
          </span>
        </div>
      </div>

      {/* Segmented Quick Preset Pills & Slider */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Preset Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto shrink-0">
          {quickPaces.map((p) => {
            const isSelected = preset === p.id && wpm === p.rate;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onPresetChange(p.id);
                  onWpmChange(p.rate);
                }}
                className={`flex-1 sm:flex-initial px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label} <span className="opacity-70 text-[10px]">({p.rate})</span>
              </button>
            );
          })}
        </div>

        {/* Fine-Tuning Slider */}
        <div className="w-full flex items-center gap-2">
          <input
            type="range"
            min="80"
            max="240"
            step="1"
            value={wpm}
            onChange={(e) => {
              onWpmChange(Number(e.target.value));
              if (preset !== 'custom') onPresetChange('custom');
            }}
            className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            aria-label="Adjust Words Per Minute"
          />
        </div>
      </div>
    </div>
  );
};
