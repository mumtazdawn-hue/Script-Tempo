import React, { useState } from 'react';
import { ProductionSettings } from '../../types/calculator';
import { SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface ProductionSettingsProps {
  settings: ProductionSettings;
  onChange: (updated: Partial<ProductionSettings>) => void;
  onResetDefaults: () => void;
}

export const ProductionSettingsPanel: React.FC<ProductionSettingsProps> = ({
  settings,
  onChange,
  onResetDefaults,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-800">
            Production &amp; Timeline Details
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            · {settings.introDurationSeconds}s intro · {settings.pausePercentage}% pauses · {settings.bRollPercentage}% B-roll
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600">
          <span>{isOpen ? 'Close' : 'Adjust'}</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Intro */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                Intro Hook (seconds)
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={settings.introDurationSeconds}
                onChange={(e) => onChange({ introDurationSeconds: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 tabular-nums font-medium"
              />
            </div>

            {/* Outro */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                Outro &amp; Cards (sec)
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={settings.outroDurationSeconds}
                onChange={(e) => onChange({ outroDurationSeconds: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 tabular-nums font-medium"
              />
            </div>

            {/* Natural Pauses */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                Breath Pauses ({settings.pausePercentage}%)
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={settings.pausePercentage}
                onChange={(e) => onChange({ pausePercentage: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded mt-2"
              />
            </div>

            {/* B-Roll % */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                B-Roll ({settings.bRollPercentage}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={settings.bRollPercentage}
                onChange={(e) => onChange({ bRollPercentage: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded mt-2"
              />
            </div>

            {/* Scene cut duration */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                Avg Cut Length (sec)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="60"
                value={settings.averageSceneDurationSeconds}
                onChange={(e) => onChange({ averageSceneDurationSeconds: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 tabular-nums font-medium"
              />
            </div>

            {/* Ad breaks */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-600">
                Mid-Roll Ads ({settings.numberOfAdBreaks}x)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={settings.numberOfAdBreaks}
                onChange={(e) => onChange({ numberOfAdBreaks: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 tabular-nums font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-2 border-t border-slate-200/60">
            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
