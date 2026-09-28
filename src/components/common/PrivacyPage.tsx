import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../layout/SEOHead';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Privacy Policy | Script Tempo"
        description="Our privacy policy: your script text never leaves your browser and is never logged, stored, or processed on remote servers."
        canonicalPath="/privacy"
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last revised: September 28, 2026
        </p>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 space-y-2">
        <div className="font-bold flex items-center gap-2 text-emerald-950">
          <ShieldCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          <span>Core Guarantee: 100% Client-Side Processing</span>
        </div>
        <p className="leading-relaxed">
          The text you paste into Script Tempo is parsed entirely within your browser's local memory. No script excerpts, confidential drafts, client video outlines, or speech notes are ever transmitted to our servers or saved in any database.
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Information We Do Not Collect</h2>
        <p>
          We do not require user registration, email addresses, credit cards, or user accounts to use the calculator. We do not inspect, log, or train models on your script content.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Local Browser Storage</h2>
        <p>
          Any user configuration preferences (such as selected words-per-minute or platform settings) may be temporarily kept in your local browser session for convenience. You can clear this at any time by clearing your browser cache.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. Third-Party Links</h2>
        <p>
          Our platform may link to official hardware or software documentation (e.g. Shure, DaVinci Resolve). We are not responsible for the privacy practices of external third-party websites.
        </p>

        <h2 className="text-base font-bold text-slate-900">4. Contact Information</h2>
        <p>
          For privacy inquiries or technical questions regarding client-side execution, reach out via our GitHub repository or contact channels.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Terms of Service | Script Tempo"
        description="Terms of service and fair use guidelines for Script Tempo."
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ label: 'Terms of Service' }]} onNavigate={onNavigate} />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          Last revised: September 28, 2026
        </p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Script Tempo, you accept and agree to be bound by these terms. This tool is provided free of charge for professional and personal video production workflows.
        </p>

        <h2 className="text-base font-bold text-slate-900">2. Accuracy and Production Estimates</h2>
        <p>
          All calculations (including estimated narration duration, scene counts, visual transitions, and B-roll clip requirements) are algorithmic estimates based on configurable assumptions and empirical research. They do not constitute a legal guarantee of broadcast duration. You are solely responsible for verifying final recording runtimes before delivery or broadcast.
        </p>

        <h2 className="text-base font-bold text-slate-900">3. Intellectual Property</h2>
        <p>
          You retain 100% intellectual property ownership of all scripts, outlines, and text entered into the calculator. We claim zero ownership or license over your creations.
        </p>

        <h2 className="text-base font-bold text-slate-900">4. Disclaimer of Warranties</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; without warranties of any kind. In no event shall Script Tempo be liable for scheduling delays, production overruns, or third-party platform monetization discrepancies.
        </p>
      </div>
    </div>
  );
};
