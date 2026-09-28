import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5">
      <ol className="flex items-center space-x-1.5 text-xs text-slate-500">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast || !item.path ? (
                <span className="font-medium text-slate-900 truncate max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.path!)}
                  className="hover:text-slate-900 transition-colors truncate max-w-xs"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
