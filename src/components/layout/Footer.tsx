import React from 'react';
import { ScriptTempoLogo } from '../common/ScriptTempoLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-1 space-y-3">
            <button
              onClick={() => onNavigate('/')}
              className="text-left group focus:outline-none cursor-pointer"
              aria-label="Script Tempo Home"
            >
              <ScriptTempoLogo size="sm" showSubtitle={true} theme="dark" />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Transparent, formula-backed video production and script timing engine for creators, editors, voice actors, and speakers.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              All calculations run client-side. Zero scripts uploaded to remote servers.
            </div>
          </div>

          {/* Specialized Calculators */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
              Specialized Calculators
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/youtube-word-counter')}
                  className="hover:text-white transition-colors text-left"
                >
                  YouTube Word Counter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/youtube-duration-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  YouTube Duration & Pacing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/podcast-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Podcast Script Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/speech-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Speech & Keynote Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/voice-over-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Voice-Over Narration Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/short-form-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  TikTok & Shorts Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Production Guides */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
              Research & Field Guides
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/blog/words-in-a-10-minute-youtube-video')}
                  className="hover:text-white transition-colors text-left"
                >
                  Words in a 10-Min YouTube Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog/how-many-words-for-30-minute-podcast')}
                  className="hover:text-white transition-colors text-left"
                >
                  Words for a 30-Min Podcast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog/how-long-to-read-1500-word-script')}
                  className="hover:text-white transition-colors text-left"
                >
                  Timing a 1,500-Word Script
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog/optimal-speaking-speed-guide')}
                  className="hover:text-white transition-colors text-left"
                >
                  Optimal Speaking Speed (WPM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog/how-many-scenes-and-b-roll-clips')}
                  className="hover:text-white transition-colors text-left"
                >
                  B-Roll & Scene Count Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-white transition-colors text-left font-medium text-indigo-400"
                >
                  View All Guides →
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
              Platform & Standards
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  How the Calculator Works (Formulas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/toolkit')}
                  className="hover:text-white transition-colors text-left"
                >
                  Creator Equipment Toolkit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sitemap')}
                  className="hover:text-white transition-colors text-left"
                >
                  HTML Sitemap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Script Tempo. Built for video producers, writers, and narrators.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WCAG 2.2 AA Compliant</span>
            <span>·</span>
            <span>Zero-Logging Client Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
