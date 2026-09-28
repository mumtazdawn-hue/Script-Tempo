import React, { useState } from 'react';
import { Sliders, Menu, X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ScriptTempoLogo } from '../common/ScriptTempoLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onQuickReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onQuickReset }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'YouTube', path: '/youtube-word-counter' },
    { label: 'TikTok/Shorts', path: '/short-form-calculator' },
    { label: 'Podcast', path: '/podcast-calculator' },
    { label: 'Speech', path: '/speech-calculator' },
    { label: 'Voice-Over', path: '/voice-over-calculator' },
    { label: 'Guides', path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Zone */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded cursor-pointer"
          aria-label="Script Tempo Home"
        >
          <ScriptTempoLogo size="sm" showSubtitle={true} />
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/blog'
                ? currentPath.startsWith('/blog')
                : currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors hover:text-slate-900 cursor-pointer ${
                  isActive ? 'text-indigo-600 font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action buttons & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {onQuickReset && (
            <button
              onClick={onQuickReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              title="Reset all inputs to default"
            >
              Reset
            </button>
          )}

          <button
            onClick={() => handleNavClick('/calculator')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Calculate Video</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/blog'
                ? currentPath.startsWith('/blog')
                : currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('/calculator')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Calculate Video</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
