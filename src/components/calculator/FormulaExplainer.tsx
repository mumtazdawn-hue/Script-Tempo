import React from 'react';
import { HelpCircle, Calculator, FileCheck, Layers, Info } from 'lucide-react';

export const FormulaExplainer: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h3 className="text-base font-bold text-slate-900">
            How This Calculator Works: Formulas & Methodology
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
          Production estimates are calculated using empirical speech rates, physiological pause factors, and modern video editing pacing metrics. Here is the mathematical architecture behind the numbers:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Formula 1: Narration & Duration */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px]">
              1
            </span>
            <span>Narration & Finished Runtime</span>
          </div>
          <p className="text-slate-600">
            Pure spoken time without breathing breaks:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            NarrationSeconds = (WordCount / WPM) * 60
          </div>
          <p className="text-slate-600">
            Total finished video duration incorporates pauses, intros, outros, and sponsor breaks:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            FinishedRuntime = NarrationSeconds * (1 + PausePct/100) + Intro + Outro + AdBreaks
          </div>
        </div>

        {/* Formula 2: Scene & Visual Cut Estimates */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px]">
              2
            </span>
            <span>Scene Breakdown & Visual Cuts</span>
          </div>
          <p className="text-slate-600">
            Based on viewer retention studies indicating the Visual Fatigue Threshold occurs at 4 to 6 seconds:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            EstimatedScenes = Math.ceil(FinishedRuntime / AvgSceneDuration)
          </div>
          <p className="text-slate-600">
            Cuts include both A-roll angle changes and B-roll cutaways.
          </p>
        </div>

        {/* Formula 3: B-Roll Volume */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px]">
              3
            </span>
            <span>B-Roll Requirements</span>
          </div>
          <p className="text-slate-600">
            Total B-roll coverage duration on the video timeline:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            BRollSeconds = FinishedRuntime * (BRollPct / 100)
          </div>
          <p className="text-slate-600">
            Clip count estimates provide a realistic min-to-max range based on dynamic trimming:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            ClipCountRange = [BRollSec / (AvgClip * 1.35), BRollSec / (AvgClip * 0.8)]
          </div>
        </div>

        {/* Formula 4: Inverse Word Requirement */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px]">
              4
            </span>
            <span>Reverse Word Calculation</span>
          </div>
          <p className="text-slate-600">
            Deducts non-speaking production elements to find required spoken word count:
          </p>
          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-indigo-700">
            SpokenSec = TargetSec - (Intro + Outro + AdBreaks)
            <br />
            RequiredWords = (SpokenSec / (1 + PausePct/100) / 60) * WPM
          </div>
        </div>
      </div>

      {/* Assumptions & Limitations Note */}
      <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
        <div className="font-semibold flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <span>Production Assumptions & Empirical Variance</span>
        </div>
        <p className="text-amber-800 leading-relaxed">
          Calculations are mathematical estimates based on empirical benchmarks. Actual recording times will vary depending on individual vocal cadence, retakes, physical gestures, audience reactions (during speeches), and director pacing choices.
        </p>
      </div>
    </div>
  );
};
