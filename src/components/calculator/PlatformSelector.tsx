import React from 'react';
import { PlatformType } from '../../types/calculator';
import { PLATFORM_PRESETS } from '../../config/presets';

interface PlatformSelectorProps {
  selected: PlatformType;
  onSelect: (platform: PlatformType) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selected, onSelect }) => {
  const platforms: PlatformType[] = [
    'youtube',
    'tiktok',
    'instagram_reel',
    'podcast',
    'voice_over',
    'speech',
    'presentation',
    'custom',
  ];

  const currentPreset = PLATFORM_PRESETS[selected];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-900">
          Target Format & Platform
        </label>
        <span className="text-xs text-slate-500">Auto-adjusts pacing & scene assumptions</span>
      </div>

      {/* Segmented button control grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200">
        {platforms.map((platformKey) => {
          const isSelected = selected === platformKey;
          const config = PLATFORM_PRESETS[platformKey];
          return (
            <button
              key={platformKey}
              type="button"
              onClick={() => onSelect(platformKey)}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-all text-center truncate ${
                isSelected
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Quick context helper */}
      <p className="text-xs text-slate-500 italic pt-0.5">
        💡 {currentPreset.tip}
      </p>
    </div>
  );
};
