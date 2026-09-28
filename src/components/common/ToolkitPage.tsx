import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { CreatorToolkitSection } from '../monetization/CreatorToolkitSection';

interface ToolkitPageProps {
  onNavigate: (path: string) => void;
}

export const ToolkitPage: React.FC<ToolkitPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Creator Production Gear & Software Recommendations"
        description="Curated studio microphones, teleprompters, video editing suites, and audio post-production software."
        canonicalPath="/toolkit"
      />

      <Breadcrumbs items={[{ label: 'Creator Toolkit' }]} onNavigate={onNavigate} />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Recommended Creator Equipment & Software Toolkit
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Carefully selected hardware and post-production suites to streamline your script recording, vocal delivery, and video editing workflow.
        </p>
      </div>

      <CreatorToolkitSection onNavigate={onNavigate} />
    </div>
  );
};
