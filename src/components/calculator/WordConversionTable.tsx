import React from 'react';
import { WordConversionItem } from '../../types/calculator';
import { Table } from 'lucide-react';

interface WordConversionTableProps {
  conversions: WordConversionItem[];
  wpm: number;
}

export const WordConversionTable: React.FC<WordConversionTableProps> = ({
  conversions,
  wpm,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-indigo-600" aria-hidden="true" />
          <h3 className="text-sm font-bold text-slate-900">
            Standard Duration Conversion Matrix
          </h3>
        </div>
        <span className="text-xs text-slate-500 tabular-nums">
          Calibrated at {wpm} WPM
        </span>
      </div>

      <p className="text-xs text-slate-600">
        Quick reference table showing estimated word count and production assets needed across standard video durations.
      </p>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-left text-xs divide-y divide-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold">
              <th className="py-2.5 px-3">Target Duration</th>
              <th className="py-2.5 px-3 text-right">Words Needed</th>
              <th className="py-2.5 px-3 text-right">Est. Scenes</th>
              <th className="py-2.5 px-3 text-right">Est. B-Roll Clips</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {conversions.map((row) => (
              <tr key={row.durationLabel} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2 px-3 font-medium text-slate-900">{row.durationLabel}</td>
                <td className="py-2 px-3 text-right font-bold text-indigo-600 tabular-nums">
                  ~{row.wordsNeeded.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-600">
                  {row.scenesEstimate}
                </td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-600">
                  {row.bRollClipsEstimate} clips
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
