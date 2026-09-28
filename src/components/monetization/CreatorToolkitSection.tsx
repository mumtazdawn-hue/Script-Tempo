import React from 'react';
import { CREATOR_TOOLKIT } from '../../config/monetization';
import { ExternalLink, Mic, Monitor, Film, Sliders } from 'lucide-react';

interface CreatorToolkitSectionProps {
  onNavigate?: (path: string) => void;
}

export const CreatorToolkitSection: React.FC<CreatorToolkitSectionProps> = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Production Resources
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Recommended Creator Equipment & Software Toolkit
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Curated studio hardware & editing suites
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {CREATOR_TOOLKIT.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg bg-slate-50/70 border border-slate-200/80 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-indigo-600">{item.category}</span>
                <span className="tabular-nums font-semibold text-slate-700">{item.priceEstimate}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {item.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                Best for: <strong className="font-semibold text-slate-700">{item.bestFor}</strong>
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>Details</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
