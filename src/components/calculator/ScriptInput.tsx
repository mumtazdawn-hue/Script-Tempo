import React, { useRef } from 'react';
import { TextMetrics } from '../../types/calculator';
import { Sparkles, Clipboard, Trash2 } from 'lucide-react';

interface ScriptInputProps {
  value: string;
  onChange: (val: string) => void;
  metrics: TextMetrics;
  onLoadSample: () => void;
  onClear: () => void;
  platformLabel: string;
}

export const ScriptInput: React.FC<ScriptInputProps> = ({
  value,
  onChange,
  metrics,
  onLoadSample,
  onClear,
  platformLabel,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText) {
          onChange(clipText);
          return;
        }
      }
    } catch {
      // Fallback
    }
    textareaRef.current?.focus();
  };

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xs focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200 overflow-hidden">
      {/* Top Action Bar */}
      <div className="px-4 py-2.5 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">
          Script Editor
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/80 px-2 py-1 rounded-md transition-colors cursor-pointer"
            title={`Load ${platformLabel} sample`}
          >
            <Sparkles className="w-3 h-3 text-indigo-500" aria-hidden="true" />
            <span>Sample</span>
          </button>

          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 px-2 py-1 rounded-md transition-colors cursor-pointer"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3 h-3 text-slate-400" aria-hidden="true" />
            <span>Paste</span>
          </button>

          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md transition-colors cursor-pointer"
              title="Clear script"
            >
              <Trash2 className="w-3 h-3" aria-hidden="true" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <textarea
        id="script-input-textarea"
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={9}
        placeholder="Type, dictate, or paste your script here to calculate video duration, scene transitions, and B-roll requirements..."
        className="w-full resize-y p-4 sm:p-5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-sans leading-relaxed tracking-normal"
        aria-describedby="script-metrics-bar"
      />

      {/* Clean Unboxed Bottom Status Strip */}
      <div
        id="script-metrics-bar"
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-semibold text-slate-900">
            <span className="tabular-nums font-bold text-indigo-600">
              {metrics.wordCount.toLocaleString()}
            </span>{' '}
            words
          </span>
          <span className="text-slate-300">·</span>
          <span className="tabular-nums">
            {metrics.characterCount.toLocaleString()} chars
          </span>
          <span className="text-slate-300">·</span>
          <span className="tabular-nums">
            {metrics.sentenceCount} sentences
          </span>
          <span className="text-slate-300">·</span>
          <span className="tabular-nums">
            {metrics.paragraphCount} paras
          </span>
        </div>

        {metrics.wordCount > 5 && (
          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-2">
            <span>Readability: Grade {metrics.fleschKincaidGrade}</span>
            <span className="text-slate-300">·</span>
            <span className="tabular-nums font-medium text-slate-700">{metrics.readingEase}/100 Ease</span>
          </div>
        )}
      </div>
    </div>
  );
};
